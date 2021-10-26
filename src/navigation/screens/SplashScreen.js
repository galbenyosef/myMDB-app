import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Text, Easing} from 'react-native';
import {StackActions} from '@react-navigation/native';
import MyAnimatedBackground from '../../components/AnimatedBackground/MyAnimatedBackground';

import {normalize, windowHeight, windowWidth} from '../../utilities/Utilities';

const animLength = 2000;

const SplashScreen = ({navigation}) => {
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const authorScaleAnim = useRef(new Animated.Value(0)).current;

  const screenRotateAnim = useRef(new Animated.Value(0)).current;
  const screenScaleAnim = useRef(new Animated.Value(1)).current;

  const play = (anim, toValue, duration) =>
    Animated.timing(anim, {
      toValue,
      duration,
      easing: Easing.in(Easing.bounce),
      useNativeDriver: true,
    });

  const playScreenSwitch = () =>
    Animated.parallel([
      Animated.timing(screenRotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(screenScaleAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => navigation.dispatch(StackActions.replace('Home')));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        play(logoOpacityAnim, 1, animLength),
        play(logoScaleAnim, 1, animLength),
      ]),
      play(authorScaleAnim, 1, animLength),
    ]).start(({finished}) => playScreenSwitch());
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {scale: screenScaleAnim},
          {
            rotate: screenRotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}>
      <MyAnimatedBackground />
      <Animated.View
        style={{
          ...styles.logoContainer,
          opacity: logoOpacityAnim,
          transform: [{scale: logoOpacityAnim}],
        }}>
        <Text style={styles.logoText}>MyMDB</Text>
      </Animated.View>

      <Animated.Text
        style={{
          ...styles.scalingAuthorName,
          transform: [{scale: authorScaleAnim}],
        }}>
        By Gal Ben yosef
      </Animated.Text>
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
  logoContainer: {
    width: 5 * normalize(72),
    borderRadius: normalize(20),
    backgroundColor: 'rgb(230, 185, 30)',
    height: normalize(120),
    borderWidth: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {fontSize: normalize(34)},
  scalingAuthorName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: normalize(32),
    height: normalize(100),
    zIndex: 1,
  },
  transparent: {color: 'rgba(0,0,0,0)'},
});

export default SplashScreen;
