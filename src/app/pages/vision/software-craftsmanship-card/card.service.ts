import { Injectable } from '@angular/core';
import { Card } from './card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  wellCraftedSoftwareCard: Card = {
    src: '/assets/images/cogs.png',
    alt: 'Well-crafted software',
    title: 'Well-crafted software',
    paragraphs: [
      `It is Dieter's mission to deliver high quality software. He is humble about his expertise and honest about his capabilities.`,
      `Dieter strives to become a master of his craft and he'd like to master the technologies and techniques he needs to perform his work.`,
      `Dieter takes full responsibility for the correctness of the code written in his team. He doesn't tolerate avoidable bugs. He has an eye for detail in code reviews and tests code thoroughly with a strong preference for test-driven development.`
    ]
  };

  addingValueCard: Card = {
    src: '/assets/images/adding_value.png',
    alt: 'Steadily adding value',
    title: 'Steadily adding value',
    paragraphs: [
      `Dieter makes estimations with diligence. He's not easily influenced by pressure or fear. He makes sure everything is clear before giving his estimation.`,
      `Dieter strives to give his best effort at a sustainable pace.`
    ]
  };

  communityOfProfessionalsCard: Card = {
    src: '/assets/images/professional.png',
    alt: 'A community of professionals',
    title: 'A community of professionals',
    paragraphs: [
      `Dieter embraces different opinions and personalities. He doesn't let the current way of working impede improvements.`,
      `Dieter is willing to share his knowledge with anyone who has the willingness to learn. He shares good practices, his knowledge and likes to learn from others.`
    ]
  };

  productivePartnershipsCard: Card = {
    src: '/assets/images/partnership.png',
    alt: 'Productive partnerships',
    title: 'Productive partnerships',
    paragraphs: [
      `Dieter shows respect for the customer and fellow software crafters. He behaves professionally and ethically.`,
      `Dieter is open and honest to customers. He doesn't conceal or embellish.`,
      `He thinks of the client's interest in building a long-term relationship.`
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
