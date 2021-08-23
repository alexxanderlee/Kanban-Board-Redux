import React from 'react';
import './App.css';
import { Navbar, ColumnsList, Popup, CardPopup } from './components';
import { useAppSelector } from './redux/store';
import { userSelectors } from './redux/features/user';
import { cardPopupSelectors } from './redux/features/cardPopup';

const App: React.FC = () => {
  const username = useAppSelector(userSelectors.getUserName);
  const showCardPopup = useAppSelector(cardPopupSelectors.isVisible);
  const cardId = useAppSelector(cardPopupSelectors.getCardId);

  return (
    <div className="App">
      {!username && <Popup />}

      {showCardPopup && <CardPopup cardId={cardId} />}

      <Navbar username={username} />
      <section className="content">
        <ColumnsList />
      </section>
    </div>
  );
}

export default App;
