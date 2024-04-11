import { generateUniqueId } from './idGenerator';

export class Board {
  constructor({id, title, description, background, lists, isFavourite, isDeleted}) {
    this.id = id;
    this.title = title || "";
    this.description = description || "";
    this.background = background || "var(--vt-c-white-mute)";
    this.lists = lists || [];
    this.isFavourite = isFavourite || false;
    this.isDeleted = isDeleted || false;
  }
  get activeLists() {
    return this.lists.filter(list => !list.isDeleted).sort((a, b) => a.displayOrder - b.displayOrder);
  }
  get minimumDisplayOrder() {
    return this.activeLists[0].displayOrder;
  }
  get maximumDisplayOrder() {
    return this.activeLists.at(-1).displayOrder;
  }
  addList(list) {
    this.lists.push(list);
  }
  toggleIsFavourite() {
    this.isFavourite = !this.isFavourite;
  }
  deleteBoard() {
    this.isDeleted = true;
  }
  restoreBoard() {
    this.isDeleted = false;
  }
}