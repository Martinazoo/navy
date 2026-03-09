import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import Svg, { Polyline } from 'react-native-svg';
import ImageZoom from 'react-native-image-pan-zoom';

import Button from '../../components/Button';
import { getRouteRequest } from '../../services/routeService';
import { Point } from '../../types/route';

import GcuMap from '../../utils/maps/gcuMap.svg';
import GcuMap2 from '../../utils/maps/gcuMap_v2.svg';

const MAP_WIDTH = 1684;
const MAP_HEIGHT = 2384;

const { width, height } = Dimensions.get('window');

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

  return (
    <View style={{ flex: 1, backgroundColor: '#F3FAF7' }}>
      {/* @ts-ignore */}
      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={MAP_WIDTH}
        imageHeight={MAP_HEIGHT}

        minScale={0.3}
        maxScale={5}

        enableCenterFocus={false}

        pinchToZoom={true}
        panToMove={true}
        enableDoubleClickZoom={true}

        useNativeDriver={true}

        maxOverflow={300}

        horizontalOuterRangeOffset={() => {}}
        verticalOuterRangeOffset={() => {}}

      >
        <View
          style={{
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            backgroundColor: '#F3FAF7',
          }}
        >
          <Svg
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          >
            <GcuMap2 />

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
        </View>
      </ImageZoom>
    </View>
  );
});