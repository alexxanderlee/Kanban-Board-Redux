import React, { useState } from 'react';
import './App.css';
import { Navbar, Column, Popup, CardPopup } from './components';
import { IState, ICard } from './interfaces';
import { initalState } from './data';
import { useAppDispatch, useAppSelector } from './redux/store';
import { userSelectors } from './redux/features/user';
import { columnsSelectors } from './redux/features/columns';

const App: React.FC = () => {
  const username = useAppSelector(userSelectors.getUserName);
  const columns = useAppSelector(columnsSelectors.getColumns);

  const [state, setState] = useState<IState>(initalState);
  const [cardData, setCardData] = useState<ICard | null>(null);
  const [showCardPopup, setShowCardPopup] = useState<boolean>(false);

  return (
    <div className="App">
      {!username && <Popup />}
      {showCardPopup && cardData && username && (
        <CardPopup 
          data={cardData}
          columnTitle={state[cardData.columnId].title}
          setShowCardPopup={setShowCardPopup}
          setState={setState}
        />
      )}
      <Navbar username={username} />
      <section className="content">
        {columns.map(column => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
