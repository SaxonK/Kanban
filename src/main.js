import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useBoardStore } from './stores/boardStore'
import { Board } from '@/modules/board';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const boardStore = useBoardStore();
const savedState = localStorage.getItem('boardState');

if (savedState) {
  const parsedBoards = JSON.parse(savedState);
  parsedBoards.forEach(board => {
    const restoredBoard = new Board(board);
    boardStore.$state.boards.push(restoredBoard);
  });
}