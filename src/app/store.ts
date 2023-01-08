import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    orders: ordersSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
