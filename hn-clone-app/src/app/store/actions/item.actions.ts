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
  props<{ id: number }>()
);

export const loadTopItemIds = createAction(
  '[Item] Load top item ids'
);
export const loadTopItemIdsSuccess = createAction(
  '[Item] Load top item ids success',
  props<{ ids: number[] }>()
);

export const loadItemFail = createAction(
  '[Item] Load failure',
  props<{ errorMessage: string }>()
);
