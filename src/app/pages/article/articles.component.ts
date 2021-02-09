import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Article } from './article';
import { ArticleService } from './article.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { SortEvent } from '../data/sort.event';
import { SortableHeaderDirective } from '../data/sortable-header.directive';
import { map, tap } from 'rxjs/operators';
import { compare } from '../data/compare';

@Component({
  selector: 'my-articles',
  template: `
    <div class="container pt-2 pb-2">
      <h1>Articles</h1>
      <ng-container *ngIf="articles$ | async as articles">
        <table class="table table-striped table-responsive">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Preview</th>
              <th
                scope="col"
                sortable="publicationDate"
                (sort)="onSort($event)"
              >Date of publication</th>
              <th scope="col" sortable="title" (sort)="onSort($event)">Title</th>
              <th scope="col" sortable="category" (sort)="onSort($event)">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let article of articles; index as zeroBasedRowNumber"
              article-row
              [article]="article"
              [rowNumber]="zeroBasedRowNumber + 1"
            ></tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .asc::before {
        content: '\\25be';
        float: right;
        color: gray;
      }

      .desc::before {
        content: '\\25b4';
        float: right;
        color: gray;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent implements OnInit {
  articles$: Observable<Article[]>;

  @ViewChildren(SortableHeaderDirective)
  sortableHeaderDirectives: QueryList<SortableHeaderDirective>;

  private sortEventBehaviorSubject = new BehaviorSubject<SortEvent>(
    SortEvent.unsortedEvent()
  );

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    const articles$ = this.articleService.getArticles$();

    const sortEventObservable$ = this.sortEventBehaviorSubject
      .asObservable()
      .pipe(tap((sortEvent) => this.resetHeadersToUnsorted(sortEvent)));

    this.articles$ = combineLatest([articles$, sortEventObservable$]).pipe(
      map(([articles, sortEvent]) => this.sortArticles(articles, sortEvent))
    );
  }

  private resetHeadersToUnsorted(sortEvent: SortEvent): void {
    if (!!this.sortableHeaderDirectives) {
      this.sortableHeaderDirectives
        .filter((header) => !sortEvent.isEqualTo(header.sortable))
        .forEach((header) => header.clearDirection());
    }
  }

  onSort(sortEvent: SortEvent): void {
    this.sortEventBehaviorSubject.next(sortEvent);
  }

  private sortArticles(articles: Article[], sortEvent: SortEvent) {
    if (sortEvent.isUnsorted()) {
      return [...articles];
    }
    return this.sortArticlesAccordingToDirectionOfSortEvent(
      articles,
      sortEvent
    );
  }

  private sortArticlesAccordingToDirectionOfSortEvent(
    articles: Article[],
    sortEvent: SortEvent
  ): Article[] {
    return [...articles].sort((article1, article2) => {
      const sortablePropertyName = sortEvent.sortablePropertyName;

      const articleProperty1 = article1[sortablePropertyName];
      const articleProperty2 = article2[sortablePropertyName];

      if (sortEvent.isAscending()) {
        return compare(articleProperty1, articleProperty2);
      }
      return compare(articleProperty2, articleProperty1);
    });
  }
}
