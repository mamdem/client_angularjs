import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SigninComponent } from './signin/signin.component';
import { CardComponent } from './card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersonneService } from './services/personne.service';
import { HttpClientModule } from '@angular/common/http';
import { BienService } from './services/bien.service';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes=[
  { path:'signin', component: SigninComponent},
  { path: '', component: AccueilComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SigninComponent,
    CardComponent,
    LoginComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [PersonneService, BienService],
  bootstrap: [AppComponent]
})
export class AppModule { }
