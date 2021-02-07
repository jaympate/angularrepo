import {Component, Input} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-faq-option',
  templateUrl: './faq-option.component.html',
  styleUrls: ['./faq-option.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('true => false', animate('0.1s ease-in')),
      transition('false => true', animate('0.1s ease-out'))
    ])
  ]
})
export class FaqOptionComponent {
  @Input()
  question: string;

  @Input()
  answer: string;

  collapse = true;

  toggle(): void {
    this.collapse = !this.collapse;
  }
}
