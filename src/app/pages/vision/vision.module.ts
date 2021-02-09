import { NgModule } from '@angular/core';
import { VisionComponent } from './vision.component';
import { SoftwareCraftsmanshipCardComponent } from './software-craftsmanship-card/software-craftsmanship-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SoftwareCraftsmanshipCardComponent, VisionComponent]
})
export class VisionModule {}
