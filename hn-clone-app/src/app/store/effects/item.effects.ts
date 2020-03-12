import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { HackerNewsApiService } from '@api/services/hacker-news-api.service';
import * as itemActions from '@store/actions/item.actions';
import { State } from '@app/store/reducers';

import { Item } from '@api/models';

@Injectable()
export class ItemEffects {
  private errorMessage = 'Could not fetch Hacker News data';
  private itemFormat = 'json';

  constructor(
    private actions$: Actions,
    private apiService: HackerNewsApiService,
    private store$: Store<State>
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
    ofType(itemActions.loadTopItems),
    withLatestFrom(this.store$),
    mergeMap(([props, store]) => {

      for (let i = props.start; i <= props.end; i++) {
        this.store$.dispatch(itemActions.loadItem({ id: store.itemIds.topItemIds[i], index: i }));
      }

      return of(itemActions.loadTopItemsSuccess());
      }
    ))
  );

  loadRelatedComments$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadRelatedComments),
    mergeMap(props => {

        for (let i = 0; i < props.relatedCommentIds.length; i++) {
          this.store$.dispatch(itemActions.loadItem({ id: props.relatedCommentIds[i], index: i }));
        }

        return of(itemActions.loadRelatedCommentsSuccess());
      }
    ))
  );

}
