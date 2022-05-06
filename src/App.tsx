import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layouts from './components/layouts';
import { DetailProducts, Products, Cart, About, Home } from './pages';
import APIProducts from './context/APIProducts'

function App() {
  return (
    <APIProducts>
    <BrowserRouter>
    <Layouts>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/*" element={<Products />} />
          <Route path="products/:productId" element={<DetailProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
      </Routes>
    </Layouts>
    </BrowserRouter>
    </APIProducts>
  );
}

export default App;
