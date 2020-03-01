import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { environment } from '@environments/environment';

import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models/item';

export interface ItemsState extends EntityState<Item> {
  isLoading: boolean;
  errorMessage: string;
}
export const itemEntityAdapter: EntityAdapter<Item> = createEntityAdapter<Item>();

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
  on(itemActions.loadItemSuccess, (state: ItemsState, { item }) => {
    return itemEntityAdapter.addOne(item, {
      ...state,
      isLoading: false
    });
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
