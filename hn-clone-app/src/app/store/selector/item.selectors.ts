import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as ItemState } from '@store/reducers/item.reducer';

export const getItemState = createFeatureSelector<ItemState>('item');

export const getItemLoading = createSelector(
  getItemState,
  state => state.isLoading
);

export const getItem = createSelector(
  getItemState,
  state => state.item
);

export const getLatestItemId = createSelector(
  getItemState,
  state => state.latestItemId
);

export const getTopItemIds = createSelector(
  getItemState,
  state => state.topItemIds
);

export const getNewItemIds = createSelector(
  getItemState,
  state => state.newItemIds
);

export const getItemErrorMessage = createSelector(
  getItemState,
  state => state.errorMessage
);
