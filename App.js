import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/stacknavigatiopn';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { store } from './src/redux';
import { Provider } from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <StackNavigation />
        </KeyboardProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
