import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import { Item } from '@api/models/item';
import { State } from '@app/store/reducers';
import * as itemActions from '@store/actions/item.actions';
import { getAllComments, getItemById } from '@store/selector/item.selectors';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item$: Observable<Item>;
  comments$: Observable<Item[]>;

  private itemId: number;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // access the URL parameter
    this.subscriptions.add(this.route.paramMap.subscribe((params: ParamMap) =>
      this.itemId = Number(params.get('id'))
    ));

    // Get the item
    this.item$ = this.store.pipe(select(getItemById(this.itemId)));

    // Get the item comments
    this.comments$ = this.store.pipe(select(getAllComments));

    this.subscriptions.add(this.item$.subscribe((item: Item) => {
      // If not coming from the dashboard, load the item
      if (item === undefined) {
        return this.store.dispatch(itemActions.loadItem({ id: this.itemId }));
      } else {
        // If item is loaded, load child comments
        return this.store.dispatch(itemActions.loadRelatedComments({relatedCommentIds: item.kids}));
      }
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
