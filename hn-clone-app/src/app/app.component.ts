import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models';
import { getAllStories, getItemsErrorMessage, getItemsLoading } from '@app/store/selector/item.selectors';
import {
  getBestItemIds,
  getLatestItemId,
  getNewItemIds,
  getTopItemIds
} from '@app/store/selector/itemid.selectors';

import * as itemActions from '@store/actions/item.actions';
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
  newItemIds$: Observable<number[]>;
  bestItemIds$: Observable<number[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.allStories$ = this.store.pipe(select(getAllStories));
    this.itemsLoading$ = this.store.pipe(select(getItemsLoading));
    this.itemsError$ = this.store.pipe(select(getItemsErrorMessage));

    this.latestItemId$ = this.store.pipe(select(getLatestItemId));
    this.topItemIds$ = this.store.pipe(select(getTopItemIds));
    this.newItemIds$ = this.store.pipe(select(getNewItemIds));
    this.bestItemIds$ = this.store.pipe(select(getBestItemIds));

    // Load several single HN items
    this.store.dispatch(itemActions.loadItem({ id: 8863 }));

    // A second request does not produce a double entry in the store thanks to the EntityState
    this.store.dispatch(itemActions.loadItem({ id: 8863 }));
    this.store.dispatch(itemActions.loadItem({ id: 8864 }));
    this.store.dispatch(itemActions.loadItem({ id: 8865 }));

    // Get the currently highest available item id
    this.store.dispatch(itemIdActions.loadLatestItemId());

    // Get the top rated item ids
    this.store.dispatch(itemIdActions.loadTopItemIds());

    // Get the newest item ids
    this.store.dispatch(itemIdActions.loadNewItemIds());

    // Get the best rated item ids
    this.store.dispatch(itemIdActions.loadBestItemIds());
  }
}
