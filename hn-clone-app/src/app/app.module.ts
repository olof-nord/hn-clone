import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiModule } from '@api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { reducers, metaReducers } from './store/reducers';
import { environment } from '@environments/environment';

import { ItemEffects } from '@store/effects/item.effects';
import { ItemIdEffects } from '@store/effects/itemid.effects';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { ItemComponent } from '@item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    NgbModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ItemEffects, ItemIdEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
