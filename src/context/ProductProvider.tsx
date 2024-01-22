import { ReactElement, createContext, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initProductState: ProductType[] = [
  {
    sku: "item0001",
    name: "widget",
    price: 0.9,
  },
  {
    sku: "item0002",
    name: "premium widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "deluxe widget",
    price: 45,
  },
];

//* we will use data from json server
// const initProductState: ProductType [] = [];

export type UseProductContextType = {
  products: ProductType[];
};

const initContextState: UseProductContextType = {
  products: [],
};

export const ProductContext =
  createContext<UseProductContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initProductState);

  useEffect(() => {
    // const fetchedProducts = async(): Promise<ProductType[]> => {
    //   const data = await fetch('http://localhost:3500/products').then((response) => response.json()).catch(err  => {
    //     if(err instanceof Error)
    //       console.log(err.message)
    // });
    // return data;
    // }

    fetchedProducts().then((products) => {
      console.log(products);
      setProducts(products);
    });
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {" "}
      {children}{" "}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
