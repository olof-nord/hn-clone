import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { environment } from '@environments/environment';

import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models/item';

export interface ItemWithIndex extends Item {
  index: number;
}

export function sortByIndex(item1: ItemWithIndex, item2: ItemWithIndex): number {
  return item1.index - item2.index;
}

export interface ItemsState extends EntityState<ItemWithIndex> {
  isLoading: boolean;
  errorMessage: string;
}
export const itemEntityAdapter: EntityAdapter<ItemWithIndex> = createEntityAdapter<ItemWithIndex>({
  sortComparer: sortByIndex
});

export const initialState: ItemsState = itemEntityAdapter.getInitialState({
  isLoading: true,
  errorMessage: null
});

const itemReducer = createReducer(
  initialState,
  on(itemActions.loadItem, (state: ItemsState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(itemActions.loadItemSuccess, (state: ItemsState, { item, index }) => {
    return itemEntityAdapter.addOne({
      ...item,
      index
      }, {
      ...state,
      isLoading: false
    });
  }),

  on(itemActions.loadTopItemsSuccess, (state: ItemsState) => {
    return {
      ...state,
      isLoading: false
    };
  }),

  on(itemActions.loadItemFail, (state: ItemsState, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage
    };
  })
);

export function reducer(state: ItemsState | undefined, action: Action) {
  if (!environment.production) {
    console.log('Action dispatched: ', action.type);
  }

  return itemReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = itemEntityAdapter.getSelectors();
