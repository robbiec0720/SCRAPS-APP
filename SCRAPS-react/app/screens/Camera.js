import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from "../component/Button";

export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const[image, setImage] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    if(hasCameraPermission === false){
        return <Text> No access to Camera</Text>
    }
    const takePicture = async () => {
        if(cameraRef){
            try{
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch(e) {
                console.log(e);
            }
        }
    }

    const saveImage = async () => {
        if(image){
            try{
                await MediaLibrary.createAssetAsync(image);
                alert('Picture save!')
                setImage(null);
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <View style={styles.container}>
            {!image ? 
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 30,
                }}>
                    <Button size={40} style={styles.flashstyle} icon={flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} onPress={() => {
                        setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
                    }}/>
                </View>
            </Camera>
            :
            <Image source={{uri: image}} style={styles.camera}/>}
            <View style={styles.buttonContainer}>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingv: 15,
                    }}>
                        <Button size={60} icon="reload" onPress={() => setImage(null)}/>
                        <Button size={60} icon="checkmark-sharp" onPress={saveImage}/>
                    </View>
                :
                <Button size={100} icon="radio-button-on" onPress={takePicture}/>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      paddingBottom: 80,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingBottom: 80,
    },
});
  