import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models/item';
import * as itemIdActions from '@store/actions/itemid.actions';
import { getAllStories } from '@app/store/selector/item.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allStories$: Observable<Item[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // Select all stories available in the state
    this.allStories$ = this.store.pipe(select(getAllStories));

    // Fetch the top rated items
    this.store.dispatch(itemIdActions.loadTopItemIds());
  }

}
