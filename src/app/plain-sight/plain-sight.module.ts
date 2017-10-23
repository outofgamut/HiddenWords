import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { PlainSightListComponent } from './plain-sight-list/plain-sight-list.component';
import { PlainSightRoutingModule } from './plain-sight-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlainSightRoutingModule,
    MatCardModule
  ],
  declarations: [PlainSightListComponent]
})
export class PlainSightModule { }
