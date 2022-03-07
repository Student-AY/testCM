import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React from 'react';

import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

import RNFS from 'react-native-fs';
export default function App() {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  function getRandomInt(max) {
    return Math.floor(Math.random() * 5000);
  }

  const CapturePicture = async () => {
    const data = await takePicture();
    console.log(data.uri);
    const filePath = data.uri;
    const newFilePath =
      RNFS.ExternalDirectoryPath + '/' + getRandomInt() + '.jpg';
    RNFS.moveFile(filePath, newFilePath)
      .then(() => {
        console.log('imaged moved from', filePath, ' to ', newFilePath);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.cameraView}>
        <TouchableOpacity onPress={() => CapturePicture()}>
          <Text style={styles.cameraText}>Capture Image</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraText: {
    fontWeight: 'bold',
    color: 'gold',
    width: 120,
    backgroundColor: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
});
