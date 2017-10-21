import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlainsightlistComponent } from '@app/plainsightlist/plainsightlist.component';
const appRoutes: Routes = [
    {
        path: 'plainsight',
        component: PlainsightlistComponent
    }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
