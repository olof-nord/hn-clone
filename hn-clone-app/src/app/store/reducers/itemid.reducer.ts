import { Action, createReducer, on } from '@ngrx/store';
import { environment } from '@environments/environment';

import * as itemIdActions from '@store/actions/itemid.actions';

export interface ItemsIdState {
  latestItemId: number;
  topItemIds: number[];
  newItemIds: number[];
  bestItemIds: number[];

  isLoading: boolean;
  errorMessage: string;
}

export const initialState: ItemsIdState = {
  latestItemId: null,
  topItemIds: [],
  newItemIds: [],
  bestItemIds: [],

  isLoading: true,
  errorMessage: null
};

const itemReducer = createReducer(
  initialState,
  on(itemIdActions.loadLatestItemId, (state: ItemsIdState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemIdActions.loadLatestItemIdSuccess, (state: ItemsIdState, { latestItemId }) => {
    return {
      ...state,
      isLoading: false,
      latestItemId
    };
  }),

  on(itemIdActions.loadTopItemIds, (state: ItemsIdState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemIdActions.loadTopItemIdsSuccess, (state: ItemsIdState, { topItemIds }) => {
    return {
      ...state,
      isLoading: false,
      topItemIds
    };
  }),

  on(itemIdActions.loadNewItemIds, (state: ItemsIdState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemIdActions.loadNewItemIdsSuccess, (state: ItemsIdState, { newItemIds }) => {
    return {
      ...state,
      isLoading: false,
      newItemIds
    };
  }),

  on(itemIdActions.loadBestItemIds, (state: ItemsIdState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemIdActions.loadBestItemIdsSuccess, (state: ItemsIdState, { bestItemIds }) => {
    return {
      ...state,
      isLoading: false,
      bestItemIds
    };
  }),

  on(itemIdActions.loadItemIdFail, (state: ItemsIdState, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage
    };
  })
);

export function reducer(state: ItemsIdState | undefined, action: Action) {
  if (!environment.production) {
    console.log('Action dispatched: ', action.type);
  }

  return itemReducer(state, action);
}
