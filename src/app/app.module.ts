import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedLayoutComponent } from './pages/shared-layout/shared-layout.component';
import { BigSideBarComponent } from './components/big-side-bar/big-side-bar.component';
import { NavLinksComponent } from './components/nav-links/nav-links.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { FormRowComponent } from './components/UI/form-row/form-row.component';
import { FormRowSelectComponent } from './components/UI/form-row-select/form-row-select.component';
import { SearchContainerComponent } from './components/UI/search-container/search-container.component';
import { TableComponent } from './components/UI/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/UI/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LogoComponent } from './components/UI/logo/logo.component';
import { MatSelectModule } from '@angular/material/select';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { ChefsDialogComponent } from './components/chefs-dialog/chefs-dialog.component';
import { DishesDialogComponent } from './components/dishes-dialog/dishes-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { RestaurantsDialogComponent } from './components/restaurants-dialog/restaurants-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    SharedLayoutComponent,
    BigSideBarComponent,
    NavLinksComponent,
    NavbarComponent,
    RestaurantsComponent,
    FormRowComponent,
    FormRowSelectComponent,
    SearchContainerComponent,
    TableComponent,
    DialogComponent,
    LogoComponent,
    ChefsComponent,
    DishesComponent,
    ChefsDialogComponent,
    DishesDialogComponent,
    RestaurantsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
