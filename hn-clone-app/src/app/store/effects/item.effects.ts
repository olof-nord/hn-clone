import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HackerNewsApiService } from '@api/services/hacker-news-api.service';
import * as itemActions from '@store/actions/item.actions';
import { Item } from '@api/models';

@Injectable()
export class ItemEffects {
  private errorMessage = 'Could not fetch Hacker News data';
  private itemFormat = 'json';

  constructor(
    private actions$: Actions,
    private apiService: HackerNewsApiService
  ) {}

  loadItem$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadItem),
    switchMap(action =>
      this.apiService
        .getItem({ itemId: action.id, itemFormat: this.itemFormat })
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
        .getLatestItem({ itemFormat: this.itemFormat })
        .pipe(
          map((latestItemId: number) => {
            return itemActions.loadLatestItemIdSuccess({ latestItemId });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadTopItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadTopItemIds),
    switchMap(() =>
      this.apiService
        .getTopItems({ itemFormat: this.itemFormat })
        .pipe(
          map((topItemIds: number[]) => {
            return itemActions.loadTopItemIdsSuccess({ topItemIds });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadNewItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadNewItemIds),
    switchMap(() =>
      this.apiService
        .getNewItems({ itemFormat: this.itemFormat })
        .pipe(
          map((newItemIds: number[]) => {
            return itemActions.loadNewItemIdsSuccess({ newItemIds });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

  loadBestItems$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadBestItemIds),
    switchMap(() =>
      this.apiService
        .getBestItems({ itemFormat: this.itemFormat })
        .pipe(
          map((bestItemIds: number[]) => {
            return itemActions.loadBestItemIdsSuccess({ bestItemIds });
          }),
          catchError(() => {
            return of(itemActions.loadItemFail({ errorMessage: this.errorMessage }));
          })
        )
      )
    )
  );

}
