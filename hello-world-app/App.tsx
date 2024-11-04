import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function App() {
  const scaleValues = useRef(
    Array.from({ length: 11 }, () => new Animated.Value(1))
  ).current; // 11 letras en "HELLO WORLD"

  useEffect(() => {
    scaleValues.forEach((scale, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 500 + index * 100, // Añade un desfase para cada letra
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500 + index * 100,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [scaleValues]);

  const letters = 'HELLO WORLD'.split('');
  const colors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF',
    '#4B0082', '#9400D3', '#FF1493', '#00CED1', '#FFD700', '#ADFF2F',
  ];

  return (
    <View style={styles.container}>
      {letters.map((letter, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.text,
            { color: colors[index % colors.length], transform: [{ scale: scaleValues[index] }] },
          ]}
        >
          {letter}
        </Animated.Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 40,
    marginHorizontal: 2,
  },
});