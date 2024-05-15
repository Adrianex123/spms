import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  requestsCart: [],
  stocksCart: [],
  vehiclesCart: [],
};

const requestCart = createSlice({
  name: "requestCart",
  initialState: initialState,
  reducers: {
    addFoodSupplyToCart: (state, action: PayloadAction<any>) => {
      state.requestsCart.push(action.payload);
    },
    addSupplyToCart: (state, action: PayloadAction<any>) => {
      state.stocksCart.push(action.payload);
    },
    addVehicleToCart: (state, action: PayloadAction<any>) => {
      state.vehiclesCart.push(action.payload);
    },

    removeFoodSupplyFromCart: (state, action: PayloadAction<any>) => {
      state.requestsCart = state.requestsCart.filter(
        (requestProducts: any) =>
          requestProducts.requestProducts_id !== action.payload
      );
    },
    removeEquipmentFromCart: (state, action: PayloadAction<any>) => {
      state.stocksCart = state.stocksCart.filter(
        (equipment: any) => equipment.stocks !== action.payload
      );
    },
    removeVehicleFromCart: (state, action: PayloadAction<any>) => {
      state.vehiclesCart = state.vehiclesCart.filter(
        (vehicle: any) => vehicle.vehicle_id !== action.payload
      );
    },

    incrementFoodSupplyQuantity: (state, action: PayloadAction<any>) => {
      state.requestsCart = state.requestsCart.map((requestProducts: any) => {
        if (requestProducts.requestProducts_id === action.payload) {
          return { ...requestProducts, quantity: requestProducts.quantity + 1 };
        }
        return requestProducts;
      });
    },
    decrementFoodSupplyQuantity: (state, action: PayloadAction<any>) => {
      state.requestsCart = state.requestsCart
        .map((requestProducts: any) => {
          if (requestProducts.requestProducts_id === action.payload) {
            if (requestProducts.quantity === 1) {
              return null; // Remove the product from cart
            } else {
              return {
                ...requestProducts,
                quantity: requestProducts.quantity - 1,
              };
            }
          }
          return requestProducts;
        })
        .filter((requestProducts: any) => requestProducts !== null);
    },
    incrementEquipmentQuantity: (state, action: PayloadAction<any>) => {
      state.stocksCart = state.stocksCart.map((equipment: any) => {
        if (equipment.stocks === action.payload) {
          return { ...equipment, quantity: equipment.quantity + 1 };
        }
        return equipment;
      });
    },
    decrementEquipmentQuantity: (state, action: PayloadAction<any>) => {
      state.stocksCart = state.stocksCart
        .map((equipment: any) => {
          if (equipment.stocks === action.payload) {
            if (equipment.quantity === 1) {
              return null; // Remove the part from cart
            } else {
              return { ...equipment, quantity: equipment.quantity - 1 };
            }
          }
          return equipment;
        })
        .filter((equipment: any) => equipment !== null);
    },
    incrementVehicleQuantity: (state, action: PayloadAction<any>) => {
      state.vehiclesCart = state.vehiclesCart.map((vehicle: any) => {
        if (vehicle.vehicle_id === action.payload) {
          return { ...vehicle, quantity: vehicle.quantity + 1 };
        }
        return vehicle;
      });
    },
    decrementVehicleQuantity: (state, action: PayloadAction<any>) => {
      state.vehiclesCart = state.vehiclesCart
        .map((vehicle: any) => {
          if (vehicle.vehicle_id === action.payload) {
            if (vehicle.quantity === 1) {
              return null; // Remove the part from cart
            } else {
              return { ...vehicle, quantity: vehicle.quantity - 1 };
            }
          }
          return vehicle;
        })
        .filter((vehicle: any) => vehicle !== null);
    },
    resetCart: (state) => {
      state.requestsCart = [];
      state.stocksCart = [];
      state.vehiclesCart = [];
      state.foodsuppliesTotalPrice = 0;
      state.equipmentsTotalPrice = 0;
      state.vehiclesTotalPrice = 0;
    },
  },
});

export const {
  addFoodSupplyToCart,
  addSupplyToCart,
  addVehicleToCart,
  removeEquipmentFromCart,
  removeFoodSupplyFromCart,
  removeVehicleFromCart,
  incrementFoodSupplyQuantity,
  decrementFoodSupplyQuantity,
  incrementEquipmentQuantity,
  decrementEquipmentQuantity,
  incrementVehicleQuantity,
  decrementVehicleQuantity,
  resetCart,
} = requestCart.actions;
export default requestCart.reducer;
