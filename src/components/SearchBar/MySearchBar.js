import React, {useEffect, useRef} from 'react';
import {SearchBar} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../redux/actions/SearchActions';
import {onClear, onSearchChange} from '../../redux/actions/SearchActions';
import {normalize} from '../../utilities/Utilities';
import {listRef} from '../List/MyList';

const iconSize = normalize(50);
export const searchBarHeight = 70;

const MySearchBar = () => {
  const mySearchBarRef = useRef(null);
  const query = useSelector(state => state.query);
  const loading = useSelector(state => state.loading);
  const alertMessage = useSelector(state => state.alertMessage);
  const scrollToTop = useSelector(state => state.scrollToTop);
  const dispatch = useDispatch();

  const ClearIcon = () => (
    <TouchableOpacity
      style={styles.searchBarIcons}
      onPress={() => {
        if (!loading) {
          dispatch(onClear());
          mySearchBarRef?.current.clear();
        }
      }}>
      <Icon name="cancel" color={'red'} size={iconSize} />
    </TouchableOpacity>
  );

  const SearchIcon = () => {
    if (loading) {
      return <ActivityIndicator size={iconSize} color="blue" />;
    } else if (alertMessage) {
      return (
        <Icon
          type={'feather'}
          name="alert-triangle"
          size={iconSize}
          color={'black'}
        />
      );
    }
    return (
      <Icon
        style={styles.searchBarIcons}
        color={query ? 'black' : 'rgba(0,0,0,0.3)'}
        name="search"
        size={iconSize}
      />
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        dispatch(fetchMovies(query));
        mySearchBarRef?.current?.blur();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, query]);

  return (
    <View style={styles.container}>
      <SearchBar
        platform={'android'}
        placeholder="Search By Title"
        clearIcon={ClearIcon}
        cancelIcon={SearchIcon}
        searchIcon={SearchIcon}
        containerStyle={styles.searchBarContainer}
        leftIconContainerStyle={styles.leftIconSearchBarContainer}
        inputStyle={styles.input}
        autoFocus={true}
        ref={mySearchBarRef}
        rightIconContainerStyle={styles.rightIconSearchBarContainer}
        onChangeText={txt => dispatch(onSearchChange(txt))}
        value={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    width: '100%',
    height: searchBarHeight,
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  leftIconSearchBarContainer: {
    flex: 0.2,
    marginLeft: 0,
  },
  rightIconSearchBarContainer: {flex: 0.2, marginRight: 0},
  input: {
    flex: 0.6,
    fontSize: normalize(26),
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  searchBarIcons: {
    width: '100%',
    justifyContent: 'center',
    height: searchBarHeight,
  },
});

export default MySearchBar;
