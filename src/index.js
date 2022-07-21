import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseProvider } from './setup/firebase';
import 'antd/dist/antd.min.css';

const App = lazy(() => import('./App'));

(async () => {
  
  ReactDOM.render(
    <FirebaseProvider>
      <Router>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Router>
    </FirebaseProvider>
    ,
    document.getElementById('root')
  );
})();
