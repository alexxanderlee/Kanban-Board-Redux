export interface IState {
  [id: string]: IColumn;
}

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
  comments: IComment[];
}

export interface IComment {
  id: string;
  cardId: string;
  author: string;
  text: string;
  date: number;
  isEdited: boolean;
}