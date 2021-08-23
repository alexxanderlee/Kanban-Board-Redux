import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IColumn } from '../../../interfaces';

export const getColumns = (state: RootState) => state.columns.items;

const getId = (_: RootState, id: string) => id;

export const getColumnById = createSelector(
  getColumns,
  getId,
  (columns, id) => columns.find((column: IColumn) => (column.id === id))
);