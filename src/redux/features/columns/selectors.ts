import { RootState } from '../../store';

export const getColumns = (state: RootState) => state.columns.items;