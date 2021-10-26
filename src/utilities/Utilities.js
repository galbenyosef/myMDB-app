import {Dimensions, StatusBar, Platform, PixelRatio} from 'react-native';

import imdbLogo from '../assets/imdb_logo.png';

export const NO_IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';

export const windowHeight =
  Dimensions.get('window').height - StatusBar.currentHeight;

export const windowWidth = Dimensions.get('window').width;

export const scrollToTop = listRef =>
  listRef?.current?.scrollToOffset({animated: true, offset: 0});

const scale = windowWidth / 480;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const getLogo = () => imdbLogo;
