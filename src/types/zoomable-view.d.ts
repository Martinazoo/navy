declare module 'react-native-zoomable-view' {
  import { ComponentType, ReactNode } from 'react';
  import { ViewStyle } from 'react-native';

  interface ZoomableViewProps {
    children?: ReactNode;
    maxZoom?: number;
    minZoom?: number;
    zoomStep?: number;
    initialZoom?: number;
    bindToBorders?: boolean;
    style?: ViewStyle;
  }

  const ZoomableView: ComponentType<ZoomableViewProps>;
  export default ZoomableView;
}