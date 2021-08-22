import React from 'react';
import './List.css';
import { ColumnItem, AddColumnForm } from '../../Column';
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
          id={column.id}
          title={column.title}
        />
      ))}
      <AddColumnForm />
    </div>
  );
};

export default ColumnsList;
