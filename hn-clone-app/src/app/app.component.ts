import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models';
import {
  getBestItemIds,
  getItem,
  getItemErrorMessage,
  getItemLoading,
  getLatestItemId,
  getNewItemIds,
  getTopItemIds
} from '@app/store/selector/item.selectors';
import * as itemActions from '@store/actions/item.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<string>;
  item$: Observable<Item>;
  latestItemId$: Observable<number>;

  topItemIds$: Observable<number[]>;
  newItemIds$: Observable<number[]>;
  bestItemIds$: Observable<number[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.item$ = this.store.pipe(select(getItem));
    this.latestItemId$ = this.store.pipe(select(getLatestItemId));

    this.topItemIds$ = this.store.pipe(select(getTopItemIds));
    this.newItemIds$ = this.store.pipe(select(getNewItemIds));
    this.bestItemIds$ = this.store.pipe(select(getBestItemIds));

    this.loading$ = this.store.pipe(select(getItemLoading));
    this.error$ = this.store.pipe(select(getItemErrorMessage));

    // Load a single HN item
    this.store.dispatch(itemActions.loadItem({ id: 8863 }));

    // Get the currently highest available item id
    this.store.dispatch(itemActions.loadLatestItemId());

    // Get the top rated item ids
    this.store.dispatch(itemActions.loadTopItemIds());

    // Get the newest item ids
    this.store.dispatch(itemActions.loadNewItemIds());

    // Get the best rated item ids
    this.store.dispatch(itemActions.loadBestItemIds());
  }
}
