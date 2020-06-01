import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Book} from './book';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[book-row]',
  template: `
    <th scope="row">{{ rowNumber }}</th>
    <td>
      <div class="img-wrapper">
        <div class="line"></div>
        <img class="img-book" [src]="book.base64image | safeBase64Image" alt="jos">
      </div>
    </td>
    <td>
      <ngb-highlight class="book-title" [result]="book.title"></ngb-highlight>
    </td>
    <td>
      <ngb-highlight [result]="book.authors"></ngb-highlight>
    </td>
    <td>
      <ngb-highlight [result]="book.yearRead | numberToString"></ngb-highlight>
    </td>
    <!--    <td>-->
    <!--      <span class="fa fa-star checked"></span>-->
    <!--      <span class="fa fa-star checked"></span>-->
    <!--      <span class="fa fa-star checked"></span>-->
    <!--      <span class="fa fa-star checked"></span>-->
    <!--      <span class="fa fa-star fa-star-gray"></span>-->
    <!--    </td>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .img-book {
      padding-left: 12px;
    }

    .img-book {
      height: 150px;
      width: 130px;
      border: 1px solid black;
    }

    .checked {
      color: orange;
    }

    .fa-star-gray {
      color: lightgrey;
    }

    .img-wrapper {
      padding-bottom: 12px;
      padding-right: 12px;
    }

    .img-wrapper:before {
      content: '';
      margin-left: 1px;
      border-left: 12px solid rgba(0, 0, 0, 0.9);
      height: 150px;
      position: absolute;
    }

    .img-wrapper:after {
      content: '';
      height: 150px;
      width: 130px;
      margin-left: -130px;
      position: absolute;
      box-shadow: 1px 1px 1px 1px black,
      2px 2px 1px 1px lightgrey,
      3px 3px 1px 1px gray,
      4px 4px 1px 1px lightgrey,
      5px 5px 1px 1px gray,
      6px 6px 1px 1px lightgrey,
      7px 7px 1px 1px black;
    }

    .line {
      background-color: black;
      margin-top: 150px;
      margin-left: 3px;
      width: 1px;
      z-index: 1;
      height: 9px;
      transform: rotate(135deg);
      position: absolute;
    }
  `
  ]
})
export class BookComponent {
  @Input()
  book: Book;

  @Input()
  rowNumber: number;
}
