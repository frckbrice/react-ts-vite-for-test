import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = {
  cart: CartItemType[];
};

//* we need CartStateType to json format
const inititCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD:
      {
        if (!action.payload) {
          throw new Error("Action.payload is missing in ADD action");
        }
        const { sku, name, price } = action.payload;

        const filteredCart: CartItemType[] = state.cart.filter(
          (item) => item.sku !== sku
        );

        const itemExists: CartItemType | undefined = state.cart.find(
          (item) => item.sku === sku
        );

        const qty: number = itemExists ? itemExists.qty + 1 : 1;

        const newItem: CartItemType = { sku, name, price, qty };
        return { ...state, cart: [...filteredCart, newItem] };
      }
      break;
    case REDUCER_ACTION_TYPE.REMOVE:
      {
        if (!action.payload) {
          throw new Error("Action.payload is missing in REMOVE action");
        }
        const { sku } = action.payload;

        const filteredCart: CartItemType[] = state.cart.filter(
          (item) => item.sku !== sku
        );

        return { ...state, cart: [...filteredCart] };
      }
      break;
    case REDUCER_ACTION_TYPE.QUANTITY:
      {
        if (!action.payload) {
          throw new Error("action.payload missing in QUANTITY action");
        }

        const { sku, qty } = action.payload;

        console.log(sku, qty);
        const itemExists: CartItemType | undefined = state.cart.find(
          (item) => item.sku === sku
        );

        if (!itemExists) {
          throw new Error("Item must exist in order to update quantity");
        }

        const updatedItem: CartItemType = { ...itemExists, qty };

        const filteredCart: CartItemType[] = state.cart.filter(
          (item) => item.sku !== sku
        );

        console.log([...filteredCart, updatedItem]);
        return { ...state, cart: [...filteredCart, updatedItem] };
      }
      break;
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unknown action type");
  }
};

const useCartContext = (inititCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, inititCartState);

  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce(
    (previousValue, cartItem) => previousValue + cartItem.qty,
    0
  );

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  //? sort the cart
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    // return itemA < itemB ? -1 : 1;
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(inititCartState)}>
      {" "}
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
