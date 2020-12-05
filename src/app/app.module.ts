import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Ngx-Bootstrap:
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components:
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { PokemonGeneralComponent } from './views/pokemon/general/pokemon-general.component';
import { LoaderComponent } from './shared/loader/loader.component';

// Pipes:
import { PokemonHeightPipe } from './shared/pipes/pokemon-height/pokemon-height.pipe';
import { PokemonWeightPipe } from './shared/pipes/pokemon-weight/pokemon-weight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PokemonGeneralComponent,
    LoaderComponent,

    //Pipes
    PokemonHeightPipe,
    PokemonWeightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FormsModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
