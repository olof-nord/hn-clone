import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItems from '@store/reducers/item.reducer';

export const selectItemsState = createFeatureSelector<fromItems.ItemsState>('items');

export const getItemsLoading = createSelector(
  selectItemsState,
  state => state.isLoading
);

export const getItems = createSelector(
  selectItemsState,
  fromItems.selectAll
);

export const getItemsErrorMessage = createSelector(
  selectItemsState,
  state => state.errorMessage
);
