import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MessageComponent } from './message/message.component';

const PAGE_COMPONENTS = [
  MessageComponent
]

@NgModule({
  declarations: [
    PAGE_COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PAGE_COMPONENTS
  ]
})
export class ComponentsModule { }
