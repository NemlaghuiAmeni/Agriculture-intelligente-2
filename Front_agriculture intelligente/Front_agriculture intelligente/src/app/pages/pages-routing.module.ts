import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {ProfileComponent} from './auth/profile/profile.component';
import {AddsiteComponent} from './site/addsite/addsite.component';
import {AllsiteComponent} from './site/allsite/allsite.component';
import {MapboxComponent} from './mapbox/mapbox/mapbox.component';
import {AddligneComponent} from './ligne/addligne/addligne.component';
import {AllligneComponent} from './ligne/allligne/allligne.component';
import {AddDeviceComponent} from './device/add-device/add-device.component';
import {AlldeviceComponent} from './device/alldevice/alldevice.component';
import {AlertComponent} from './Alert/alert/alert.component';
import {DimmingControlComponent} from './dimming/dimming-control/dimming-control.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
   /* {
      path: 'dashboard',
      component: ECommerceComponent,
    },*/
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'addsite',
      component: AddsiteComponent,
    },
    {
      path: 'allsite',
      component: AllsiteComponent,
    },
    {
      path: 'addligne',
      component: AddligneComponent,
    },
    {
      path: 'allligne',
      component: AllligneComponent,
    },
    {
      path: 'addDevice',
      component: AddDeviceComponent,
    },
    {
      path: 'alldevice',
      component: AlldeviceComponent,
    },
    {
      path: 'mapbox',
      component: MapboxComponent,
    },
    {
      path: 'alert',
      component: AlertComponent,
    },
    {
      path: 'dimming',
      component: DimmingControlComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
