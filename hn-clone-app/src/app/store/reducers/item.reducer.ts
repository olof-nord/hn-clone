import { Action, createReducer, on } from '@ngrx/store';
import { environment } from '@environments/environment';

import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models/item';

export interface State {
  item: Item;
  latestItemId: number;
  topItemIds: number[];
  newItemIds: number[];
  bestItemIds: number[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: State = {
  item: {
    id: null
  },
  latestItemId: null,
  topItemIds: [],
  newItemIds: [],
  bestItemIds: [],
  isLoading: true,
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
  on(itemActions.loadLatestItemIdSuccess, (state: State, { latestItemId }) => {
    return {
      ...state,
      isLoading: false,
      latestItemId
    };
  }),

  on(itemActions.loadTopItemIds, (state: State) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadTopItemIdsSuccess, (state: State, { topItemIds }) => {
    return {
      ...state,
      isLoading: false,
      topItemIds
    };
  }),

  on(itemActions.loadNewItemIds, (state: State) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadNewItemIdsSuccess, (state: State, { newItemIds }) => {
    return {
      ...state,
      isLoading: false,
      newItemIds
    };
  }),

  on(itemActions.loadBestItemIds, (state: State) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadBestItemIdsSuccess, (state: State, { bestItemIds }) => {
    return {
      ...state,
      isLoading: false,
      bestItemIds
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
