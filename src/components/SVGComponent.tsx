import React from 'react';
import { Alert } from 'react-native';
import Svg, { Path, Polygon, Rect, Text, TSpan } from 'react-native-svg';

type SVGComponentProps = {
  onPressElement?: (id: string) => void;
};

// Elementos del mapa: paths, polígonos, rects
const mapElements = [
  {
    id: 'zona-1',
    type: 'path',
    d: 'M1064.39,88.97l-460.4,606.79,53.19,47.49-51.66,82.72,10.72,816.51-352.34,1.53,18.38,257.36h629.62l7.66-989.62,454.98-623.49-310.16-199.3ZM1081.74,264.63c-1.29,0-1.29-2,0-2s1.29,2,0,2Z',
    fill: '#5f8f85',
  },
  {
    id: 'zona-2',
    type: 'polygon',
    points: '908.94 368.82 855.07 443.72 957.07 517.27 1011.28 442.61 908.94 368.82',
    fill: '#264a45',
  },
  {
    id: 'zona-3',
    type: 'polygon',
    points: '874.21 631.41 955.31 519.7 853.32 446.15 772.7 558.22 874.21 631.41',
    fill: '#264a45',
  },
  {
    id: 'zona-4',
    type: 'polygon',
    points: '1139.1 266.55 1172.93 219.95 1076.42 149.48 1042.23 196.7 1139.1 266.55',
    fill: '#264a45',
  },
  {
    id: 'zona-5',
    type: 'rect',
    x: 777.27,
    y: 1725.05,
    width: 96.02,
    height: 128.17,
    fill: '#264a45',
  },
];

// Textos del mapa
const mapTexts = [
  {
    id: 'text-1',
    x: 816.7951,
    y: 1292.0465,
    text: 'M316',
    fill: '#264a45',
  },
  {
    id: 'text-2',
    x: 1057.95,
    y: 528.46,
    text: 'M327A',
    fill: '#264a45',
  },
  // Agrega más textos aquí siguiendo este patrón
];

export default function SVGComponent({ onPressElement }: SVGComponentProps) {
  const handlePress = (id: string) => {
    if (onPressElement) {
      onPressElement(id);
    } else {
      Alert.alert(`Elemento clicado: ${id}`);
    }
  };

  return (
    <Svg width={1684} height={2384} viewBox="0 0 1684 2384">
      {mapElements.map((el) => {
        switch (el.type) {
          case 'path':
            return <Path key={el.id} d={el.d} fill={el.fill} onPress={() => handlePress(el.id)} />;
          case 'polygon':
            return <Polygon key={el.id} points={el.points} fill={el.fill} onPress={() => handlePress(el.id)} />;
          case 'rect':
            return <Rect key={el.id} x={el.x} y={el.y} width={el.width} height={el.height} fill={el.fill} onPress={() => handlePress(el.id)} />;
          default:
            return null;
        }
      })}

      {mapTexts.map((t) => (
        <Text
          key={t.id}
          x={t.x}
          y={t.y}
          fill={t.fill}
          fontSize={20}  
          pointerEvents='none'     
        >
          <TSpan>{t.text}</TSpan>
        </Text>
      ))}
    </Svg>
  );
}