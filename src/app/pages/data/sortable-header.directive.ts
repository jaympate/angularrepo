import {Directive, EventEmitter, Input, Output} from '@angular/core';

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

export type SortDirection = 'asc' | 'desc' | 'unsorted';

export class SortEvent {
  private constructor(public sortablePropertyName: string, public direction: SortDirection) {
  }

  static of(sortablePropertyName: string, direction: SortDirection) {
    return new SortEvent(sortablePropertyName, direction);
  }

  static ofEmpty() {
    return new SortEvent('', 'unsorted');
  }

  isAscending(): boolean {
    return this.direction === 'asc';
  }

  isUnsorted(): boolean {
    return this.direction === 'unsorted';
  }

  isEqualTo(sortablePropertyName: string) {
    return this.sortablePropertyName === sortablePropertyName;
  }
}
