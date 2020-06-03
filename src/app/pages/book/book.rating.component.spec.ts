import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookRatingComponent} from './book.rating.component';

describe('BookRatingComponent', () => {
  let component: BookRatingComponent;
  let fixture: ComponentFixture<BookRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookRatingComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRatingComponent);
    component = fixture.componentInstance;
  });

  it('shows five empty stars, when the rating is zero', () => {
    component.rating = 0;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('[data-jest="empty star"]').length
    ).toEqual(5);
  });

  it('shows five full stars, when the rating is five', () => {
    component.rating = 5;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('[data-jest="full star"]').length
    ).toEqual(5);
  });

  it('shows no full stars, when the rating is zero', () => {
    component.rating = 0;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('[data-jest="full star"]').length
    ).toEqual(0);
  });

  it('shows no empty stars, when the rating is five', () => {
    component.rating = 5;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('[data-jest="empty star"]').length
    ).toEqual(0);
  });

  it('shows no half star, when the rating has no remainder', () => {
    component.rating = 0;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-jest="half star"]')
    ).toBeNull();
  });

  it('shows a half star, when the rating has a remainder', () => {
    component.rating = 0.5;

    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-jest="half star"]')
    ).not.toBeNull();
  });

  it('shows 3 full stars, a half star and 1 empty star, when the rating 3.5', () => {
    component.rating = 3.5;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-jest="stars"]'))
      .toMatchInlineSnapshot(`
      <div
        class="book-rating"
        data-jest="stars"
      >

        <span
          class="fa fa-star checked"
          data-jest="full star"
        />
        <span
          class="fa fa-star checked"
          data-jest="full star"
        />
        <span
          class="fa fa-star checked"
          data-jest="full star"
        />

        <span
          class="fa fa-star-half-empty"
          data-jest="half star"
        />

        <span
          class="fa fa-star-o"
          data-jest="empty star"
        />
      </div>
    `);
  });
});
