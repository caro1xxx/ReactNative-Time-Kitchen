import React, {useEffect, useRef, useState} from 'react';
import {food} from '../utils/food';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const Menu = props => {
  const [foodList, setfoodList] = useState(food);
  const [text, setText] = useState('');
  const prevText = useRef('');
  const [styled, setstyled] = useState({
    inputColor: '#ced4da',
  });
  const textInputRef = useRef('');

  // search
  const search = () => {
    food.map(item => {
      if (text !== '') {
        prevText.current = text;
      }
      if (item.key === text) {
        setfoodList([item]);
      }
    });
  };
  // foucs
  const getFoucs = () => {
    setstyled({inputColor: '#0d6efd'});
  };
  // blur
  const lostFoucs = () => {
    setstyled({inputColor: '#ced4da'});
  };

  // 根据text的变化,判断是否是从有内容到空内容
  useEffect(() => {
    if (text === '' && prevText.current !== '') {
      setfoodList(food);
    }
  }, [text]);

  return (
    <View>
      <View style={styles.topRow}>
        <TextInput
          clearButtonMode={true}
          maxLength={10}
          onChangeText={t => setText(t)}
          defaultValue={text}
          style={{
            borderColor: styled.inputColor,
            height: 40,
            width: '80%',
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderRadius: 5,
            padding: 5,
          }}
          placeholder="搜索你想要的食材!"
          ref={textInputRef}
          // 获得焦点时
          onFocus={getFoucs}
          // 失去焦点时
          onBlur={lostFoucs}
        />
        <TouchableOpacity
          onPress={() => {
            search();
            // 输入框失去焦点
            textInputRef.current.blur();
          }}
          style={styles.btn}>
          <Image source={require('../img/search.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {foodList.map(item => {
            return (
              <View style={(styles.left, styles.common)} key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    if (props.foodId.length === 4) {
                      alert('最多添加四样食材');
                      return;
                    }
                    props.selectFood.foodInQueue([
                      ...props.foodId,
                      item.id - 1,
                    ]);
                  }}>
                  <View style={styles.inside}>
                    <Image source={item.path} style={styles.type} />
                    <View style={styles.time}>
                      <Text style={styles.timefont}>+{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '3%',
    // alignContent: 'stretch',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  common: {
    width: 50,
    height: 80,
    backgroundColor: '#f6f6f6',
    marginHorizontal: '1%',
    minWidth: '45%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  type: {
    width: 70,
    height: 70,
  },
  inside: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  time: {
    justifyContent: 'center',
  },
  timefont: {
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#8893a8',
  },
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: '#0d6efd',
    width: '19%',
    height: 40,
    marginLeft: '1%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
