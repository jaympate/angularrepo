import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookRatingComponent} from './book.rating.component';

describe('BookRatingComponent', () => {
  let component: BookRatingComponent;
  let fixture: ComponentFixture<BookRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookRatingComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRatingComponent);
    component = fixture.componentInstance;
  });

  describe('when the rating n has no remainder', () => {
    const n = 3;

    it('shows no half star', () => {
      component.rating = n;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-jest="half star"]')).toBeNull();
    });

    it('shows 5-n empty stars', () => {
      component.rating = n;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('[data-jest="empty star"]').length).toEqual(2);
    });

    it('shows n full stars', () => {
      component.rating = n;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('[data-jest="full star"]').length).toEqual(3);
    });
  });

  describe('when the rating has a remainder', () => {
    const n = 2.5;

    it('shows a half star', () => {
      component.rating = n;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-jest="half star"]')).not.toBeNull();
    });

    it('shows 5 - (n + 0.5) empty stars', () => {
      component.rating = n;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('[data-jest="empty star"]').length).toEqual(2);
    });

    it('shows n - 0.5 full stars', () => {
      component.rating = n;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('[data-jest="full star"]').length).toEqual(2);
    });
  });
});
