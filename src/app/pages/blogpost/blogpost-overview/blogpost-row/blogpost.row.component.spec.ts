import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { BlogpostRowComponent } from "./blogpost.row.component";
import { TranslatePipeMock } from "../../../../translation/translate.pipe.mock";
import { DateLocaleFilter } from "../../../../common/date.locale.filter";
import { Builder } from "builder-pattern";
import { Blogpost } from "../blogpost";

describe("BlogpostRowComponent", () => {
  let component: BlogpostRowComponent;
  let fixture: ComponentFixture<BlogpostRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientModule, TranslateModule.forRoot()],
      declarations: [BlogpostRowComponent, TranslatePipeMock, DateLocaleFilter],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostRowComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should render a list of two blogposts, when there are two given", () => {
    component.blogpost = Builder<Blogpost>()
      .title("my title")
      .url("www.my.title.com")
      .publicationDate(new Date("2020-12-15"))
      .category("general")
      .build();
    component.rowNumber = 5;
    fixture.detectChanges();
    expect(fixture).toMatchInlineSnapshot(`
      <div
        blogpost={[Function Object]}
        rowNumber={[Function Number]}
      >
        <th
          scope="row"
        >
          5
        </th><td>
          <ngb-highlight
            class="blogpost-publication-date"
          >
            
            
            15 December 2020
            
          </ngb-highlight>
        </td><td>
          <ngb-highlight
            class="blogpost-title"
          >
            
            
            my title
            
          </ngb-highlight>
          <a
            class="ml-1"
            href="www.my.title.com"
            target="_blank"
          >
            <i
              class="fa fa-external-link"
            />
          </a>
        </td><td>
          <ngb-highlight
            class="blogpost-category"
          >
            
            
            general
            
          </ngb-highlight>
        </td>
      </div>
    `);
  });
});
