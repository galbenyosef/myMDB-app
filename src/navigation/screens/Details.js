import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {clearSelectedMovie, fetchMovie} from '../../redux/actions/ListActions';
import {useDispatch, useSelector} from 'react-redux';
import {getLogo, NO_IMAGE_URL, normalize} from '../../utilities/Utilities';
import MyAnimatedBackground from '../../components/AnimatedBackground/MyAnimatedBackground';
import {Icon} from 'react-native-elements';

const Details = () => {
  const {
    params: {imdbID},
  } = useRoute();
  const dispatch = useDispatch();
  const selectedMovie = useSelector(state => state.selectedMovie);
  const loading = useSelector(state => state.loading);

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovie(imdbID));
    }
    return () => dispatch(clearSelectedMovie());
  }, [dispatch, imdbID]);

  if (loading || !selectedMovie) {
    return (
      <View style={styles.loadingContainer}>
        <MyAnimatedBackground />
        <ActivityIndicator size={120} color={'black'} />
      </View>
    );
  }

  const {Title, Poster, imdbRating, imdbVotes, Released, Runtime, Genre, Plot} =
    selectedMovie;

  return (
    <View style={styles.container}>
      <MyAnimatedBackground />
      {/*Title*/}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{Title}</Text>
      </View>

      {/*Image*/}
      <Image
        source={{uri: Poster !== 'N/A' ? Poster : NO_IMAGE_URL}}
        resizeMode={'contain'}
        style={styles.image}
      />

      {/*Plot*/}
      <ScrollView style={{flexGrow: 0.5}}>
        <Text style={styles.plotText}>{Plot}</Text>
      </ScrollView>

      {/*Info*/}
      <View style={styles.infoContainer}>
        <View style={styles.infoTopView}>
          {/*Ranking*/}
          <View style={styles.rankingContainer}>
            <View style={styles.starContainer}>
              <Icon name={'star'} size={50} color={'gold'} />
            </View>
            <View style={styles.rankingTextContainer}>
              <Text style={styles.rankingTextActual}>
                {imdbRating}
                <Text style={styles.rankingTextTotal}>/10</Text>
              </Text>
              <Text style={styles.rankingTotalVotes}>{imdbVotes}</Text>
            </View>
          </View>
          <View style={styles.rankingContainerSpacer} />
          {/*Imdb Logo*/}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://www.imdb.com/title/${imdbID}`)
            }>
            <Image
              resizeMode={'contain'}
              source={getLogo()}
              style={styles.imdbLogo}
            />
          </TouchableOpacity>
        </View>
        {/*Details*/}
        <View style={styles.infoRankingView}>
          <View style={styles.infoDetailsViewColumn}>
            <Text style={styles.columnTextSubject}>Released:</Text>
            <Text style={styles.columnTextContent}>{Released}</Text>
          </View>
          <View style={styles.infoDetailsViewColumn}>
            <Text style={styles.columnTextSubject}>Genre:</Text>
            <Text style={styles.columnTextContent}>{Genre}</Text>
          </View>
          <View style={styles.infoDetailsViewColumn}>
            <Text style={styles.columnTextSubject}>Runtime:</Text>
            <Text style={styles.columnTextContent}>{Runtime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', padding: normalize(20)},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {paddingBottom: normalize(20), justifyContent: 'center'},
  titleText: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  image: {flex: 1, width: '100%', marginBottom: normalize(20)},
  plotText: {fontSize: normalize(20)},
  infoContainer: {
    width: '100%',
  },
  infoTopView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: normalize(20),
  },
  rankingContainer: {
    flexDirection: 'row',
  },
  rankingTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
  },
  rankingTextActual: {fontSize: normalize(30), fontWeight: 'bold'},
  rankingTextTotal: {fontSize: normalize(20)},
  rankingTotalVotes: {fontSize: normalize(18)},
  rankingContainerSpacer: {width: normalize(25)},
  imdbLogo: {height: normalize(80), width: normalize(160)},
  infoRankingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: normalize(20),
  },
  infoDetailsViewColumn: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  columnTextSubject: {fontSize: normalize(26), fontWeight: 'bold'},
  columnTextContent: {textAlign: 'center', fontSize: normalize(20)},
});

export default Details;
