import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import {TokenUserReducer} from "./slice/UserSlice";
import {CategoryReducer} from "./slice/CategorySlice";
import {WorksReducer} from "./slice/WorksSlice";
const store = configureStore({
  reducer: {
      userInfo: TokenUserReducer,
      Category: CategoryReducer,
      Works: WorksReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

