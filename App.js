import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/stacknavigatiopn';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { store } from './src/redux';
import { Provider } from 'react-redux';
import { SheetProvider } from 'react-native-actions-sheet';
import { StatusBar } from 'expo-status-bar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '231880254904-qv8nn82siarj5dr6sbaiftoglr79cbdd.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style='dark' />
      <SheetProvider>
        <SafeAreaProvider>
          <KeyboardProvider>
            <StackNavigation />
          </KeyboardProvider>
        </SafeAreaProvider>
      </SheetProvider>
    </Provider>
  );
};

export default App;
