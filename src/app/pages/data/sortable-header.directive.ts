import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { SortEvent } from './sort.event';
import { SortDirection } from './sort.direction';

@Directive({
  selector: 'th[sortable]'
})
export class SortableHeaderDirective {
  @Input() sortable: string;
  @Input() direction: SortDirection = 'unsorted';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc')
  get ascending() {
    return this.direction === 'asc';
  }

  @HostBinding('class.desc')
  get descending() {
    return this.direction === 'desc';
  }

  @HostListener('click')
  rotate(): void {
    this.direction = this.rotateDirection(this.direction);
    const sortablePropertyName = this.sortable;
    this.sort.emit(SortEvent.of(sortablePropertyName, this.direction));
  }

  rotateDirection(key: string): SortDirection {
    if (key === 'asc') {
      return 'desc';
    } else if (key === 'desc') {
      return 'unsorted';
    }
    return 'asc';
  }

  clearDirection() {
    this.direction = 'unsorted';
  }
}
