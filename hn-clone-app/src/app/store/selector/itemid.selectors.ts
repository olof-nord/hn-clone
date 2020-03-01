import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItemsId from '@store/reducers/itemid.reducer';

export const selectItemsIdState = createFeatureSelector<fromItemsId.ItemsIdState>('itemIds');

export const getItemsIdLoading = createSelector(
  selectItemsIdState,
  state => state.isLoading
);

export const getLatestItemId = createSelector(
  selectItemsIdState,
  state => state.latestItemId
);

export const getTopItemIds = createSelector(
  selectItemsIdState,
  state => state.topItemIds
);

export const getNewItemIds = createSelector(
  selectItemsIdState,
  state => state.newItemIds
);

export const getBestItemIds = createSelector(
  selectItemsIdState,
  state => state.bestItemIds
);

export const getItemIdErrorMessage = createSelector(
  selectItemsIdState,
  state => state.errorMessage
);
