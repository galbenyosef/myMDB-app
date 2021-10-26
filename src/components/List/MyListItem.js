import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NO_IMAGE_URL, normalize, windowHeight} from '../../utilities/Utilities';
import FastImage from 'react-native-fast-image';
import {useHeaderHeight} from '@react-navigation/elements';
import {searchBarHeight} from '../SearchBar/MySearchBar';

const MyListItem = React.memo(
  ({Title, Poster, Year, index, onItemPress}) => {
    /*
    console.log('ListItem ' + index + ' ' + Title + ' rendered');
*/
    const headerHeight = useHeaderHeight();

    return (
      <TouchableOpacity
        onPress={onItemPress}
        style={{
          ...styles.container,
          height: (windowHeight - headerHeight - searchBarHeight) / 3.5,
          backgroundColor: index % 2 ? 'black' : 'grey',
        }}>
        <FastImage
          resizeMode={FastImage.resizeMode.stretch}
          source={{uri: Poster !== 'N/A' ? Poster : NO_IMAGE_URL}}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={{...styles.title, color: index % 2 ? 'white' : 'black'}}>
            {Title}
          </Text>
          <Text style={{...styles.year, color: index % 2 ? 'white' : 'black'}}>
            {Year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.Year === nextProps.Year &&
      prevProps.Poster === nextProps.Poster &&
      prevProps.index === nextProps.index &&
      prevProps.Title === nextProps.Title
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: normalize(20),
  },
  contentContainer: {width: '60%'},
  image: {width: '33%'},
  title: {fontSize: normalize(26), fontWeight: 'bold'},
  year: {
    fontSize: normalize(22),
  },
});

export default MyListItem;
