import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import productManageReducer from './slices/productManageSlice';
import orderReducer from './slices/orderSlice';

const adminAuthPersistConfig = {
  key: 'adminAuth',
  storage,
  whitelist: ['isAuthenticated', 'admin']
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    adminAuth: persistReducer(adminAuthPersistConfig, adminAuthReducer),
    productManage: productManageReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store);
export default store;
