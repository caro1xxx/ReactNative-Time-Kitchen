import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
const NavBar = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.changefull.changeFullSrceen(!props.fullsrceen);
        }}>
        <View style={(styles.left, styles.common)}>
          {props.fullsrceen ? (
            <Image
              source={require('../img/cancelFullsrceen.png')}
              style={styles.icon}
            />
          ) : (
            <Image source={require('../img/full.png')} style={styles.icon} />
          )}
        </View>
      </TouchableOpacity>
      <View style={(styles.left, styles.block)}></View>
      <View style={(styles.left, styles.rightbody)}>
        <View style={(styles.left, styles.fenge)}>
          <Image source={require('../img/like.png')} style={styles.icon} />
        </View>
        <View style={(styles.left, styles.fenge)}>
          <Image
            source={require('../img/fenxi.png')}
            style={styles.insideIcon}
          />
        </View>
        <View style={(styles.left, styles.fenge)}>
          <Image source={require('../img/setting.png')} style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '3%',
  },
  left: {
    alignSelf: 'flex-start',
  },
  common: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    marginHorizontal: '1%',
    borderRadius: 10,
    marginTop: 40,
    shadowColor: '#ced4da',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  insideIcon: {
    width: 30,
    height: 30,
  },
  block: {
    width: '43%',
  },
  rightbody: {
    width: '40%',
    height: 45,
    backgroundColor: '#fff',
    marginHorizontal: '1%',
    borderRadius: 10,
    marginTop: 40,
    shadowColor: '#ced4da',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fenge: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavBar;
