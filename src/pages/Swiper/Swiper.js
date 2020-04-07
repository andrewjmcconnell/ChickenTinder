import React, {useState, useEffect} from 'react';
import {Animated, View, Dimensions, PanResponder} from 'react-native';

import styles from './Swiper.styled';

import Card from '../../components/Card';

const Foods = [
  {id: '1', uri: require('../../assets/images/ramen.jpg')},
  {id: '2', uri: require('../../assets/images/meatheads.jpg')},
  {id: '3', uri: require('../../assets/images/gyuKaku.jpg')},
  {id: '4', uri: require('../../assets/images/asianNoodelHouse.jpg')},
  {id: '5', uri: require('../../assets/images/tacos.jpg')},
];

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Swiper = () => {
  const [index, setIndex] = useState(0);
  let position = new Animated.ValueXY();

  let rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-30deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  let rotateAndTranslate = {
    transform: [
      {
        rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  let likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  let dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  let nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  let nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_, __) => true,
    onPanResponderMove: (_, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          setIndex(index + 1);
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          setIndex(index + 1);
        });
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    position.setValue({x: 0, y: 0});
  }, [index]);

  return (
    <View style={styles.flex}>
      <View style={styles.height} />
      <View style={styles.flex}>
        {Foods.map((item, i) =>
          i < index ? null : (
            <Card
              key={item.id}
              content={item}
              likeOpacity={i === index ? likeOpacity : 0}
              dislikeOpacity={i === index ? dislikeOpacity : 0}
              panHandlers={i === index ? panResponder.panHandlers : null}
              cardStyle={
                i === index
                  ? [
                      rotateAndTranslate,
                      {
                        height: SCREEN_HEIGHT - 120,
                        width: SCREEN_WIDTH,
                        padding: 10,
                        position: 'absolute',
                      },
                    ]
                  : {
                      opacity: nextCardOpacity,
                      transform: [{scale: nextCardScale}],
                      height: SCREEN_HEIGHT - 120,
                      width: SCREEN_WIDTH,
                      padding: 10,
                      position: 'absolute',
                    }
              }
            />
          ),
        ).reverse()}
      </View>
      <View style={styles.height} />
    </View>
  );
};

export default Swiper;
