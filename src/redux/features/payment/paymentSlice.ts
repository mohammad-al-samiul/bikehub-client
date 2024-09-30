import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  paymentStatus: string;
}

const initialState: PaymentState = {
  paymentStatus: "Pending",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updatePaymentStatus: (state, action: PayloadAction<string>) => {
      state.paymentStatus = action.payload;
    },
    // Optionally reset the payment status to initial value
    resetPaymentStatus: (state) => {
      state.paymentStatus = initialState.paymentStatus;
    },
  },
});

export const { updatePaymentStatus, resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
