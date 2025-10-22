import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/stacknavigatiopn';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const App = () => {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <StackNavigation />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;
