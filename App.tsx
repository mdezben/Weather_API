// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Clima from './app/screens/Clima'; // Asegúrate de que esta ruta sea correcta

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Clima" component={Clima} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;