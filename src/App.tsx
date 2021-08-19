import React, { useState } from 'react';
import './App.css';
import { Navbar, Column, Popup, CardPopup } from './components';
import { IState, ICard } from './interfaces';
import { initalState } from './data';

const App: React.FC = () => {
  const [state, setState] = useState<IState>(initalState);
  const [username, setUsername] = useState<string>('');
  const [cardData, setCardData] = useState<ICard | null>(null);
  const [showCardPopup, setShowCardPopup] = useState<boolean>(false);

  return (
    <div className="App">
      <Popup setUsername={setUsername} />
      {showCardPopup && cardData && (
        <CardPopup 
          data={cardData}
          username={username}
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
            username={username}
            key={key}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
