import { Suspense } from 'react';
import useAppRoutes from './useAppRoutes';

export default function App() {
  const routes = useAppRoutes();

  return (
    <div style={{padding: '20px'}}>
      <Suspense fallback={null}>{routes}</Suspense>
    </div>
  );
}
