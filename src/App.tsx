import { useState } from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import ProductList from './component/ProductList';
import Cart from './component/Cart';

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart/> :  <ProductList/> ;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart}/>
    </>
  );
  return content;
}

export default App
