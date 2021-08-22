import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../../interfaces';

export interface ColumnsState {
  items: IColumn[];
}

interface EditTitlePaylaod {
  columnId: string;
  newTitle: string;
}

const initialState: ColumnsState = {
  items: [
    {
      id: '0',
      title: 'TODO',
    },
    {
      id: '1',
      title: 'In Progress',
    },
    {
      id: '2',
      title: 'Testing',
    },
    {
      id: '3',
      title: 'Done',
    },
  ]
}

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn: {
      reducer: (state, action: PayloadAction<IColumn>) => {
        const newColumn: IColumn = action.payload;
        state.items.push(newColumn);
      },
      prepare: (title: string) => {
        const id = Date.now().toString(16);
        return { payload: { id, title } }
      }
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      const columnId: string = action.payload;
      state.items = state.items.filter(column => {
        if (column.id === columnId) {
          return false;
        }
        return true;
      });
    },
    editTitle: (state, action: PayloadAction<EditTitlePaylaod>) => {
      const { columnId, newTitle } = action.payload;
      state.items.some(column => {
        if (column.id === columnId) {
          column.title = newTitle;
          return true;
        }
        return false;
      });
    },
  },
});

export const columnsActions = columnsSlice.actions;

export default columnsSlice.reducer;