import { IState, ICard, IComment } from '../interfaces';

const loremipsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const number42 = 'The number 42 is the Answer to the Ultimate Question of Life, the Universe, and Everything.';

const comments: IComment[] = [
  {
    id: '0',
    cardId: '0',
    author: 'Alex',
    text: number42,
    date: 1629050229621,
    isEdited: false,
  }
];

const cards: ICard[] = [
  {
    id: '0',
    columnId: '0',
    author: 'Connor',
    title: 'First Task',
    descr: loremipsum ,
    comments: comments,
  }
];

const localStorageState: string | null = localStorage.getItem('state');

export const initalState: IState = localStorageState
  ? JSON.parse(localStorageState)
  : {
      '0': {
        title: 'TODO',
        cards: cards,
      },
      '1': {
        title: 'In Progress',
        cards: [],
      },
      '2': {
        title: 'Testing',
        cards: [],
      },
      '3': {
        title: 'Done',
        cards: [],
      },
    };
