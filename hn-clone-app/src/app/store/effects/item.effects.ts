import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HackerNewsApiService } from '@api/services/hacker-news-api.service';
import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private apiService: HackerNewsApiService
  ) {}

  private errorMessage = 'Could not fetch Hacker News data';

  loadItem$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadItem),
    switchMap(action =>
      this.apiService
        .getItem({ itemId: action.id, itemFormat: 'json' })
        .pipe(
          map((item: Item) => {
            return itemActions.loadItemSuccess({ item });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadMaxItem$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadLatestItemId),
    switchMap(() =>
      this.apiService
        .getLatestItem({ itemFormat: 'json' })
        .pipe(
          map((id: number) => {
            return itemActions.loadLatestItemIdSuccess({ id });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

}
