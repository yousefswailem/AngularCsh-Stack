import { Color } from "../Color/color.model";
import { Store } from "../stores/store.model";
import { ColorProduct } from "./color-product.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  storeId: number;   
  storeName?: string; 
  store?: Store;
  colorIds?:number[];
  colorProducts: ColorProduct[];
}
