import {Injectable} from '@angular/core';
import {Card} from './card';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  wellCraftedSoftwareCard: Card = {
    src: '/assets/images/cogs.png',
    alt: 'website.well.crafted.software.alt',
    title: 'website.well.crafted.software.title',
    paragraphs: [
      'website.well.crafted.software.part1',
      'website.well.crafted.software.part2',
      'website.well.crafted.software.part3'
    ]
  };

  addingValueCard: Card = {
    src: '/assets/images/adding_value.png',
    alt: 'website.steadily.adding.value.alt',
    title: 'website.steadily.adding.value.title',
    paragraphs: [
      'website.steadily.adding.value.part1',
      'website.steadily.adding.value.part2'
    ]
  };

  communityOfProfessionalsCard: Card = {
    src: '/assets/images/professional.png',
    alt: 'website.community.of.professionals.alt',
    title: 'website.community.of.professionals.title',
    paragraphs: [
      'website.community.of.professionals.part1',
      'website.community.of.professionals.part2'
    ]
  };

  productivePartnershipsCard: Card = {
    src: '/assets/images/partnership.png',
    alt: 'website.productive.partnerships.alt',
    title: 'website.productive.partnerships.title',
    paragraphs: [
      'website.productive.partnerships.part1',
      'website.productive.partnerships.part2',
      'website.productive.partnerships.part3'
    ]
  };

  cards: Array<Card>;

  constructor() {
    this.cards = [
      this.wellCraftedSoftwareCard,
      this.addingValueCard,
      this.communityOfProfessionalsCard,
      this.productivePartnershipsCard
    ];
  }

  getCards$(): Observable<Array<Card>> {
    return of(this.cards);
  }
}
