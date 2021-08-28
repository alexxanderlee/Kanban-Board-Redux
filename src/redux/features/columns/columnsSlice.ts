import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../../interfaces';

export interface ColumnsState {
  items: IColumn[];
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
        state.items.push(action.payload);
      },
      prepare: (title: string) => {
        const id = Date.now().toString(16);
        return { payload: { id, title } }
      }
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(column => column.id !== action.payload);
    },
    updateColumn: (state, action: PayloadAction<IColumn>) => {
      state.items = state.items.map(column => (column.id === action.payload.id) ? action.payload : column);
    },
  },
});

export const columnsActions = columnsSlice.actions;

export default columnsSlice.reducer;