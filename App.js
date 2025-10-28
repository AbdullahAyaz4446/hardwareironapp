import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/stacknavigatiopn';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { store } from './src/redux';
import { Provider } from 'react-redux';
import { SheetProvider } from 'react-native-actions-sheet';
const App = () => {
  return (
    <Provider store={store}>
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
