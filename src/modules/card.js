import { activities } from './activities';
import { generateUniqueId } from './idGenerator';

class Activity {
  constructor({id, cardId, type, datetime, details}) {
    this.id = id;
    this.cardId = cardId;
    this.type = type;
    this.datetime = datetime;
    this.details = details || '';
  }
}
class Checklist {
  constructor({id, cardId, title}) {
    this.id = id;
    this.cardId = cardId;
    this.title = title || '';
    this.items = [];
    this.isDeleted = false;
  }
}
class ChecklistItem {
  constructor({id, checklistId, title, dueDate}) {
    this.id = id;
    this.checklistId = checklistId;
    this.title = title || '';
    this.dueDate = dueDate || null;
    this.completed = false;
    this.isDeleted = false;
  }
}
export class Card {
  constructor({id, listId, title, description, activities, extras = { checklists: [] }, displayOrder, isDeleted}) {
    this.id = id;
    this.listId = listId;
    this.title = title || '';
    this.description = description || '';
    this.activities = activities || [];
    this.extras = {
      checklists: extras.checklists || [],
    };
    this.displayOrder = displayOrder;
    this.isDeleted = isDeleted || false;
    this.test = '';
  }
  get activitiesDescending() {
    return [...this.activities].reverse();
  }
  get activeChecklists() {
    return this.extras.checklists.filter(checklist => !checklist.isDeleted);
  }
  addActivity(type, details) {
    if(activities.isTypeIncluded(type)) {
      const activity = new Activity({
        id: generateUniqueId('activity'),
        cardId: this.id,
        type: type,
        datetime: Date.now(),
        details: details
      });
  
      this.activities.push(activity);
    } else {
      console.error(`'${type}' is not a valid activity type.`);
    }
  }
  addChecklist(title) {
    if(title !== '') {
      const checklist = new Checklist({
        id: generateUniqueId('checklist'),
        cardId: this.id,
        title: title
      });
  
      this.extras.checklists.push(checklist);
    } else {
      console.error(`You must enter a title for a checklist.`);
    }
  }
  addChecklistItem(checklistId, title, dueDate) {
    if(title !== '') {
      const checklist = this.extras.checklists.find(checklist => checklist.id === checklistId);
      const checklistItem = new ChecklistItem({
        id: generateUniqueId('checklistItem'),
        checklistId: checklistId,
        title: title,
        dueDate: dueDate
      });
  
      checklist.items.push(checklistItem);
    } else {
      console.error(`You must enter a title for a checklist item.`);
    }
  }
  deleteCard() {
    this.isDeleted = true;
    this.displayOrder = 999;
  }
  updateValue(property, value) {
    if (this.hasOwnProperty(property)) {
      this[property] = value;
    } else {
      console.error(`Property '${property}' does not exist in Card object.`);
    }
  }
}