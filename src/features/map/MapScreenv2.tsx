import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import Svg, { Polyline } from 'react-native-svg';

import Button from '../../components/Button';

const pathE1C3 =
"2176,5120 2176,5104 2176,5088 2176,5072 2176,5056 2176,5040 2176,5024 2176,5008 2176,4992 2176,4976 2176,4960 2176,4944 2176,4928 2176,4912 2176,4896 2176,4880 2176,4864 2176,4848 2176,4832 2176,4816 2176,4800 2176,4784 2176,4768 2176,4752 2176,4736 2176,4720 2176,4704 2176,4688 2176,4672 2176,4656 2176,4640 2176,4624 2176,4608 2176,4592 2176,4576 2176,4560 2176,4544 2192,4544 2208,4544 2224,4544 2240,4544";

export default observer(function MapScreen() {

  const [routeString, setRouteString] = useState('');

  const showRoute = () => {
    setRouteString(pathE1C3);
  };

  return (
    <View style={styles.container}>

      <View style={styles.mapContainer}>
        <Svg width="100%" height="100%" viewBox="0 0 6000 6000">
          {routeString !== '' && (
            <Polyline
              points={routeString}
              fill="none"
              stroke="red"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Mostrar Ruta"
          onPress={showRoute}
        />
      </View>

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapContainer: {
    flex: 1,
  },

  buttonContainer: {
    padding: 20,
  },
});