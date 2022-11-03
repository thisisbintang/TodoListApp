import 'moment/locale/id'; 

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import axios from 'axios';

import RootStack from './src/navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

axios.defaults.baseURL = 'https://todo.api.devcode.gethired.id';
const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <SafeAreaProvider>
          <RootStack />
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <StatusBar style='auto' />
    </QueryClientProvider>
  );
}
