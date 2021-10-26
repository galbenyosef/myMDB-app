import {Icon} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const MyBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon style={styles.icon} size={70} name="arrow-left" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    height: 70,
  },
});

export default MyBackButton;
