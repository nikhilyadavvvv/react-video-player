import { combineReducers } from "redux";
import homeSlice from "../pages/Home/homeSlice";

const appReducer = combineReducers({
    home: homeSlice
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
