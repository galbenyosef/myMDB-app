import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Details from './screens/Details';
import SplashScreen from './screens/SplashScreen';
import MyBackButton from '../components/BackButton/BackButton';
import {normalize} from '../utilities/Utilities';

const Stack = createStackNavigator();

const MyStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="SplashScreen">
        <Stack.Screen
          options={splashScreenOptions}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={detailsScreenOptions}
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: 'gold',
    elevation: 0,
    height: normalize(60),
  },
  safeAreaInsets: {top: 0, bottom: 0},
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: normalize(30),
    color: 'black',
  },
  headerTitleAlign: 'center',
};

const splashScreenOptions = {
  headerShown: false,
};

const detailsScreenOptions = () => ({
  headerLeft: () => <MyBackButton />,
});

export default MyStackNavigator;
