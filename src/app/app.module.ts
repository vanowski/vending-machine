import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService }  from './services/in-memory-data.service';
import { ItemsService }  from './services/items.service';
import { ChangeService }  from './services/change.service';

import { AppComponent } from './app.component';
import { MachineComponent } from './components/machine/machine.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent
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
