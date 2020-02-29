import { createAction, props } from '@ngrx/store';
import { Item } from '@api/models';

export const loadItem = createAction(
  '[Item] Load item',
  props<{ id: number }>()
);
export const loadItemSuccess = createAction(
  '[Item] Load success',
  props<{ item: Item }>()
);

export const loadLatestItemId = createAction(
  '[Item] Load latest item id'
);
export const loadLatestItemIdSuccess = createAction(
  '[Item] Load latest item id success',
  props<{ latestItemId: number }>()
);

export const loadTopItemIds = createAction(
  '[Item] Load TOP item ids'
);
export const loadTopItemIdsSuccess = createAction(
  '[Item] Load TOP item ids success',
  props<{ topItemIds: number[] }>()
);

export const loadNewItemIds = createAction(
  '[Item] Load NEW item ids'
);
export const loadNewItemIdsSuccess = createAction(
  '[Item] Load NEW item ids success',
  props<{ newItemIds: number[] }>()
);

export const loadBestItemIds = createAction(
  '[Item] Load BEST item ids'
);
export const loadBestItemIdsSuccess = createAction(
  '[Item] Load BEST item ids success',
  props<{ bestItemIds: number[] }>()
);

export const loadItemFail = createAction(
  '[Item] Load failure',
  props<{ errorMessage: string }>()
);
