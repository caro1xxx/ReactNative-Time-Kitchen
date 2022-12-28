import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

const ResultModel = props => {
  // const getData = async () => {
  //   let response = await fetch('http://127.0.0.1:8000/api/v1/test/');
  //   let responseJson = await response.json();
  //   alert(responseJson.code);
  // };
  // getData();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModel}
        onRequestClose={() => {
          props.changeModel(false);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              backgroundColor: props.foodResult.foodLevel,
              shadowColor: props.foodResult.foodLevel,
            }}>
            {props.foodResult.name ? (
              <View>
                <Text style={styles.modalText}>
                  获得 <Text>"{props.foodResult.name}"</Text>
                </Text>
                <Image
                  // source={{uri: props.foodResult.imgUrl}}
                  source={require('../img/food/yxrs.png')}
                  style={{width: 200, height: 200}}
                />
              </View>
            ) : (
              <View style={styles.loding}>
                <ActivityIndicator color="#000" />
              </View>
            )}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                props.changeModel(false);
              }}>
              <Image source={require('../img/close.png')} />
            </TouchableOpacity>
            {/* <View style={styles.allrigitBack}>
              <TouchableOpacity style={styles.allback}>
                <Text style={styles.allright}>收入囊中</Text>
              </TouchableOpacity>
            </View> */}
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
    shadowOffset: -100,
    shadowRadius: 10,
    shadowOffsetWidth: 10,
    shadowOffsetHeight: 10,
    shadowOpacity: 0.5,
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
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
  },
  closeBtn: {
    position: 'absolute',
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    top: 10,
  },
  loding: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allright: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  allrigitBack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allback: {
    backgroundColor: 'red',
    padding: 10,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 10,
    // shadow
    shadowColor: '#000',
    shadowOffset: -100,
    shadowRadius: 10,
    shadowOffsetWidth: 10,
    shadowOffsetHeight: 10,
    shadowOpacity: 0.5,
    marginRight: 5,
  },
});

export default ResultModel;
