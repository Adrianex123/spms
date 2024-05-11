import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  productsData: [],
  partsData: [],
};

const orderCartOptions = createSlice({
  name: "orderOptions",
  initialState: initialState,
  reducers: {
    setProductsData: (state, action: PayloadAction<any>) => {
      const productsStock = action.payload.productsData;
      const productsCart = action.payload.productsCart;
      // Update each stock_quantity of productsData on from productsCart

      const updatedProductsStock = productsStock
        ? productsStock.map((stockProduct: any) => {
            const cartProduct = productsCart.find(
              (product: any) => product.product_id === stockProduct.id
            );
            if (cartProduct) {
              return {
                ...stockProduct,
                stock_quantity:
                  stockProduct.stock_quantity - cartProduct.quantity,
              };
            }
            return stockProduct;
          })
        : [];

      state.productsData = updatedProductsStock;
    },
    setPartsData: (state, action: PayloadAction<any>) => {
      const partsStock = action.payload.partsData;
      const partsCart = action.payload.partsCart;

      const updatedPartsStock = partsStock
        ? partsStock.map((stockPart: any) => {
            const cartPart = partsCart.find(
              (part: any) => part.part_id === stockPart.id
            );
            if (cartPart) {
              return {
                ...stockPart,
                stock_quantity: stockPart.stock_quantity - cartPart.quantity,
              };
            }
            return stockPart;
          })
        : [];

      state.partsData = updatedPartsStock;
    },
    reset(state) {
      state.productsData = [];
      state.partsData = [];
    },
  },
});

export const { setProductsData, setPartsData } = orderCartOptions.actions;
export default orderCartOptions.reducer;
