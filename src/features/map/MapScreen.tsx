import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import Svg, { Circle, G, Polyline } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { getRouteRequest } from '../../services/routeService';
import GcuMapExact from '../../utils/maps/exact_v6.svg';
import { getUserPosition } from '../../services/user';

const MAP_WIDTH = 1684; //1684 //5018
const MAP_HEIGHT = 2384; //2384 //7060
const TILE_X = 318; //314
const TILE_Y = 452; //442
const SCALE_X = MAP_WIDTH / TILE_X;
const SCALE_Y = MAP_HEIGHT / TILE_Y;


const INI_W = 750; //750 //2509
const INI_H = 1100; //1100 //3530

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const initialX = SCREEN_WIDTH / 2 - INI_W;
const initialY = SCREEN_HEIGHT / 2 - INI_H;

interface MapScreenProps {
  startAndEnd?: boolean;
  routeTriggerKey?: string;
  routeString?: string;
}

export default observer(function MapScreen({ startAndEnd = false, routeTriggerKey = '', routeString: routeStringFromHome = '' }: MapScreenProps) {
  const [routeString, setRouteString] = useState('');
  const [userPos, setUserPos] = useState<{ posX: number; posY: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const routeToRender = routeStringFromHome || routeString;
  
  const scaleX = (num: number) => num * SCALE_X; 
  const scaleY = (num: number) => num * SCALE_Y;

  const handleGetRoute = async () => {
    try {
      setLoading(true);
      const data = await getRouteRequest();
      let routeString = scalePathString(data.pathString, SCALE_X, SCALE_Y);
      setRouteString(routeString);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadElements = async () => {
    const userPos = await getUserPosition();
    userPos.posX = scaleX(userPos.posX);
    userPos.posY = scaleY(userPos.posY);
    setUserPos(userPos);
  };

  useEffect(() => {
    void loadElements();
  }, []);


  useEffect(() => {
    if (startAndEnd && routeTriggerKey) {
      void handleGetRoute();
    }
  }, [startAndEnd, routeTriggerKey]);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(initialX)).current;
  const translateY = useRef(new Animated.Value(initialY)).current;

  const lastScale = useRef(1);
  const lastOffset = useRef({ x: initialX, y: initialY });

  const MIN_SCALE = 0.3;
  const MAX_SCALE = 5;

  function scalePathString(pathString: string, scaleX: number, scaleY: number): string {
    return pathString
      .split(" ").map(p => {
        const [x, y] = p.split(",").map(Number);
        return `${x * scaleX},${y * scaleY}`;
      }).join(" ");
  }
  
  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
      let newScale = lastScale.current * e.scale;
      if (newScale < MIN_SCALE) newScale = MIN_SCALE;
      if (newScale > MAX_SCALE) newScale = MAX_SCALE;

      scale.setValue(newScale);
    }).onEnd((e) => {
      let newScale = lastScale.current * e.scale;
      if (newScale < MIN_SCALE) newScale = MIN_SCALE;
      if (newScale > MAX_SCALE) newScale = MAX_SCALE;
      lastScale.current = newScale;

      scale.setValue(newScale);
    });

  const panGesture = Gesture.Pan().onUpdate((e) => {
        const speedFactor = 1 / lastScale.current;

        translateX.setValue(
        lastOffset.current.x + e.translationX * speedFactor
        );

        translateY.setValue(
        lastOffset.current.y + e.translationY * speedFactor
        );
    }).onEnd((e) => {
      const speedFactor = 1 / lastScale.current;
      lastOffset.current.x += e.translationX * speedFactor;
      lastOffset.current.y += e.translationY * speedFactor;
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
              
              <GcuMapExact />

              {routeToRender !== '' && (
                <Polyline
                  points={routeToRender}
                  fill="none"
                  stroke="blue"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {userPos && (
                <Circle cx={userPos.posX} cy={userPos.posY} r="5" fill="blue" />
              )}
            </Svg>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    overflow: 'hidden',
    backgroundColor: '#f3af7',
  },
});