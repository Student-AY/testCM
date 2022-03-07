import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';

import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
export default function App() {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const CaptureHandle = async () => {
    const data = await takePicture();
    console.log(data.uri);
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.cameraView}>
        <Button title="Capture Screen" onPress={() => CaptureHandle()} />
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
