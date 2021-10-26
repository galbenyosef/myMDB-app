import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MyStackNavigator from './navigation/MyStackNavigator';
import MyDialogModal from './components/AlertModal/MyDialogModal';

const MyAppContainer = () => {
  return (
    <SafeAreaView style={styles.navigatorContainer}>
      <MyDialogModal />
      <MyStackNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MyAppContainer;
