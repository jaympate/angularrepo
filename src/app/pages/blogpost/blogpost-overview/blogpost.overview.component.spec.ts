import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {BlogpostOverviewComponent} from './blogpost.overview.component';
import {TranslatePipeMock} from '../../../translation/translate.pipe.mock';
import {DateLocaleFilter} from '../../../common/date.locale.filter';
import {BlogpostService} from './blogpost.service';
import {BehaviorSubject} from 'rxjs';
import {Blogpost} from './blogpost';
import {Builder} from 'builder-pattern';
import {MockComponent} from 'ng-mocks';
import {BlogpostRowComponent} from './blogpost-row/blogpost.row.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {SortableHeaderDirective} from '../../data/sortable-header.directive';

describe("BlogpostOverviewComponent", () => {
  let component: BlogpostOverviewComponent;
  let fixture: ComponentFixture<BlogpostOverviewComponent>;
  let blogpostSubject = new BehaviorSubject<Blogpost[]>(null);

  beforeEach(() => {
    const blogposts$ = jest
      .fn()
      .mockReturnValue(blogpostSubject.asObservable());

    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientModule, TranslateModule.forRoot()],
      declarations: [
        BlogpostOverviewComponent,
        SortableHeaderDirective,
        MockComponent(BlogpostRowComponent),
        TranslatePipeMock,
        DateLocaleFilter,
      ],
      providers: [
        {
          provide: BlogpostService,
          useValue: {
            getBlogposts$: blogposts$,
          },
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostOverviewComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("renders a table with #, publicationDate, title, category and an amount of blogposts (e.g. 2)", () => {
    blogpostSubject.next([
      Builder<Blogpost>().build(),
      Builder<Blogpost>().build(),
    ]);

    fixture.detectChanges();
    expect(fixture).toMatchInlineSnapshot(`
      <blogpost-overview
        blogpostService={[Function Object]}
        blogposts$={[Function Observable]}
        sortEventBehaviorSubject={[Function BehaviorSubject]}
        sortableHeaderDirectives={[Function QueryList]}
      >
        <table
          class="table table-striped table-responsive"
        >
          <thead
            class="thead-dark"
          >
            <tr>
              <th
                scope="col"
              >
                #
              </th>
              <th
                scope="col"
                sortable="publicationDate"
              >
                data.blogpost.publicationDate.translated
              </th>
              <th
                scope="col"
                sortable="title"
              >
                data.blogpost.title.translated
              </th>
              <th
                scope="col"
                sortable="category"
              >
                data.blogpost.category.translated
              </th>
            </tr>
          </thead>
          <tbody>

            <tr
              blogpost-row=""
            />
            <tr
              blogpost-row=""
            />
          </tbody>
        </table>
      </blogpost-overview>
    `);
  });

  describe("on init", () => {
    it("passes the blogposts from the service to the blogpost row components as input and not sorted", () => {
      const blogposts = [
        Builder<Blogpost>().title("first blogpost").build(),
        Builder<Blogpost>().title("second blogpost").build(),
      ];

      blogpostSubject.next(blogposts);

      fixture.detectChanges();

      const actualBlogposts = getBlogpostRowComponents().map(
        (blogpostRowComponent) => blogpostRowComponent.blogpost
      );

      expect(actualBlogposts).toEqual(blogposts);
    });

    it("should number every blogpost correctly, for the amount of blogposts", () => {
      const blogposts = [
        Builder<Blogpost>().build(),
        Builder<Blogpost>().build(),
        Builder<Blogpost>().build(),
      ];

      blogpostSubject.next(blogposts);

      fixture.detectChanges();

      const actualRowNumbers = getBlogpostRowComponents().map(
        (blogpostRowComponent) => blogpostRowComponent.rowNumber
      );

      expect(actualRowNumbers).toEqual([1, 2, 3]);
    });
  });

  describe("sorting", () => {
    beforeEach(() => {
      const blogposts = [
        Builder<Blogpost>()
          .publicationDate(new Date("2020-12-15"))
          .title("the good blogpost")
          .build(),
        Builder<Blogpost>()
          .publicationDate(new Date("2019-05-18"))
          .title("the bad blogpost")
          .build(),
        Builder<Blogpost>()
          .publicationDate(new Date("2020-03-01"))
          .title("the ugly blogpost")
          .build(),
      ];

      blogpostSubject.next(blogposts);
      fixture.detectChanges();
    });

    it('sorts blogposts "date of publication" ascending on first click', () => {
      const publicationDate = `publicationDate`;

      clickSortableColumn(publicationDate);

      const actualBlogposts = getBlogpostRowComponents().map(
        (blogpostRowComponent) => blogpostRowComponent.blogpost
      );

      expect(actualBlogposts).toMatchInlineSnapshot(`
        Array [
          Object {
            "publicationDate": 2019-05-18T00:00:00.000Z,
            "title": "the bad blogpost",
          },
          Object {
            "publicationDate": 2020-03-01T00:00:00.000Z,
            "title": "the ugly blogpost",
          },
          Object {
            "publicationDate": 2020-12-15T00:00:00.000Z,
            "title": "the good blogpost",
          },
        ]
      `);
    });

    it('sorts blogposts "date of publication" descending on second click', () => {
      const publicationDate = `publicationDate`;

      clickSortableColumn(publicationDate, 2);

      const actualBlogposts = getBlogpostRowComponents().map(
        (blogpostRowComponent) => blogpostRowComponent.blogpost
      );

      expect(actualBlogposts).toMatchInlineSnapshot(`
        Array [
          Object {
            "publicationDate": 2020-12-15T00:00:00.000Z,
            "title": "the good blogpost",
          },
          Object {
            "publicationDate": 2020-03-01T00:00:00.000Z,
            "title": "the ugly blogpost",
          },
          Object {
            "publicationDate": 2019-05-18T00:00:00.000Z,
            "title": "the bad blogpost",
          },
        ]
      `);
    });

    it('blogposts are unsorted again on "date of publication" on third click', () => {
      const publicationDate = `publicationDate`;

      clickSortableColumn(publicationDate, 3);

      const actualBlogposts = getBlogpostRowComponents().map(
        (blogpostRowComponent) => blogpostRowComponent.blogpost
      );

      expect(actualBlogposts).toMatchInlineSnapshot(`
        Array [
          Object {
            "publicationDate": 2020-12-15T00:00:00.000Z,
            "title": "the good blogpost",
          },
          Object {
            "publicationDate": 2019-05-18T00:00:00.000Z,
            "title": "the bad blogpost",
          },
          Object {
            "publicationDate": 2020-03-01T00:00:00.000Z,
            "title": "the ugly blogpost",
          },
        ]
      `);
    });
  });

  function clickSortableColumn(columnName: string, times: number = 1): void {
    const sortableColumn: HTMLElement = fixture.nativeElement.querySelector(
      `[sortable="${columnName}"]`
    );

    for (let i: number = 0; i < times; i++) {
      sortableColumn.click();
      fixture.detectChanges();
    }
  }

  function getBlogpostRowComponents(): BlogpostRowComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(BlogpostRowComponent))
      .map(
        (component: DebugElement) => component.componentInstance
      ) as BlogpostRowComponent[];
  }
});
