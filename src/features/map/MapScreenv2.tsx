// MapScreen.tsx
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Polyline } from 'react-native-svg';

import Button from '../../components/Button';
import { getRouteRequest } from '../../services/routeService';
import { Point } from '../../types/route';
import SVGComponent from '../../components/SVGComponent'; // <-- Importa aquí tu SVG dinámico

const MAP_WIDTH = 1684;
const MAP_HEIGHT = 2384;

const INI_W = 750;
const INI_H = 1100;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const initialX = SCREEN_WIDTH / 2 - INI_W;
const initialY = SCREEN_HEIGHT / 2 - INI_H;

export default observer(function MapScreen() {
  const [routePoints, setRoutePoints] = useState<Point[]>([]);
  const [routeString, setRouteString] = useState('');
  const [loading, setLoading] = useState(false);
  const isDragging = useRef(false);

  const handleGetRoute = async () => {
    try {
      setLoading(true);
      const data = await getRouteRequest();
      setRoutePoints(data.path);
      setRouteString(data.pathString);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(initialX)).current;
  const translateY = useRef(new Animated.Value(initialY)).current;

  const lastScale = useRef(1);
  const lastOffset = useRef({ x: initialX, y: initialY });

  const MIN_SCALE = 0.3;
  const MAX_SCALE = 5;

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      let newScale = lastScale.current * e.scale;
      newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
      scale.setValue(newScale);
    })
    .onEnd((e) => {
      lastScale.current = Math.min(Math.max(lastScale.current * e.scale, MIN_SCALE), MAX_SCALE);
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
        isDragging.current = true;
    })
    .onUpdate((e) => {
      const speedFactor = 1 / lastScale.current;
      translateX.setValue(lastOffset.current.x + e.translationX * speedFactor);
      translateY.setValue(lastOffset.current.y + e.translationY * speedFactor);
    })
    .onEnd((e) => {
        const speedFactor = 1 / lastScale.current;
        lastOffset.current.x += e.translationX * speedFactor;
        lastOffset.current.y += e.translationY * speedFactor;
        setTimeout(() => {
            isDragging.current = false;
        }, 100);
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View
            style={{
              flex: 1,
              transform: [{ scale }, { translateX }, { translateY }],
            }}
          >
            <SVGComponent
              onPressElement={(id) => {
                if (isDragging.current) return; 
                Alert.alert('Elemento clicado', `Has clicado el elemento: ${id}`);
              }}
            />

            {routeString !== '' && (
              <Polyline
                points={routeString}
                fill="none"
                stroke="red"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Animated.View>
        </GestureDetector>
      </View>

      <Button
        title={loading ? 'Calculando...' : 'Calcular ruta'}
        onPress={handleGetRoute}
        disabled={loading}
      />
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});