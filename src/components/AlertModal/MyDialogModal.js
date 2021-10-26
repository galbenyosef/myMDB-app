import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../../redux/actions/GlobalActions';

const MyDialogModal = () => {
  const alertMessage = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      hardwareAccelerated={true}
      statusBarTranslucent={false}
      visible={!!alertMessage}>
      <View style={styles.container}>
        {
          <View style={styles.contentContainer}>
            <View style={styles.contentTextContainer}>
              <Text style={styles.contentText}>{alertMessage}</Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(setAlert(''));
              }}
              style={styles.contentButtonContainer}>
              <Text style={styles.contentButtonText}>Close</Text>
            </TouchableWithoutFeedback>
          </View>
        }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 200,
    width: 300,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  contentTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {fontSize: 24},
  contentButtonContainer: {flex: 0.3, justifyContent: 'center'},
  contentButtonText: {fontSize: 20, borderWidth: 1, padding: 10},
});

export default MyDialogModal;
