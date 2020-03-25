import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { BlogpostOverviewComponent } from "./blogpost.overview.component";
import { TranslatePipeMock } from "../../../translation/translate.pipe.mock";
import { DateLocaleFilter } from "../../../common/date.locale.filter";
import { BlogpostService } from "./blogpost.service";
import { BehaviorSubject } from "rxjs";
import { Blogpost } from "./blogpost";
import { Builder } from "builder-pattern";
import { MockComponent } from "ng-mocks";
import { BlogpostRowComponent } from "./blogpost-row/blogpost.row.component";
import { By } from "@angular/platform-browser";

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
              >
                data.blogpost.publicationDate.translated
              </th>
              <th
                scope="col"
              >
                data.blogpost.title.translated
              </th>
              <th
                scope="col"
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

  it("blogposts passed should be the correct ones", () => {
    const blogposts = [
      Builder<Blogpost>().build(),
      Builder<Blogpost>().build(),
    ];

    blogpostSubject.next(blogposts);

    fixture.detectChanges();

    const blogpostRowComponents = fixture.debugElement
      .queryAll(By.directive(BlogpostRowComponent))
      .map(
        (component) => component.componentInstance
      ) as BlogpostRowComponent[];
    const actualBlogposts = blogpostRowComponents.map(
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

    const blogpostRowComponents = fixture.debugElement
      .queryAll(By.directive(BlogpostRowComponent))
      .map(
        (component) => component.componentInstance
      ) as BlogpostRowComponent[];
    const actualRowNumbers = blogpostRowComponents.map(
      (blogpostRowComponent) => blogpostRowComponent.rowNumber
    );

    expect(actualRowNumbers).toEqual([1, 2, 3]);
  });
});
