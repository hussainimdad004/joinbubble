import {
    combineReducers
} from 'redux';
import { USER_LOGOUT } from "../actions/types"
import UserDataReducer from './ReducerUserData';
import SelecTab from './ReducerSelectedTab';
const combinedReducer = combineReducers({
    user_data: UserDataReducer,
    select_tab: SelecTab
});
const rootReducer = (state, action) => {
    // if(action.type == USER_LOGOUT){
    //     delete state.user_data, 
    //     delete state.select_tab
    // }
    return combinedReducer(state, action);
}
export default rootReducer;