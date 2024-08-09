import './App.css';
import NavBar from './Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { CartProvider } from './contexts/CartContext';
function App() {
  return (
    <CartProvider>
      <div >
        <NavBar />
      </div>
    </CartProvider>
  );
}

export default App;
