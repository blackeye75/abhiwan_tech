import React from 'react';
import Header from './components/Header';
// import Home from './pages/Home';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <div>
      <Header title="Live Collaborative To-Do List" />
      <AppRoutes />
      {/* <Home /> */}
    </div>
  );
};

export default App;
