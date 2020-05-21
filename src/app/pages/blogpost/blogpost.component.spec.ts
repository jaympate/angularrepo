import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslatePipeMock} from '../../translation/translate.pipe.mock';
import {BlogpostComponent} from './blogpost.component';
import {BlogpostOverviewComponent} from './blogpost-overview/blogpost.overview.component';
import {DateLocaleFilter} from '../../common/date.locale.filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BlogpostService} from './blogpost-overview/blogpost.service';
import {TranslateModule} from '@ngx-translate/core';
import {MockComponent} from 'ng-mocks';

describe('BlogpostComponent', () => {
  let component: BlogpostComponent;
  let fixture: ComponentFixture<BlogpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientModule, TranslateModule.forRoot()],
      declarations: [
        BlogpostComponent,
        MockComponent(BlogpostOverviewComponent),
        TranslatePipeMock,
        DateLocaleFilter,
      ],
      providers: [
        {
          provide: BlogpostService,
          useValue: {
            getBlogposts$: jest.fn(),
          },
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(fixture).toMatchInlineSnapshot(`
      <app-blogpost>
        <div
          class="container pt-4 pb-4"
        >
          <h1>
            blogpost.title.translated
          </h1>
          <blogpost-overview />
        </div>
      </app-blogpost>
    `);
  });
});
