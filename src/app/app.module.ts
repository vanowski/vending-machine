import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService }  from './in-memory-data.service';
import { ItemsService }  from './items.service';
import { ChangeService }  from './change.service';

import { AppComponent } from './app.component';
import { MachineComponent } from './components/machine/machine.component';
import { RefillComponent } from './refill/refill.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    RefillComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [ ItemsService, ChangeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
