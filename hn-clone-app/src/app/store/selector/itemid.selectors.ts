import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItemsId from '@store/reducers/itemid.reducer';

export const selectItemsIdState = createFeatureSelector<fromItemsId.ItemsIdState>('itemIds');

export const getItemIdsLoading = createSelector(
  selectItemsIdState,
  itemIds => itemIds.isLoading
);

export const getLatestItemId = createSelector(
  selectItemsIdState,
  itemIds => itemIds.latestItemId
);

export const getTopItemIds = createSelector(
  selectItemsIdState,
  itemIds => itemIds.topItemIds
);

export const getNewItemIds = createSelector(
  selectItemsIdState,
  itemIds => itemIds.newItemIds
);

export const getBestItemIds = createSelector(
  selectItemsIdState,
  itemIds => itemIds.bestItemIds
);

export const getItemIdErrorMessage = createSelector(
  selectItemsIdState,
  itemIds => itemIds.errorMessage
);
