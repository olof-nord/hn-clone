import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models';
import { getAllStories, getItemsErrorMessage, getItemsLoading } from '@app/store/selector/item.selectors';
import { getLatestItemId, getTopItemIds } from '@app/store/selector/itemid.selectors';
import * as itemIdActions from '@store/actions/itemid.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  itemsLoading$: Observable<boolean>;
  itemsError$: Observable<string>;
  allStories$: Observable<Item[]>;

  latestItemId$: Observable<number>;
  topItemIds$: Observable<number[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.allStories$ = this.store.pipe(select(getAllStories));
    this.itemsLoading$ = this.store.pipe(select(getItemsLoading));
    this.itemsError$ = this.store.pipe(select(getItemsErrorMessage));

    this.latestItemId$ = this.store.pipe(select(getLatestItemId));
    this.topItemIds$ = this.store.pipe(select(getTopItemIds));

    // Get the currently highest available item id
    this.store.dispatch(itemIdActions.loadLatestItemId());

    // Get the top rated items
    this.store.dispatch(itemIdActions.loadTopItemIds());
  }
}
