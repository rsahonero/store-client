import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CatalogComponent} from './catalog/catalog.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {baseURL} from './shared/baseurl';
import {HttpClientModule} from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';
import { ShareDialog } from './share-dialog/share-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ItemDetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    ShareDialog
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule,
    MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    FlexLayoutModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    FacebookModule.forRoot()
  ],
  providers: [
    {provide: 'BaseURL', useValue: baseURL}
  ],
  entryComponents: [
    LoginComponent,
    ShareDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
