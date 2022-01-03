import { NgModule } from '@angular/core';
import {
  NbAlertModule, NbBadgeModule,
  NbButtonModule,
  NbCardModule, NbChatModule, NbCheckboxModule,
  NbInputModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule, NbToggleModule,
} from '@nebular/theme';
import { GaugeChartModule } from 'angular-gauge-chart';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

/*
import { SDevicesComponent } from './s-devices/s-devices.component';

import { AddsensorComponent } from './addsensor/addsensor.component';
import { AddfactoryComponent } from './factory/addfactory/addfactory.component';
import { AllfactoryComponent } from './factory/allfactory/allfactory.component';*/
// import { MapboxComponent } from './mapbox/mapbox.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ReclamationComponent } from './reclamation/reclamation.component';
 // import { StatComponent } from './stat/stat.component';

// import {NgxAlertComponent} from './Alert/alert.compoent';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NbAuthModule} from '@nebular/auth';
// import { ChatComponent } from './chat/chat.component';
import {ExtraComponentsModule} from './extra-components/extra-components.module';
import { AddsiteComponent } from './site/addsite/addsite.component';
import { AllsiteComponent } from './site/allsite/allsite.component';
import { MapboxComponent } from './mapbox/mapbox/mapbox.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './auth/service/token-interceptor.service';
import { AddligneComponent } from './ligne/addligne/addligne.component';
import { AllligneComponent } from './ligne/allligne/allligne.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { AlldeviceComponent } from './device/alldevice/alldevice.component';
import {UiSwitchModule} from 'ngx-toggle-switch';
import { AlertComponent } from './Alert/alert/alert.component';
import { DimmingControlComponent } from './dimming/dimming-control/dimming-control.component';

// import { PlaceComponent } from './factory/place/place.component';
// import { UiSwitchModule } from 'ngx-toggle-switch';
// import {TarifComponent} from './tarif/tarif.component';
// import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
// import { FactureComponent } from './facture/facture.component';


//



@NgModule({
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi   : true,
    },
  ],

  imports: [
    GaugeChartModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbChatModule,
    ExtraComponentsModule,
    UiSwitchModule,
    NbToggleModule,
    NbBadgeModule,
    //   AngularDateTimePickerModule,

  ],
  declarations: [
    PagesComponent,
    AddsiteComponent,
    AllsiteComponent,
    MapboxComponent,
    AddligneComponent,
    AllligneComponent,
    AddDeviceComponent,
    AlldeviceComponent,
    AlertComponent,
    DimmingControlComponent,
   /* SDevicesComponent,
    MapboxComponent,
    AddsensorComponent,
    AddfactoryComponent,
    AllfactoryComponent,
    ReclamationComponent,
    StatComponent,
    NgxAlertComponent,
    ChatComponent,
    PlaceComponent,
    TarifComponent,
    FactureComponent*/
  ],
})
export class PagesModule {
}
