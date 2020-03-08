import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { HackerNewsApiService } from '@api/services/hacker-news-api.service';
import * as itemActions from '@store/actions/item.actions';
import * as itemIdActions from '@store/actions/itemid.actions';

import { Item } from '@api/models';
import { ItemsState } from '@store/reducers/item.reducer';

@Injectable()
export class ItemEffects {
  private errorMessage = 'Could not fetch Hacker News data';
  private itemFormat = 'json';

  constructor(
    private actions$: Actions,
    private apiService: HackerNewsApiService,
    private store: Store<ItemsState>
  ) {}

  loadItem$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadItem),
    mergeMap(action =>
      this.apiService
        .getItem({ itemId: action.id, itemFormat: this.itemFormat })
        .pipe(
          map((item: Item) => {
            return itemActions.loadItemSuccess({ item, index: action?.index });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadTopItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemIdActions.loadTopItemIdsSuccess),
    mergeMap(props => {

      for (let i = 0; i < props.topItemIds.length; i++) {
        this.store.dispatch(itemActions.loadItem({ id: props.topItemIds[i], index: i }));
      }

      return of(itemActions.loadTopItemsSuccess());
      }
    ))
  );

  loadRelatedComments$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadRelatedComments),
    mergeMap(props => {

        for (let i = 0; i < props.relatedCommentIds.length; i++) {
          this.store.dispatch(itemActions.loadItem({ id: props.relatedCommentIds[i], index: i }));
        }

        return of(itemActions.loadRelatedCommentsSuccess());
      }
    ))
  );

}
