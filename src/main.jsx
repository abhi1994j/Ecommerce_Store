import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/cartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { OrderProvider } from './context/OrderContext'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  </BrowserRouter>
);
