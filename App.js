import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/stacknavigatiopn';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { persistor, store } from './src/redux';
import { Provider } from 'react-redux';
import { SheetProvider } from 'react-native-actions-sheet';
import { StatusBar } from 'expo-status-bar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PersistGate } from 'redux-persist/integration/react';
import {
  category,
  categoryById,
  getProductDeatilesById,
  productById,
} from './src/apis/server';

const App = () => {
  // baseUrl.global = '';
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '231880254904-eqockiv0cslohtuopuq6qaon4oqh6ga9.apps.googleusercontent.com',
      webClientId:
        '231880254904-qv8nn82siarj5dr6sbaiftoglr79cbdd.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style='dark' />
        <SheetProvider>
          <SafeAreaProvider>
            <KeyboardProvider>
              <StackNavigation />
            </KeyboardProvider>
          </SafeAreaProvider>
        </SheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
