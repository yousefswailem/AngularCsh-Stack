import { Color } from "../Color/color.model";
import { Store } from "../stores/store.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  colorId: number;
  colorIds: number[];
  storeId: number;
  storeName?: string;
  colorName?: string;
  store: Store;
  color: Color;
  // orderDetails: OrderDetail[]; 
}
