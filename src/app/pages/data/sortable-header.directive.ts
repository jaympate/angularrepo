import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {SortEvent} from './sort.event';
import {SortDirection} from './sort.direction';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableHeaderDirective {

  @Input() sortable: string;
  @Input() direction: SortDirection = 'unsorted';
  @Output() sort = new EventEmitter<SortEvent>();

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


