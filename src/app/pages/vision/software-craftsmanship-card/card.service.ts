import { Injectable } from '@angular/core';
import { Card } from './card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  wellCraftedSoftwareCard: Card = {
    src: '/assets/images/cogs.png',
    alt: 'Well Crafted Software',
    title: 'Well Crafted Software',
    paragraphs: [
      `Dieter is humble about his expertise and honest about his capabilities. He likes to take on a challenge, because he likes to make things happen.`,
      `Dieter strives to become a master of his craft and he tries to master the technologies and techniques he needs to perform his work. To achieve this, he keeps on learning.`,
      `Dieter takes full responsibility for the correctness of the code written in his team. He doesn't tolerate avoidable bugs. He has an eye for detail and tests code thoroughly. He enjoys Test Driven Development.`
    ]
  };

  addingValueCard: Card = {
    src: '/assets/images/adding_value.png',
    alt: 'Steadily Adding Value',
    title: 'Steadily Adding Value',
    paragraphs: [
      `Dieter makes estimations with diligence. He's not easily influenced by pressure or fear. He makes sure everything is clear before giving his estimation.`,
      `Dieter tries to be a reliable partner. Being honest and communicating well are the foundations of any good relationship.`,
      `Dieter strives to give his best effort at a sustainable pace. Dieter wants to be 100% available for his client(s), but also wants to stay healthy. That way, he can be there when he needs to be.`
    ]
  };

  communityOfProfessionalsCard: Card = {
    src: '/assets/images/professional.png',
    alt: 'A Community of Professionals',
    title: 'A Community of Professionals',
    paragraphs: [
      `Dieter embraces different opinions and personalities. By thinking from the customer's needs, every discussion can be solved.`,
      `Not everything is black and white. Fighting doesn't work. Dieter thinks about how he can make things happen and speaks at the right time. He doesn't let the current way of working impede improvements.`,
      `Dieter finds interaction productive, with the client and with colleagues. He is willing to share his knowledge with anyone. He shares good practices, his knowledge and is open to learn from others too.`
    ]
  };

  productivePartnershipsCard: Card = {
    src: '/assets/images/partnership.png',
    alt: 'Productive Partnerships',
    title: 'Productive Partnerships',
    paragraphs: [
      `When looking for a challenge, Dieter looks at two things: the social relevance and the added value for his career. This allows him to apply himself with full conviction over a longer period of time.`,
      `Dieter shows respect for the customer and fellow software crafters. He behaves professionally and ethically.`,
      `Dieter is open and honest to customers. He doesn't conceal or embellish. This does not make sense anyway. If Dieter has a goal, he will go for it 100%.`,
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
