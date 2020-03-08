import { createAction, props } from '@ngrx/store';

export const loadLatestItemId = createAction(
  '[ItemId] Load latest item id'
);
export const loadLatestItemIdSuccess = createAction(
  '[ItemId] Load latest item id success',
  props<{ latestItemId: number }>()
);

export const loadTopItemIds = createAction(
  '[ItemId] Load TOP item ids'
);
export const loadTopItemIdsSuccess = createAction(
  '[ItemId] Load TOP item ids success',
  props<{ topItemIds: number[] }>()
);

export const loadNewItemIds = createAction(
  '[ItemId] Load NEW item ids'
);
export const loadNewItemIdsSuccess = createAction(
  '[ItemId] Load NEW item ids success',
  props<{ newItemIds: number[] }>()
);

export const loadBestItemIds = createAction(
  '[ItemId] Load BEST item ids'
);
export const loadBestItemIdsSuccess = createAction(
  '[ItemId] Load BEST item ids success',
  props<{ bestItemIds: number[] }>()
);

export const loadItemIdFail = createAction(
  '[ItemId] Load item id failure',
  props<{ errorMessage: string }>()
);
