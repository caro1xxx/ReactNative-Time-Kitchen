import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// 音乐库
import Sound from 'react-native-sound';
const Timer = props => {
  const [times, settime] = useState(props.sumTime);
  const currTime = useRef(times);

  // 加载音乐
  let musciPath = require('../img/in.caf');
  // 音乐方法
  var music = new Sound(musciPath, error => {
    if (error) {
      alert('提示音乐播放失败');
    }
  });
  // 定时器相关
  useEffect(() => {
    currTime.current = times; // 更新
  });
  useEffect(() => {
    const timer = setInterval(() => {
      if (currTime.current === 0) {
        // 播放音乐
        music.play();
        clearInterval(timer);
        // 传递煮熟消息
        props.boil();
        return;
      }
      settime(c => c - 1);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View>
      <View style={styles.clock}>
        <Image source={require('../img/timer.png')} style={styles.timer} />
        {times === 0 ? (
          <Text style={styles.T}>Over</Text>
        ) : props.sumTime / 60 >= 1 ? (
          <Text style={styles.T}>
            {Number.parseInt(times / 60, 10)}h {times % 60}m
          </Text>
        ) : (
          <Text style={styles.T}>{times % 60}m</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  clock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  T: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  timer: {
    width: 55,
    height: 55,
  },
});
export default Timer;
