import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const[image, setImage] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.baclk);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text styles={styles.boldtext}>Camera</Text>
            </View>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      padding: 20,
      backgroundColor: '#FA7070',
    },
    boldtext: {
      fontWeight: 'bold',
      fontWeight: 200,
    },
  });
  