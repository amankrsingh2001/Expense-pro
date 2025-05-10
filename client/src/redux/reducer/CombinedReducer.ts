import { combineReducers } from 'redux';

import  userReducer  from '../slice/userSlice';
import  assetReducer  from '../slice/assetSlice';





export const rootReducer = combineReducers({
    user:userReducer,
    asset:assetReducer
})


