import React from 'react';
import {Image, Animated, Text} from 'react-native';

import styles from './Card.styled';

const Card = ({
  content,
  likeOpacity,
  dislikeOpacity,
  panHandlers,
  cardStyle,
}) => (
  <Animated.View {...panHandlers} style={cardStyle}>
    <Animated.View style={[styles.likeWrapper, {opacity: likeOpacity}]}>
      <Text style={styles.likeText}>LIKE</Text>
    </Animated.View>
    <Animated.View style={[styles.nopeWrapper, {opacity: dislikeOpacity}]}>
      <Text style={styles.nopeText}>NOPE</Text>
    </Animated.View>
    <Image style={styles.image} source={content.uri} />
  </Animated.View>
);

export default Card;
