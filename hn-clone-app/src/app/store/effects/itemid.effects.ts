import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HackerNewsApiService } from '@api/services/hacker-news-api.service';
import * as itemIdActions from '@store/actions/itemid.actions';

@Injectable()
export class ItemIdEffects {
  private errorMessage = 'Could not fetch Hacker News data';
  private itemFormat = 'json';

  constructor(
    private actions$: Actions,
    private apiService: HackerNewsApiService
  ) {}

  loadMaxItem$ = createEffect(() => this.actions$.pipe(
    ofType(itemIdActions.loadLatestItemId),
    switchMap(() =>
      this.apiService
        .getLatestItem({ itemFormat: this.itemFormat })
        .pipe(
          map((latestItemId: number) => {
            return itemIdActions.loadLatestItemIdSuccess({ latestItemId });
          }),
          catchError(() => {
            return of(itemIdActions.loadItemIdFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadTopItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemIdActions.loadTopItemIds),
    switchMap(() =>
      this.apiService
        .getTopItems({ itemFormat: this.itemFormat })
        .pipe(
          map((topItemIds: number[]) => {
            return itemIdActions.loadTopItemIdsSuccess({ topItemIds });
          }),
          catchError(() => {
            return of(itemIdActions.loadItemIdFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadNewItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemIdActions.loadNewItemIds),
    switchMap(() =>
      this.apiService
        .getNewItems({ itemFormat: this.itemFormat })
        .pipe(
          map((newItemIds: number[]) => {
            return itemIdActions.loadNewItemIdsSuccess({ newItemIds });
          }),
          catchError(() => {
            return of(itemIdActions.loadItemIdFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadBestItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemIdActions.loadBestItemIds),
    switchMap(() =>
      this.apiService
        .getBestItems({ itemFormat: this.itemFormat })
        .pipe(
          map((bestItemIds: number[]) => {
            return itemIdActions.loadBestItemIdsSuccess({ bestItemIds });
          }),
          catchError(() => {
            return of(itemIdActions.loadItemIdFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

}
