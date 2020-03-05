import {Component, OnInit} from '@angular/core';
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
        <tr *ngFor="let blogpost of blogposts ; index as i">
          <th scope="row">{{ i + 1 }}</th>
          <td>
            <ngb-highlight class="blogpost-publication-date" [result]="blogpost.publicationDate | dateLocale : 'DD MMMM YYYY'"></ngb-highlight>
          </td>
          <td>
            <ngb-highlight class="blogpost-title" [result]="blogpost.title"></ngb-highlight>
            <a class="ml-1" target="_blank" href="{{blogpost.url}}"><i class="fa fa-external-link"></i></a>
          </td>
          <td>
            <ngb-highlight class="blogpost-category" [result]="blogpost.category"></ngb-highlight>
          </td>
        </tr>
        </tbody>
      </table>
    </ng-container>
  `
})
export class BlogpostOverviewComponent implements OnInit {

  blogposts$: Observable<Blogpost[]>;

  constructor(private blogpostService: BlogpostService) {

  }

  ngOnInit(): void {
    this.blogposts$ = this.blogpostService.getBlogposts$();
  }
}
