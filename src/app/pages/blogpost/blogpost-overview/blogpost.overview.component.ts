import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Blogpost} from './blogpost';
import {BlogpostService} from './blogpost.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'blogpost-overview',
  template: `
    <ng-container *ngIf="blogposts$ | async as blogposts">
      <table class="table table-striped table-responsive">
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{'data.blogpost.publicationDate' | translate}}</th>
          <th scope="col">{{'data.blogpost.title' | translate}}</th>
          <th scope="col">{{'data.blogpost.category' | translate}}</th>
        </tr>
        </thead>
        <tbody>
        <ng-container *ngFor="let blogpost of blogposts; index as zeroBasedRowNumber">
          <blogpost-row [blogpost]="blogpost" [rowNumber]="zeroBasedRowNumber+1"></blogpost-row>
        </ng-container>
        </tbody>
      </table>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogpostOverviewComponent implements OnInit {

  blogposts$: Observable<Blogpost[]>;

  constructor(private blogpostService: BlogpostService) {

  }

  ngOnInit(): void {
    this.blogposts$ = this.blogpostService.getBlogposts$();
  }
}
