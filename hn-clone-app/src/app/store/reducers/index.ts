import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@environments/environment';

import * as fromItem from './item.reducer';
import * as fromItemId from './itemid.reducer';

export interface State {
  items: fromItem.ItemsState;
  itemIds: fromItemId.ItemsIdState;
}

export const reducers: ActionReducerMap<State> = {
  items: fromItem.reducer,
  itemIds: fromItemId.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
