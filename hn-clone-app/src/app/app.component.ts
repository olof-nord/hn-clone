import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@app/store/reducers';
import { Item } from '@api/models';
import {getItem, getItemErrorMessage, getItemLoading} from '@app/store/selector/item.selectors';
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

  title = 'Hacker News';

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.item$ = this.store.pipe(select(getItem));
    this.loading$ = this.store.pipe(select(getItemLoading));
    this.error$ = this.store.pipe(select(getItemErrorMessage));

    // Load a single HN item
    this.store.dispatch(itemActions.loadItem({ id: 8863 }));
  }
}
