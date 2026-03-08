import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { observer } from 'mobx-react-lite';
import Svg, { Polyline } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Button from '../../components/Button';
import { getRouteRequest } from '../../services/routeService';
import { Point } from '../../types/route';

import GcuMap from '../../utils/maps/gcuMap.svg';

const MAP_WIDTH = 1684;
const MAP_HEIGHT = 2384;

export default observer(function MapScreen() {
  const [routePoints, setRoutePoints] = useState<Point[]>([]);
  const [routeString, setRouteString] = useState('');
  const [loading, setLoading] = useState(false);

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
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const lastScale = useRef(1);
  const lastOffset = useRef({ x: 0, y: 0 });

  const MIN_SCALE = 0.1;
  const MAX_SCALE = 5;

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      let newScale = lastScale.current * e.scale;

      if (newScale < MIN_SCALE) newScale = MIN_SCALE;
      if (newScale > MAX_SCALE) newScale = MAX_SCALE;

      scale.setValue(newScale);
    })
    .onEnd((e) => {
      let newScale = lastScale.current * e.scale;

      if (newScale < MIN_SCALE) newScale = MIN_SCALE;
      if (newScale > MAX_SCALE) newScale = MAX_SCALE;

      lastScale.current = newScale;
      scale.setValue(newScale);
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.setValue(lastOffset.current.x + e.translationX);
      translateY.setValue(lastOffset.current.y + e.translationY);
    })
    .onEnd((e) => {
      lastOffset.current.x += e.translationX;
      lastOffset.current.y += e.translationY;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View
            style={{
              flex: 1,
              transform: [
                { scale },
                { translateX },
                { translateY }
              ],
            }}
          >
            <Svg
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            >
              <GcuMap />

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
            </Svg>
          </Animated.View>
        </GestureDetector>
      </View>

      <Button
        title={loading ? 'Calculating...' : 'Calculate Route'}
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