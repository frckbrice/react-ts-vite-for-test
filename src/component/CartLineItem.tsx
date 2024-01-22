import React, { ChangeEvent, ReactElement, memo } from 'react';
import { CartItemType, ReducerAction, ReducerActionType } from '../context/CartProvider';

type PropTypes = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType
};

//eslint-disable next line
const CartLineItem = ({item, dispatch, REDUCER_ACTION}: PropTypes) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;
const newQty = item.qty;
  const lineTotal: number = newQty * item.price;

  console.log('lineTotal', newQty);
  console.log("lineTotal");

  console.log({sku: item.sku, qty: item.qty, price: item.price})

  const highesQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highesQty).keys()].map((i) => i + 1);
  console.log("optionValues");

  const options: ReactElement[] = optionValues.map((value) => {
    return (
      <option value={value} key={`opt${value}`}>
        {value}{" "}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(Number(e.target.value));
    dispatch({
      type: REDUCER_ACTION.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTION.REMOVE,
      payload: item,
    });
  };
  /**/
  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name} </div>
      {/* aria-label is for assistive equipment to have more informaton on what the tag is for */}
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}{" "}
      </div>
      <label htmlFor="itemQty" >
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        defaultValue={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}{" "}
      </select>
      <div className="cart_item-subtotal" aria-label="Line Item subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item from Cart"
        onClick={onRemoveFromCart}
      >
        {" "}
        ❌
      </button>
    </li>
  );

  return content;
}

function areItemEqual({item:prevItem, item: nextItem}: PropTypes) {
  return Object.keys(prevItem).every(key =>{
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  });
}


const memoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemEqual
);

export default memoizedCartLineItem;

