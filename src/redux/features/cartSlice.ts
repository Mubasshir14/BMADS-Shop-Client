/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "@/components/types/product";
import { addCoupon } from "@/components/services/Coupon";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  email: string;
  productId: string;
  name: string;
  coupon: {
    code: string;
    discountAmount: number;
    isLoading: boolean;
    error: string;
  };
}

const initialState: InitialState = {
  products: [],
  email: "",
  productId: "",
  name: "",
  coupon: {
    code: "",
    discountAmount: 0,
    isLoading: false,
    error: "",
  },
};

export const fetchCoupon = createAsyncThunk(
  "cart/fetchCoupon",
  async ({
    couponCode,
    subTotal,
  }: {
    couponCode: string;
    subTotal: number;
  }) => {
    try {
      const res = await addCoupon(couponCode, subTotal);
      if (!res.success) {
        throw new Error(res.message);
      }

      return res;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products.length === 0) {
        state.productId = action.payload._id;
      }

      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({
        ...action.payload,
        name: action.payload.name,
        orderQuantity: 1,
      });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.pending, (state) => {
      state.coupon.isLoading = true;
      state.coupon.error = "";
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = action.error.message as string;
      state.coupon.code = "";
      state.coupon.discountAmount = 0;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = "";
      state.coupon.code = action.payload.data.coupon.code;
      state.coupon.discountAmount = action.payload.data.discountAmount;
    });
  },
});

// product
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      name: product.name,
      quantity: product.orderQuantity,
    })),
  };
};

export const productSelector = (state: RootState) => {
  return state.cart.productId;
};

//Payment
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const discountAmount = discountAmountSelector(state);
  return subTotal - discountAmount;
};

export const couponSelector = (state: RootState) => {
  return state.cart.coupon;
};

export const discountAmountSelector = (state: RootState) => {
  return state.cart.coupon.discountAmount;
};

//*Email
export const emailSelector = (state: RootState) => {
  return state.cart.email;
};

// const selectName = (state: RootState) => state.cart.name || "";

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateEmail,

  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
