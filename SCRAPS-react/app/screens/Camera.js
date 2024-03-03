import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from "../component/Button";

export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const[image, setImage] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [mode, setMode] = useState('single');
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
            <View style={styles.header}>
                <Button size={25} icon={flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} />
                <Text style={styles.headerTitle}>Camera</Text>
            </View>
            {!image ? 
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
            >
            </Camera>
            :
            <Image source={{uri: image}} style={styles.camera}/>}
            <View style={styles.modeSelection}>
            <TouchableOpacity style={mode === 'single' ? styles.modeButtonActive : styles.modeButton} onPress={() => setMode('single')}>
                <Text style={mode === 'single' ? { color: '#000' } : { color: '#fff' }}>Single</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mode === 'batch' ? styles.modeButtonActive : styles.modeButton} onPress={() => setMode('batch')}>
                <Text style={mode === 'batch' ? { color: '#000' } : { color: '#fff' }}>Batch</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        alignItems: 'flex-start',
                        flex: 1,
                        height: 115,
                        width: '100%',
                        paddingEnd: 30,
                        paddingStart: 30,
                        paddingTop: 25,
                    }}>
                        <Button style={styles.button} size={60} icon="reload" onPress={() => setImage(null)}/>
                        <Button style={styles.button} size={60} icon="checkmark-sharp" onPress={saveImage}/>
                    </View>
                :
                <Button size={100} style={styles.button} icon="radio-button-on" onPress={takePicture}/>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      paddingBottom: 80,
      paddingTop: 80,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        paddingBottom: 50,
        backgroundColor: '#000',
        width: "100%",
    },
    button: {
        height: 100,
        width:  250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    modeSelection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
        paddingBottom: 105,
    },
    modeButton: {
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 15,
    },
    modeButtonActive: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
});