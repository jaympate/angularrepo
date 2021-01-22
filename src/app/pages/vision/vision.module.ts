import { NgModule } from '@angular/core';
import { VisionComponent } from './vision.component';
import { SoftwareCraftsmanshipCardComponent } from './software-craftsmanship-card/software-craftsmanship-card.component';
import { TranslationModule } from '../../translation/translation.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [TranslationModule, CommonModule],
  declarations: [SoftwareCraftsmanshipCardComponent, VisionComponent]
})
export class VisionModule {}
