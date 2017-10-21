import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlainSightRoutingModule } from './plain-sight-routing.module';
import { PlainSightListComponent } from './plain-sight-list/plain-sight-list.component';

@NgModule({
  imports: [
    CommonModule,
    PlainSightRoutingModule
  ],
  declarations: [PlainSightListComponent]
})
export class PlainSightModule { }
