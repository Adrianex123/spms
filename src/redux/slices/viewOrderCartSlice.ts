import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  productsCart: [],
  partsCart: [],
};

const viewOrderCart = createSlice({
  name: "viewOrderCart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<any>) => {
      state.productsCart.push(action.payload);
    },
    addPartToCart: (state, action: PayloadAction<any>) => {
      state.partsCart.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<any>) => {
      state.productsCart = state.productsCart.filter(
        (product: any) => product.product_id !== action.payload
      );
    },
    removePartFromCart: (state, action: PayloadAction<any>) => {
      state.partsCart = state.partsCart.filter(
        (part: any) => part.part_id !== action.payload
      );
    },

    incrementProductQuantity: (state, action: PayloadAction<any>) => {
      state.productsCart = state.productsCart.map((product: any) => {
        if (product.product_id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    },
    decrementProductQuantity: (state, action: PayloadAction<any>) => {
      state.productsCart = state.productsCart
        .map((product: any) => {
          if (product.product_id === action.payload) {
            if (product.quantity === 1) {
              return null; // Remove the product from cart
            } else {
              return { ...product, quantity: product.quantity - 1 };
            }
          }
          return product;
        })
        .filter((product: any) => product !== null);
    },
    incrementPartQuantity: (state, action: PayloadAction<any>) => {
      state.partsCart = state.partsCart.map((part: any) => {
        if (part.part_id === action.payload) {
          return { ...part, quantity: part.quantity + 1 };
        }
        return part;
      });
    },
    decrementPartQuantity: (state, action: PayloadAction<any>) => {
      state.partsCart = state.partsCart
        .map((part: any) => {
          if (part.part_id === action.payload) {
            if (part.quantity === 1) {
              return null; // Remove the part from cart
            } else {
              return { ...part, quantity: part.quantity - 1 };
            }
          }
          return part;
        })
        .filter((part: any) => part !== null);
    },
    resetOrderCart: (state) => {
      state.productsCart = [];
      state.partsCart = [];
      state.productsTotalPrice = 0;
      state.partsTotalPrice = 0;
    },
  },
});

export const {
  addProductToCart,
  addPartToCart,
  removePartFromCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  incrementPartQuantity,
  decrementPartQuantity,
  resetOrderCart,
} = viewOrderCart.actions;
export default viewOrderCart.reducer;
