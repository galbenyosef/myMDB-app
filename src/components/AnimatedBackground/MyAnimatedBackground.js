import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Dimensions, StatusBar} from 'react-native';
import {getLogo, windowHeight, windowWidth} from '../../utilities/Utilities';

const StatusBarHeight = StatusBar.currentHeight;

const MyAnimatedBackground = ({
  active = 1,
  topOffset = 0,
  bottomOffset = 0,
}) => {
  const particles = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const play = (anim, toValue, duration) => {
    anim.setValue(0);
    return Animated.timing(anim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => play(anim, toValue, duration));
  };

  useEffect(() => {
    Animated.parallel([
      play(particles[0], -windowHeight - 80 + topOffset, 3500),
      play(particles[1], -windowHeight - 80 + topOffset, 2300),
      play(particles[2], windowHeight + 80 - topOffset, 4600),
      play(particles[3], windowWidth + (80 * 2127) / 1024, 4600),
      play(particles[4], -windowWidth - (80 * 2127) / 1024, 2800),
      play(particles[5], -windowWidth - (80 * 2127) / 1024, 3700),
      play(particles[6], windowWidth + (80 * 2127) / 1024, 1900),
    ]).start(({finished}) => {});
  }, []);

  if (!active) {
    return null;
  }
  return (
    <>
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.firstParticleUp,
          transform: [{translateY: particles[0]}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.secondParticleUp,
          transform: [{translateY: particles[1]}],
        }}
      />

      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.thirdParticleUp,
          transform: [{translateY: particles[2]}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.firstParticleSlide,
          transform: [{translateX: particles[3]}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.secondParticleSlide,
          transform: [{translateX: particles[4]}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.thirdParticleSlide,
          transform: [{translateX: particles[5]}],
        }}
      />
      <Animated.Image
        source={getLogo()}
        resizeMode={'contain'}
        style={{
          ...styles.lastParticleSlide,
          transform: [{translateX: particles[6]}],
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  firstParticleUp: {
    bottom: -80,
    left: 20,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  secondParticleUp: {
    bottom: -80,
    right: 20,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  thirdParticleUp: {
    top: -80,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  firstParticleSlide: {
    left: -(80 * 2127) / 1024,
    top: 80 * 1,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  secondParticleSlide: {
    right: -(80 * 2127) / 1024,
    top: 80 * 3,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  thirdParticleSlide: {
    right: -(80 * 2127) / 1024,
    bottom: 80 * 3,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
  lastParticleSlide: {
    bottom: 80,
    left: -(80 * 2127) / 1024,
    position: 'absolute',
    height: 80,
    width: (80 * 2127) / 1024,
    zIndex: -1,
    opacity: 0.3,
  },
});

export default MyAnimatedBackground;
