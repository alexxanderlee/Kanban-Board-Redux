import React from 'react';
import './App.css';
import { Navbar, ColumnsList, AuthModal } from './components';
import { useAppSelector } from './redux/store';
import { userSelectors } from './redux/features/user';

const App: React.FC = () => {
  const username = useAppSelector(userSelectors.getUserName);

  return (
    <div className="App">
      {!username && <AuthModal />}

      <Navbar username={username} />
      <section className="content">
        <ColumnsList />
      </section>
    </div>
  );
}

export default App;
