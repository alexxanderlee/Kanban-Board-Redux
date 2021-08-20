import React, { useState } from 'react';
import './App.css';
import { Navbar, Column, Popup, CardPopup } from './components';
import { IState, ICard } from './interfaces';
import { initalState } from './data';
import { useAppSelector } from './redux/store';
import { userSelectors } from './redux/features/user';

const App: React.FC = () => {
  const username = useAppSelector(userSelectors.getUserName);

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
        {state && Object.entries(state).map(([key, { title, cards }]) => (
          <Column
            id={key}
            title={title}
            cards={cards}
            setState={setState}
            setShowCardPopup={setShowCardPopup}
            setCardPopupData={setCardData}
            key={key}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
