import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IColumn } from '../../../interfaces';

export const getColumns = (state: RootState) => state.columns.items;

export const getColumnById = createSelector(
  (state: RootState, columnId: string) => ({ 
    columns: getColumns(state),
    columnId
  }),
  ({ columns, columnId }) => columns.find((column: IColumn) => (column.id === columnId))
);