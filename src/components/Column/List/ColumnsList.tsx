import React from 'react';
import './ColumnsList.css';
import { ColumnItem, ColumnForm } from '../../Column';
import { useAppSelector } from '../../../redux/store';
import { columnsSelectors } from '../../../redux/features/columns';
import { IColumn } from '../../../interfaces';

const ColumnsList: React.FunctionComponent = () => {
  const columns: IColumn[] = useAppSelector(columnsSelectors.getColumns);

  return (
    <div className="columns-list">
      {columns.map(column => (
        <ColumnItem
          key={column.id}
          column={column}
        />
      ))}
      <ColumnForm />
    </div>
  );
};

export default ColumnsList;
