import { isDevMode } from '@angular/core';
import { Action, createReducer, on } from '@ngrx/store';

import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models/item';

export interface State {
  item: Item;
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: State = {
  item: {
    id: null
  },
  isLoading: false,
  errorMessage: null
};

const itemReducer = createReducer(
  initialState,
  on(itemActions.loadItem, state => ({
    ...state,
    isLoading: true
  })),
  on(itemActions.loadItemSuccess, (state, { item }) => ({
    ...state,
    isLoading: false,
    item
  })),
  on(itemActions.loadItemFail, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage
  })),
);

export function reducer(state: State | undefined, action: Action) {
  if (isDevMode) {
    console.log('Action dispatched: ', action.type);
  }

  return itemReducer(state, action);
}
