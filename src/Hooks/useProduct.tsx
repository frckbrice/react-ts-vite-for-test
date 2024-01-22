import { useContext } from "react";
import { ProductContext } from "../context/ProductProvider";
import { UseProductContextType } from "../context/ProductProvider";

const useProduct = (): UseProductContextType => {
  return useContext(ProductContext);
};
// this is just for the sake of simplification
export default useProduct;
