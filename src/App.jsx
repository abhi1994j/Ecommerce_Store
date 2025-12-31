import { lazy, Suspense } from 'react';
import ErrorFallback from './libs/ErrorFallback';
import { Loader } from './libs/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import SignupModal from './components/SignupModal';

function App() {

  // Lazy-loaded components
  const Dashboard = lazy(() => import('./pages/Dashboard'));
  return (
    <>
      {/* <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Optionally reset state here or reload
          window.location.reload();
        }}
      >
        <Suspense fallback={<Loader />}>
          <Dashboard />
          <Toaster position="top-left" reverseOrder={true} />
        </Suspense>
      </ErrorBoundary> */}
      <Login/>
      {/* <SignupModal/> */}
    </>
  );
}

export default App;
