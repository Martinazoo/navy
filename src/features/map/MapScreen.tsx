import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import Svg, { G, Polyline } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Button from '../../components/Button';
import { getRouteRequest } from '../../services/routeService';
import { Point } from '../../types/route';
import GcuMapBig from '../../utils/maps/gcuMap_v5.svg';
import GcuMap from '../../utils/maps/gcuMap_v2.svg';
import GcuMap3 from '../../utils/maps/gcuMap_v3.svg';
import GcuMapExact from '../../utils/maps/exact_v6.svg';

const MAP_WIDTH = 1684; //1684 //5018
const MAP_HEIGHT = 2384; //2384 //7060
const TILE_X = 318; //314
const TILE_Y = 452; //442
const SCALE_X = MAP_WIDTH / TILE_X;
const SCALE_Y = MAP_HEIGHT / TILE_Y;


const pathE1C3_scaled ="168,116 169,117 170,118 170,119 170,120 169,121 168,122 167,123 167,124 167,125 166,126 165,127 164,128 164,129 163,130 162,131 161,132 161,133 160,134 160,135 159,136 158,137 157,138 156,139 155,140 155,141 155,142 154,143 153,144 152,145 151,146 151,147 150,148 149,149 148,150 147,151 146,152 146,153 146,154 146,155 146,156 146,157 146,158 146,159 146,160 146,161 146,162 146,163 146,164 146,165 146,166 146,167 146,168 146,169 146,170 146,171 146,172 146,173 146,174 146,175 146,176 145,177 145,178 145,179 145,180 145,181 145,182 145,183 145,184 145,185 145,186 145,187 145,188 145,189 145,190 145,191 145,192 145,193 145,194 145,195 145,196 145,197 145,198 145,199 145,200 145,201 145,202 145,203 145,204 145,205 145,206 145,207 145,208 145,209 145,210 145,211 145,212 145,213 145,214 145,215 145,216 145,217 145,218 145,219 145,220 145,221 145,222 145,223 145,224 145,225 145,226 145,227 145,228 145,229 145,230 145,231 145,232 145,233 145,234 145,235 145,236 145,237 145,238 145,239 145,240 145,241 145,242 145,243 145,244 145,245 145,246 145,247 145,248 145,249 145,250 145,251 145,252 145,253 145,254 145,255 145,256 145,257 145,258 145,259 145,260 145,261 145,262 145,263 145,264 145,265 145,266 145,267 145,268 145,269 145,270 145,271 145,272 145,273 145,274 145,275 145,276 145,277 145,278 145,279 145,280 145,281 145,282 145,283 145,284 145,285 145,286 145,287 145,288 145,289 145,290 145,291 145,292 145,293 145,294 145,295 145,296 145,297 145,298 145,299 145,300 144,301 144,302 144,303 144,304 144,305 144,306 144,307 144,308 144,309 144,310 144,311 144,312 144,313 144,314 143,315 142,316 141,317 140,317 139,317 138,317 137,317 136,318 136,319 136,320";
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
  const [routePoints, setRoutePoints] = useState<Point[]>([]);
  const [routeString, setRouteString] = useState('');
  const [loading, setLoading] = useState(false);
  const routeToRender = routeStringFromHome || routeString;

  const showRoute = async () => {
    Alert.alert('Route');
    let routeString = scalePathString(pathE1C3_scaled, SCALE_X, SCALE_Y);
    setRouteString(routeString);
  };

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
            </Svg>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* <Button
        title={loading ? 'Calculating...' : 'Calculate Route'}
        onPress={showRoute}
        disabled={loading}
      /> */}
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    overflow: 'hidden',
  },
});