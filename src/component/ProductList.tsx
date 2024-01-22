import { ReactElement } from "react";
import useCart from "../Hooks/useCart";
import useProduct from "../Hooks/useProduct";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, REDUCER_ACTION, cart } = useCart();
  const { products } = useProduct();

  let pageContent: ReactElement | ReactElement[] = <p>Loding ... </p>;
console.log(products);
  if (products?.length) {
    pageContent = products?.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);
      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTION={REDUCER_ACTION}
          inCart={inCart}
        />
      );
    });
  }

  const content = (
    <main className="main main-product">
      {pageContent}
    </main>
  )


  return content;
};

export default ProductList;
