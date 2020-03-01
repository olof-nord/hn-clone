import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
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
    mergeMap(action =>
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

}
