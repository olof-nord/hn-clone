import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItemsId from '@store/reducers/itemid.reducer';

export const selectItemIdsState = createFeatureSelector<fromItemsId.ItemsIdState>('itemIds');

export const getItemIdsLoading = createSelector(
  selectItemIdsState,
  itemIds => itemIds.isLoading
);

export const getLatestItemId = createSelector(
  selectItemIdsState,
  itemIds => itemIds.latestItemId
);

export const getTopItemIds = createSelector(
  selectItemIdsState,
  itemIds => itemIds.topItemIds
);

export const getNewItemIds = createSelector(
  selectItemIdsState,
  itemIds => itemIds.newItemIds
);

export const getBestItemIds = createSelector(
  selectItemIdsState,
  itemIds => itemIds.bestItemIds
);

export const getItemIdErrorMessage = createSelector(
  selectItemIdsState,
  itemIds => itemIds.errorMessage
);
