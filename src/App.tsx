import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import './App.css';

import routes from './router/router';
import Loading from './components/Loading/Loading';


function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <Suspense
        fallback={<Loading />}>
        {routing}
      </Suspense>
    </>
  );
}

export default App;
