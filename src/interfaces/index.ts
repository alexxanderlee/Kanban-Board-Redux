export interface IColumn {
  id: string;
  title: string;
}

export interface ICard {
  id: string;
  columnId: string;
  author: string;
  title: string;
  descr: string | null;
}

export interface IComment {
  id: string;
  cardId: string;
  columnId: string;
  author: string;
  text: string;
  date: number;
  isEdited: boolean;
}