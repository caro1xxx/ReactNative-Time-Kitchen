/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import Menu from './components/Menu';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import ResultModel from './components/ResultModel';
import {food} from './utils/food';
import {customAlphabet} from 'nanoid/non-secure';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Text,
  AppState,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  // 组件通信
  const [componentMessage] = useState({
    // 改变全屏
    changeFullSrceen: type => {
      setflag({
        fullSrceen: type,
        isCook: flag.isCook,
        isShowModel: flag.isShowModel,
      });
    },
    // 食物入队
    foodInQueue: foodId => {
      // 添加烹饪时间
      let sum = foodId.reduce((accumulator, currentValue) => {
        return accumulator + food[currentValue].time;
      }, 0);
      setcookSumTime(sum);
      setQueue(foodId);
    },
    // 获得食物烹饪结果
    isBoil: async () => {
      try {
        // 弹出model
        setflag({
          fullSrceen: true,
          isCook: true,
          isShowModel: true,
        });
        // fetch
        // alert(appState.current.foodQueue.length);
        let response = await fetch(
          'https://www.fastmock.site/mock/9f6bb525a237d70f41bbba1f0763e8a1/ios/api/v1/result',
        );
        let responseJson = await response.json();
        setfoodRes({
          name: responseJson.result,
          imgUrl: responseJson.img,
          foodLevel: responseJson.foodLevel,
        });
      } catch (error) {}
    },
    // change model
    changeResultModel: () => {
      setflag({
        fullSrceen: flag.fullSrceen,
        isCook: flag.isCook,
        isShowModel: flag.isShowModel,
      });
    },
  });
  // 自助nanoid
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
  // 烹饪总时间
  const [cookSumTime, setcookSumTime] = useState(0);
  // 食材队列
  const [queue, setQueue] = useState([]);
  // 标识
  const [flag, setflag] = useState({
    fullSrceen: false,
    isCook: false,
    isShowModel: false,
  });
  // 烹饪食物结果
  const [foodRes, setfoodRes] = useState({name: '', imgUrl: '', foodLevel: ''});
  // AppState
  const appState = useRef(AppState.currentState);
  // 删除食材
  const cancelFood = foodIndex => {
    let foodlist = [...queue];
    // 减少烹饪时间
    let decrment = food[foodlist[foodIndex]].time;
    setcookSumTime(cookSumTime - decrment);
    // 删除
    foodlist.splice(foodIndex, 1);
    setQueue(foodlist);
  };

  // 开始烹饪
  const cook = () => {
    setflag({fullSrceen: true, isCook: true, isShowModel: false});
    let result = queue.map(item => {
      return food[item].key;
    });
    // 保存食材队列进Appstate
    appState.current = {foodQueue: result};
  };

  const fullStyle = useRef(new Animated.Value(4)).current;
  // 全屏动画
  useEffect(() => {
    if (flag.fullSrceen) {
      Animated.timing(fullStyle, {
        toValue: 0.01,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fullStyle, {
        toValue: 4,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [fullStyle, flag.fullSrceen]);

  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <NavBar
          changefull={componentMessage}
          fullsrceen={flag.fullSrceen}></NavBar>
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {flag.isCook ? (
          <Timer
            sumTime={cookSumTime}
            isCook={flag.isCook}
            boil={componentMessage.isBoil}
          />
        ) : null}
        {flag.isShowModel ? (
          <ResultModel
            changeModel={componentMessage.changeResultModel}
            showModel={flag.isShowModel}
            foodResult={foodRes}></ResultModel>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            componentMessage.changeFullSrceen(false);
          }}>
          <Image source={require('./img/guo.png')} style={styles.guo} />
        </TouchableOpacity>
        <View style={styles.bto}>
          {queue.length === 0 ? (
            <View style={styles.queue}>
              <Text style={styles.queueText}>?</Text>
            </View>
          ) : (
            <View style={styles.inQueue}>
              {queue.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.inQUeueFoodTouch}
                    key={nanoid()}
                    onPress={() => {
                      cancelFood(index);
                    }}>
                    <Image
                      style={styles.inQUeueFood}
                      source={food[item].path}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          {queue.length === 0 ? null : (
            <View style={styles.btn}>
              <TouchableOpacity onPress={cook}>
                <Text style={styles.guochan}>烹饪</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Animated.View
        style={{
          flex: fullStyle,
          backgroundColor: '#fff',
          shadowColor: '#999',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.5,
          shadowRadius: 20,
        }}>
        <Menu
          fullsrceen={flag.fullSrceen}
          selectFood={componentMessage}
          foodId={queue}></Menu>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  guo: {
    width: 250,
    height: 250,
  },
  bto: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  queue: {
    height: 50,
    width: '50%',
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  queueText: {
    fontSize: 30,
    color: '#fff',
  },
  btn: {
    height: 50,
    width: '20%',
    backgroundColor: '#dc312b',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guochan: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '800',
  },
  inQueue: {
    height: 50,
    width: '50%',
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inQUeueFood: {
    width: '100%',
    height: 35,
    marginRight: 5,
  },
  inQUeueFoodTouch: {
    width: '20%',
    height: 35,
  },
});

export default App;
