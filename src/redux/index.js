import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
} from 'redux-persist';
import userReducer from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const migrations = {
  0: (state) => ({
    ...state,
  }),
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  timeout: 0,
  migrate: createMigrate(migrations, { debug: __DEV__ }),
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
