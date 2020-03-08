import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models/item';
import * as itemIdActions from '@store/actions/itemid.actions';
import { getAllStories } from '@store/selector/item.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topStories$: Observable<Item[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // Fetch and load the top 500 top rated items
    this.store.dispatch(itemIdActions.loadTopItemIds());

    // Select top stories from the state
    this.topStories$ = this.store.pipe(select(getAllStories));

  }

}
