import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedLayoutComponent } from './pages/shared-layout/shared-layout.component';
import { BigSideBarComponent } from './components/big-side-bar/big-side-bar.component';
import { NavLinksComponent } from './components/nav-links/nav-links.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllRestaurantsComponent } from './pages/all-restaurants/all-restaurants.component';
import { FormRowComponent } from './components/UI/form-row/form-row.component';
import { FormRowSelectComponent } from './components/UI/form-row-select/form-row-select.component';
import { SearchContainerComponent } from './components/UI/search-container/search-container.component';
import { TableComponent } from './components/UI/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    SharedLayoutComponent,
    BigSideBarComponent,
    NavLinksComponent,
    NavbarComponent,
    AllRestaurantsComponent,
    FormRowComponent,
    FormRowSelectComponent,
    SearchContainerComponent,
    TableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
