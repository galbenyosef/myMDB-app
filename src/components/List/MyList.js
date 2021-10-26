import React, {useRef, useEffect, useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import MyAnimatedBackground from '../../components/AnimatedBackground/MyAnimatedBackground';
import {useDispatch, useSelector} from 'react-redux';
import {scrollToTop} from '../../utilities/Utilities';
import {setPage, setScrollToTopFn} from '../../redux/actions/ListActions';
import MyListItem from './MyListItem';
import {StackActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {fetchMovies} from '../../redux/actions/SearchActions';
import {useHeaderHeight} from '@react-navigation/elements';
import {searchBarHeight} from '../SearchBar/MySearchBar';

const MyList = props => {
  const movies = useSelector(state => state.movies);
  const page = useSelector(state => state.page);
  const currentMoviesCount = useSelector(state => state.currentMoviesCount);
  const totalMoviesCount = useSelector(state => state.totalMoviesCount);
  const loading = useSelector(state => state.loading);
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    dispatch(setScrollToTopFn(() => scrollToTop(listRef)));
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchMovies(null, page));
    }
  }, [dispatch, page]);

  const onEndReached = () => {
    if (currentMoviesCount < totalMoviesCount && !loading) {
      dispatch(setPage(page + 1));
    }
  };

  const onItemPress = useCallback(
    imdbID => {
      navigation.dispatch(StackActions.push('Details', {imdbID}));
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews={true}
        style={styles.list}
        data={movies}
        keyExtractor={({imdbID}) => imdbID}
        renderItem={({item, index}) => (
          <MyListItem
            Title={item.Title}
            Poster={item.Poster}
            Year={item.Year}
            index={index}
            onItemPress={() => onItemPress(item.imdbID)}
          />
        )}
        keyboardShouldPersistTaps={'handled'}
        ref={listRef}
        onEndReached={onEndReached}
      />
      <MyAnimatedBackground
        active={!movies?.length}
        topOffset={headerHeight + searchBarHeight}
        bottomOffset={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  list: {
    width: '100%',
  },
});

export default MyList;
