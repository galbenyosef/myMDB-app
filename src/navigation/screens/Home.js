import React, {useRef, useEffect, useCallback} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import MySearchBar from '../../components/SearchBar/MySearchBar';
import MyList from '../../components/List/MyList';

const Home = (props) => {
  const screenRotateAnim = useRef(new Animated.Value(0)).current;
  const screenScaleAnim = useRef(new Animated.Value(0)).current;
  /*
  console.log('Home Rendered');
*/

  useEffect(() => {
    Animated.parallel([
      Animated.timing(screenRotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(screenScaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [screenRotateAnim, screenScaleAnim]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {scale: screenScaleAnim},
          {
            rotate: screenRotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['360deg', '0deg'],
            }),
          },
        ],
      }}>
      <MySearchBar />
      <MyList />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
