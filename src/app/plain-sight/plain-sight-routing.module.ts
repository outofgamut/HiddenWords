import { PlainSightListComponent } from './plain-sight-list/plain-sight-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PlainSightListComponent,
    // children: [
    //   {path: '', component: GraphicsProductionDashboardComponent},
    //   { path: 'tasks', loadChildren: './graphics-tasks/graphics-tasks.module#GraphicsTasksModule'}
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlainSightRoutingModule { }
