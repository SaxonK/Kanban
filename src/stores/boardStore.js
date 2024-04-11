import { defineStore } from 'pinia';
import { generateUniqueId } from '@/modules/idGenerator';
import { Board } from '@/modules/board';
import { List } from '@/modules/list';
import { Card } from '@/modules/card';

export const useBoardStore = defineStore('board', {
  state: () => ({
    boards: []
  }),

  getters: {
    activeBoards: (state) => {
      return state.boards.filter(board => !board.isDeleted);
    },
    getBoardById: (state) => (id) => {
      return state.boards.find(board => board.id === id);
    }
  },
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('boardState', JSON.stringify(this.$state.boards));
    },
    createBoard({name, description, background, lists, isFavourite, isDeleted}) {
      const newBoard = new Board({
        id: generateUniqueId('board'),
        title: name,
        description: description,
        background: background,
        lists: lists, 
        isFavourite: isFavourite, 
        isDeleted: isDeleted
      });

      this.boards.push(newBoard);
      this.saveToLocalStorage();
      return newBoard;
    },
    addListToBoard(boardId, title) {
      const board = this.boards.find(board => board.id === boardId);
      const displayOrder = board.lists.length + 1;

      if (board) {
        const newList = new List({
          id: generateUniqueId('list'),
          boardId, boardId, 
          title: title,
          displayOrder: displayOrder
        });
        board.addList(newList);
        this.saveToLocalStorage();
        return newList;
      } else {
        // Handle the case where the board with the given ID is not found
        console.error('Board not found.');
        return null;
      }
    },
    addCardToList(boardId, listId, cardTitle) {
      const board = this.boards.find(board => board.id === boardId);

      if (board) {
        const list = board.lists.find(list => list.id === listId);
        const displayOrder = list.activeCards.length + 1;

        if (list) {
          const newCard = new Card({
            id: generateUniqueId('card'), 
            listId: listId, 
            title: cardTitle,
            displayOrder: displayOrder
          });
          newCard.addActivity('add', ['this card', list.title]);
          list.addCard(newCard);
          this.saveToLocalStorage();
          return newCard;
        } else {
          console.error('List not found.');
          return null;
        }
      } else {
        console.error('Board not found.');
        return null;
      }
    },
    onCreated() {
      const savedState = localStorage.getItem('boardState');
      if (savedState) {
        this.$state.boards = JSON.parse(savedState);
      }
    }
  }
});