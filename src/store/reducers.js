import { combineReducers } from "redux";
import { reducer as appReducer } from "./appReducer";
import { reducer as todoListReducer } from "./todoListReducer";

const rootReducers = combineReducers({
  appReducer,
  todoListReducer,
});
export default rootReducers;
