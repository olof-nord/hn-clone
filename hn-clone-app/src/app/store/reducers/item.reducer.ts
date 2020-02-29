import { Action, createReducer, on } from '@ngrx/store';
import { environment } from '@environments/environment';

import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models/item';

export interface State {
  item: Item;
  latestItemId: number;
  topItemIds: number[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: State = {
  item: {
    id: null
  },
  latestItemId: null,
  topItemIds: [],
  isLoading: false,
  errorMessage: null
};

const itemReducer = createReducer(
  initialState,
  on(itemActions.loadItem, (state: State) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadItemSuccess, (state: State, { item }) => {
    return {
      ...state,
      isLoading: false,
      item
    };
  }),

  on(itemActions.loadLatestItemId, (state: State) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadLatestItemIdSuccess, (state: State, { id }) => {
    return {
      ...state,
      isLoading: false,
      latestItemId: id
    };
  }),

  on(itemActions.loadTopItemIds, (state: State) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadTopItemIdsSuccess, (state: State, { ids }) => {
    return {
      ...state,
      isLoading: false,
      topItemIds: ids
    };
  }),

  on(itemActions.loadItemFail, (state: State, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  if (!environment.production) {
    console.log('Action dispatched: ', action.type);
  }

  return itemReducer(state, action);
}
