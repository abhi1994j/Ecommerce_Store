import { lazy, Suspense } from 'react';
import ErrorFallback from './libs/ErrorFallback';
import { Loader } from './libs/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';

function App() {
  // Lazy-loaded components
  const Dashboard = lazy(() => import('./pages/Dashboard'));
  const OrdersPage = lazy(() => import('./pages/OrderPage'));

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Optionally reset state here or reload
          window.location.reload();
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* <Dashboard /> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
          <Toaster position="top-left" reverseOrder={true} />
        </Suspense>
      </ErrorBoundary>
      {/* <LoginModal/> */}
      {/* <SignupModal/> */}
    </>
  );
}

export default App;
