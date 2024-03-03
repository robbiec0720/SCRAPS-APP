import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from "../component/Button";

export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const[image, setImage] = useState([]);
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
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                if (mode === 'batch') {
                    setImage([...image, data.uri]);
                } else {
                    setImage([data.uri]);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const saveImage = async () => {
        if (image.length > 0) {
            try {
                const savedImages = await Promise.all(image.map(image => MediaLibrary.createAssetAsync(image)));
                alert('Pictures saved!');
                setImage([]);
            } catch (e) {
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
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                autoFocus={Camera.Constants.AutoFocus.on}
                ref={cameraRef}
            >
            </Camera>
            <View style={styles.modeSelection}>
            <TouchableOpacity style={mode === 'single' ? styles.modeButtonActive : styles.modeButton} onPress={() => setMode('single')}>
                <Text style={mode === 'single' ? { color: '#000' } : { color: '#fff' }}>Single</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mode === 'batch' ? styles.modeButtonActive : styles.modeButton} onPress={() => setMode('batch')}>
                <Text style={mode === 'batch' ? { color: '#000' } : { color: '#fff' }}>Batch</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.imageCountButton}>
                    <Text style={styles.imageCountText}>{image.length}</Text>
                </View>
                {image.length > 0 ?
                    <View style={styles.imageActionButtons}>
                        <Button style={styles.button} size={50} icon="reload" onPress={() => setImage([])}/>
                        <Button size={100} style={styles.button} icon="radio-button-on" onPress={takePicture}/>
                        <Button style={styles.button} size={50} icon="checkmark-sharp" onPress={saveImage}/>
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
        height: 70,
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
    imageCountButton: {
        position: 'absolute',
        top: -40, 
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imageCountText: {
        color: '#000',
        fontWeight: 'bold',
    },
    imageActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 1,
        height: 115,
        width: '100%',
        paddingEnd: 20,
        paddingStart: 20,
    },
});