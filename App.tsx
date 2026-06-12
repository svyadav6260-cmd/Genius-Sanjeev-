import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import DesignScreen from './src/screens/DesignScreen';
import PaperScreen from './src/screens/PaperScreen';
import GraphScreen from './src/screens/GraphScreen';
import GalleryScreen from './src/screens/GalleryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarActiveTintColor: '#4f8ef7',
              tabBarInactiveTintColor: '#64748b',
              tabBarStyle: {
                backgroundColor: '#111827',
                borderTopColor: 'rgba(255,255,255,0.08)',
                borderTopWidth: 1,
              },
              headerStyle: {
                backgroundColor: '#111827',
                borderBottomColor: 'rgba(255,255,255,0.08)',
                borderBottomWidth: 1,
              },
              headerTintColor: '#f1f5f9',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: '🏠 Genius Sanjeev',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>,
              }}
            />
            <Tab.Screen
              name="Design"
              component={DesignScreen}
              options={{
                title: '✏️ Design',
                tabBarLabel: 'Design',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>✏️</Text>,
              }}
            />
            <Tab.Screen
              name="Paper"
              component={PaperScreen}
              options={{
                title: '📄 Theory Paper',
                tabBarLabel: 'Paper',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📄</Text>,
              }}
            />
            <Tab.Screen
              name="Graph"
              component={GraphScreen}
              options={{
                title: '📊 Graph Paper',
                tabBarLabel: 'Graph',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text>,
              }}
            />
            <Tab.Screen
              name="Gallery"
              component={GalleryScreen}
              options={{
                title: '🖼️ Gallery',
                tabBarLabel: 'Gallery',
                tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🖼️</Text>,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

import { Text } from 'react-native';
