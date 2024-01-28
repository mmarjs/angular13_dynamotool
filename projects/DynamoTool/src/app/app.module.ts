import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserPreferencesComponent } from './userPrefrence/userPreferences.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DisplayGridComponent } from './displayGrid/displayGrid.component';
import { DisplaySubGridComponent } from './displayGrid/displaySubGrid.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './search/search.component';
import { AppMenuComponent } from './AppMenu/appMenu.component';
import { DisplayViewComponent } from './displayView/displayView.component';
import { PrintComponent } from './printButton/print.component';
import { SubNavigationComponent } from './navigation/subNavigation.component';
import { FilterArrayPipe } from './pipes/filter.pipe';
import { SafeHtmlPipe } from './pipes/safe.pipe';
import { OtherComponent } from './other/other.component';
import { MaterializeModule } from 'angular2-materialize';
import { DisplayFromComponent } from './dtform/displayForm.component';
import { MenuItemMaintenance } from './itemMaintenance/menuItemMaintenance.component';
import { ItemMaintenanceComponent } from './itemMaintenance/itemMaintenance.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { GenericPageComponent } from './genericPage/genericPage.component';
import { InquiryTinyComponent } from './notepad/tinymce.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { DisplayButtonComponent } from './button/displayButton.component';
import { CustomMaxDirective } from './filter/max.directive';
import { CustomMinDirective } from './filter/min.directive';
import { ExpiryRequiredValidator } from './filter/expiryRequiredValidator.directive';
import { CardRequiredValidator } from './filter/cardRequiredValidator.directive';
import { SearchDisplayComonent } from './genericPage/searchDisplayForm.component';
import { AlertToastComponent } from './popUpMessage/alerttoast.component';
import { MenuShareComponent } from './Menu/menuShare.component';
import { HeaderComponent } from './Menu/header.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
//import { WindowService } from 'projects/Dynamo/src/app/ShareLib/ScreenResolutionService';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

import { httpInterceptProviders } from './interceptor';
import { DynamoToolHomeComponent } from './dynamoToolHome/dynamoToolHome.component';
//import { DynamoHomeComponent } from 'projects/Dynamo/src/app/home/dynamoHome.component';

import { TestMenuComponent } from './TestMenu/testMenu.component';
import { DisplayEditGridComponent } from './displayEditGrid/DisplayEditGrid.component';
import { ApiCallComponent } from './apiCall/apiCall.component';
 import { DragDropModule } from '@angular/cdk/drag-drop';
/* import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'; */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { AutocompleteComponent } from './googleAddress/autoComplete.component';
import { cmsDemoComponent } from './treeDemo/cmsDemo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './dashboard/login.component';
import { TreeControlComponent } from './treeDemo/treeControl.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DataTablesModule } from "angular-datatables";
import { NumberCommaDirective } from './dtform/number-comma.directive';


const routes: Routes = [
  { path: 'userPreferences', component: UserPreferencesComponent },
  { path: 'menuItemMaintenance', component: MenuItemMaintenance },
  { path: 'itemMaintenance', component: ItemMaintenanceComponent },
  { path: 'genericPage', component: GenericPageComponent },
  { path: 'searchDisplay', component: SearchDisplayComonent },
  { path: 'dynamoToolHome', component: DynamoToolHomeComponent },
  { path: 'home', component: DynamoToolHomeComponent }, // added as in response we are receving home
  { path: 'login', component: LoginComponent},
  { path: 'editdisplayGrid', component: DisplayEditGridComponent},
  { path: 'apiCall', component: ApiCallComponent},
  { path: 'cms', component: cmsDemoComponent},
  { path: '**', component: LoginComponent, pathMatch: 'full'}

];

@ NgModule({
  declarations: [
    AppComponent, LoginComponent, UserPreferencesComponent, DisplayGridComponent, DisplaySubGridComponent,
    NavigationComponent, SubNavigationComponent, SearchComponent, AppMenuComponent,
    DisplayViewComponent, PrintComponent, FilterArrayPipe, OtherComponent, DisplayFromComponent,
    MenuItemMaintenance, ItemMaintenanceComponent, GenericPageComponent, InquiryTinyComponent, DisplayButtonComponent,
    CustomMaxDirective, CustomMinDirective, CardRequiredValidator, ExpiryRequiredValidator, SearchDisplayComonent, AlertToastComponent, MenuShareComponent,
    DynamoToolHomeComponent, HeaderComponent, DisplayEditGridComponent,
   TestMenuComponent, TestMenuComponent, ApiCallComponent, AutocompleteComponent, SafeHtmlPipe
, cmsDemoComponent, DashboardComponent, TreeControlComponent, LoginPageComponent,NumberCommaDirective],
  imports: [
    BrowserModule, NgxMaskModule.forRoot(), FormsModule, HttpClientModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), TreeModule,
    MaterializeModule,DataTablesModule
    , OrderModule, NgxPaginationModule, DatePickerModule, AutofocusFixModule.forRoot(), BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }), DeviceDetectorModule.forRoot(),
    DragDropModule, MatSelectModule, MatFormFieldModule, MatTabsModule,
    MatInputModule, BrowserAnimationsModule, ReactiveFormsModule, OverlayModule, MatTreeModule, MatIconModule, MatButtonModule
   , MatExpansionModule, MatProgressBarModule, NgxMaterialTimepickerModule],
  providers: [httpInterceptProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
