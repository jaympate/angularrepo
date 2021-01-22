import { Injectable } from '@angular/core';
import { Card } from './card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  wellCraftedSoftwareCard: Card = {
    src: '/assets/images/cogs.png',
    alt: 'my.vision.well.crafted.software.alt',
    title: 'my.vision.well.crafted.software.title',
    paragraphs: [
      'my.vision.well.crafted.software.part1',
      'my.vision.well.crafted.software.part2',
      'my.vision.well.crafted.software.part3'
    ]
  };

  addingValueCard: Card = {
    src: '/assets/images/adding_value.png',
    alt: 'my.vision.steadily.adding.value.alt',
    title: 'my.vision.steadily.adding.value.title',
    paragraphs: [
      'my.vision.steadily.adding.value.part1',
      'my.vision.steadily.adding.value.part2'
    ]
  };

  communityOfProfessionalsCard: Card = {
    src: '/assets/images/professional.png',
    alt: 'my.vision.community.of.professionals.alt',
    title: 'my.vision.community.of.professionals.title',
    paragraphs: [
      'my.vision.community.of.professionals.part1',
      'my.vision.community.of.professionals.part2'
    ]
  };

  productivePartnershipsCard: Card = {
    src: '/assets/images/partnership.png',
    alt: 'my.vision.productive.partnerships.alt',
    title: 'my.vision.productive.partnerships.title',
    paragraphs: [
      'my.vision.productive.partnerships.part1',
      'my.vision.productive.partnerships.part2',
      'my.vision.productive.partnerships.part3'
    ]
  };

  cards: Observable<Array<Card>>;

  constructor() {
    const stubData = [
      this.wellCraftedSoftwareCard,
      this.addingValueCard,
      this.communityOfProfessionalsCard,
      this.productivePartnershipsCard
    ];
    this.cards = of(stubData);
  }

  getCards$(): Observable<Array<Card>> {
    return this.cards;
  }
}
