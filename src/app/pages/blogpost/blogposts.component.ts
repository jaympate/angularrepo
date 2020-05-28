import {ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Blogpost} from './blogpost';
import {BlogpostService} from './blogpost.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {SortEvent} from '../data/sort.event';
import {SortableHeaderDirective} from '../data/sortable-header.directive';
import {map, tap} from 'rxjs/operators';
import {compare} from '../data/compare';

@Component({
  selector: 'my-blogposts',
  template: `
    <div class="container pt-4 pb-4">
      <h1>{{'website.blogposts' | translate}}</h1>
      <ng-container *ngIf="blogposts$ | async as blogposts">
        <table class="table table-striped table-responsive">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col" sortable="publicationDate" (sort)="onSort($event)">{{'data.blogpost.publicationDate' | translate}}</th>
            <th scope="col" sortable="title" (sort)="onSort($event)">{{'data.blogpost.title' | translate}}</th>
            <th scope="col" sortable="category" (sort)="onSort($event)">{{'data.blogpost.category' | translate}}</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let blogpost of blogposts; index as zeroBasedRowNumber" blogpost-row
              [blogpost]="blogpost"
              [rowNumber]="zeroBasedRowNumber+1"></tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styles: [
      `
      .asc::before {
        content: "\\25be";
        float: right;
        color: gray;
      }

      .desc::before {
        content: "\\25b4";
        float: right;
        color: gray;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogpostsComponent implements OnInit {
  blogposts$: Observable<Blogpost[]>;

  @ViewChildren(SortableHeaderDirective)
  sortableHeaderDirectives: QueryList<SortableHeaderDirective>;

  private sortEventBehaviorSubject = new BehaviorSubject<SortEvent>(SortEvent.unsortedEvent());

  constructor(private blogpostService: BlogpostService) {

  }

  ngOnInit(): void {
    const blogposts$ = this.blogpostService.getBlogposts$();

    const sortEventObservable$ = this.sortEventBehaviorSubject.asObservable().pipe(
      tap(sortEvent => this.resetHeadersToUnsorted(sortEvent))
    );

    this.blogposts$ = combineLatest([blogposts$, sortEventObservable$])
      .pipe(
        map(([blogposts, sortEvent]) => this.sortBlogposts(blogposts, sortEvent))
      );
  }

  private resetHeadersToUnsorted(sortEvent: SortEvent): void {
    if (!!this.sortableHeaderDirectives) {
      this.sortableHeaderDirectives
        .filter(header => !sortEvent.isEqualTo(header.sortable))
        .forEach(header => header.clearDirection());
    }
  }

  onSort(sortEvent: SortEvent): void {
    this.sortEventBehaviorSubject.next(sortEvent);
  }

  private sortBlogposts(blogposts: Blogpost[], sortEvent: SortEvent) {
    if (sortEvent.isUnsorted()) {
      return [...blogposts];
    }
    return this.sortBlogpostsAccordingToDirectionOfSortEvent(blogposts, sortEvent);
  }

  private sortBlogpostsAccordingToDirectionOfSortEvent(blogposts: Blogpost[], sortEvent: SortEvent): Blogpost[] {
    return [...blogposts].sort((blogpost1, blogpost2) => {
      const sortablePropertyName = sortEvent.sortablePropertyName;

      const blogpostProperty1 = blogpost1[sortablePropertyName];
      const blogpostProperty2 = blogpost2[sortablePropertyName];

      if (sortEvent.isAscending()) {
        return compare(blogpostProperty1, blogpostProperty2);
      }
      return compare(blogpostProperty2, blogpostProperty1);
    });
  }
}
