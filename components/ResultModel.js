import React, {useState} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const ResultModel = props => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.changeModel(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              恭喜你获得🎉{props.foodResult.imgUrl}
            </Text>
            <Image
              source={{uri: props.foodResult.imgUrl}}
              style={{width: 150, height: 100}}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                props.changeModel(false);
              }}>
              <Image source={require('../img/close.png')} />
              {/* <Text style={styles.textStyle}>H</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    height: '50%',
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    top: 0,
  },
});

export default ResultModel;
