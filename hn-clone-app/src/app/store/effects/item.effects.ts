import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from '@api/services/api.service';
import * as itemActions from '@store/actions/item.actions';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  @Effect()
  loadItem$ = createEffect(() => this.actions$.pipe(
    ofType(itemActions.loadItem),
    switchMap(action =>
      this.apiService
        .getItem({ itemId: action.id, itemFormat: 'json' })
        .pipe(
          map(item => itemActions.loadItemSuccess({ item })),
          catchError(() =>
            of(itemActions.loadItemFail({ errorMessage: 'Could not fetch data' }))
          )
        )
      )
    )
  );

}
