import React, { ReactElement, memo } from 'react';
import { ReducerAction, ReducerActionType } from '../context/CartProvider';
import { ProductType } from '../context/ProductProvider';

type PropTypes = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType;
  inCart: boolean;
};

const Product = ({product, dispatch, REDUCER_ACTION, inCart}:PropTypes): ReactElement => {

  //? the old way of inporting image dynamically 
  // const image: string = require(`../images/${product.sku}.jpg`)

  const img:string = new URL(`../images/${product.sku}.jpg`,
  import.meta.url).href;


  const onAddToCart = () => dispatch({ type: REDUCER_ACTION.ADD, payload: {...product, qty: 1 }});

  const itemInCart = inCart ? '→ Item in Cart: ✔️': null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p> {new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'} ).format(product.price)} {itemInCart}</p>
      <button onClick={onAddToCart}>Add To Cart</button>
    </article>
  );


  return content;
}

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropTypes,
  { product: nextProduct, inCart: nextInCart }: PropTypes
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart // because inCart is a boolean. no need to turn it into Array before compare.
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
