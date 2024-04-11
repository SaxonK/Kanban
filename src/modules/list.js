import { generateUniqueId } from './idGenerator';

export class List {
  constructor({id, boardId, title, cards, displayOrder, isDeleted}) {
    this.id = id;
    this.boardId = boardId;
    this.title = title || '';
    this.cards = cards || [];
    this.displayOrder = displayOrder;
    this.isDeleted = isDeleted || false;
  }
  get activeCards() {
    return this.cards.filter(card => !card.isDeleted).sort((a, b) => a.displayOrder - b.displayOrder);
  }
  get minimumDisplayOrder() {
    return this.activeCards[0].displayOrder;
  }
  get maximumDisplayOrder() {
    if(this.activeCards.length === 0) return 0;
    return this.activeCards.at(-1).displayOrder;
  }
  addCard(card) {
    this.cards.push(card);
  }
  deleteList() {
    this.isDeleted = true;
  }
}