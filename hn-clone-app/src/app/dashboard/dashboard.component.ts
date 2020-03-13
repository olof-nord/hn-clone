import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models/item';
import * as itemIdActions from '@store/actions/itemid.actions';
import * as itemActions from '@store/actions/item.actions';
import { getAllStoriesAndJobs } from '@store/selector/item.selectors';
import { getItemIdsLoading } from '@store/selector/itemid.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  topItems$: Observable<Item[]>;

  private itemIdsLoading$: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();

  constructor(private store$: Store<State>) { }

  ngOnInit(): void {
    // Fetch the top rated item ids
    this.store$.dispatch(itemIdActions.loadTopItemIds());

    this.itemIdsLoading$ = this.store$.pipe(select(getItemIdsLoading));

    this.subscriptions.add(this.itemIdsLoading$.subscribe((itemsIdLoading: boolean) => {
      if (!itemsIdLoading) {
        // Fetch the top 30 items once the ids are available
        return this.store$.dispatch(itemActions.loadTopItems({ start: 0, end: 30 }));
      }
    }));

    // Select the top stories and jobs
    this.topItems$ = this.store$.pipe(select(getAllStoriesAndJobs));

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
