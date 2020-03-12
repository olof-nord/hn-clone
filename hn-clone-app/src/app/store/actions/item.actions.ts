import { createAction, props } from '@ngrx/store';
import { Item } from '@api/models';

export const loadItem = createAction(
  '[Item] Load item',
  props<{ id: number, index?: number }>()
);

export const loadItemSuccess = createAction(
  '[Item] Load item success',
  props<{ item: Item, index?: number }>()
);

export const loadTopItems = createAction(
  '[Item] Load TOP items',
  props<{ start: number, end: number }>()
);

export const loadTopItemsSuccess = createAction(
  '[Item] Load TOP items success'
);

export const loadRelatedComments = createAction(
  '[Item] Load item comments',
  props<{ relatedCommentIds: number[] }>()
);

export const loadRelatedCommentsSuccess = createAction(
  '[Item] Load item comments success'
);

export const loadItemFail = createAction(
  '[Item] Load item failure',
  props<{ errorMessage: string }>()
);
