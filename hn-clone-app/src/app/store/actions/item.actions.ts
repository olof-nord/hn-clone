import { createAction, props } from '@ngrx/store';
import { Item } from '@api/models';

export const loadItem = createAction(
  '[Item] Load item',
  props<{ id: number }>()
);

export const loadItemSuccess = createAction(
  '[Item] Load item success',
  props<{ item: Item }>()
);

export const loadItemFail = createAction(
  '[Item] Load item failure',
  props<{ errorMessage: string }>()
);
