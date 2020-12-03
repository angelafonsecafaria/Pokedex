import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Ngx-Bootstrap:
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

// Components:
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { PokemonGeneralComponent } from './views/pokemon/general/pokemon-general.component';
import { LoaderComponent } from './shared/loader/loader.component';

// Pipes:
import { HeightPipe } from './shared/pipes/height/height.pipe';
import { WeightPipe } from './shared/pipes/weight/weight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PokemonGeneralComponent,
    LoaderComponent,

    //Pipes
    HeightPipe,
    WeightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
