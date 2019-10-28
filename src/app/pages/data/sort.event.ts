import {SortDirection} from './sort.direction';

export class SortEvent {
  private constructor(public sortablePropertyName: string, public direction: SortDirection) {
  }

  static of(sortablePropertyName: string, direction: SortDirection) {
    return new SortEvent(sortablePropertyName, direction);
  }

  static unsortedEvent() {
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
