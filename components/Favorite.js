import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Settings,
  Text,
} from 'react-native';

const Item = ({t}) => {
  return <Image style={styles.item} source={t.img} />;
};

const Favorite = props => {
  const data = [
    {id: 1, img: require('../img/food/yxrs.png')},
    {id: 2, img: require('../img/food/yxrs.png')},
    {id: 3, img: require('../img/food/yxrs.png')},
    {id: 4, img: require('../img/dish.png')},
    {id: 5, img: require('../img/dish.png')},
    {id: 6, img: require('../img/dish.png')},
  ];

  const renderItem = ({item}) => <Item t={item} />;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModel}
        onRequestClose={() => {
          props.changeFavoriteModel(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              onRefresh={type => {
                return type;
              }}
              refreshing={false}
              numColumns={3}
              horizontal={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                props.changeFavoriteModel(false);
              }}>
              <Image source={require('../img/close.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    height: '70%',
    width: '90%',
    alignItems: 'center',
    shadowOffset: -100,
    shadowRadius: 10,
    shadowOffsetWidth: 10,
    shadowOffsetHeight: 10,
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: '#0d6efd',
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
  item: {
    width: '30%',
    height: 100,
    marginLeft: '1.5%',
    marginRight: '1.5%',
  },
});

export default Favorite;
