import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Button from '../component/Button';
import { useImages } from '../context/imagecontext';
import { cameraStyles } from '../styles/cameraStyles'
import * as MediaLibrary from 'expo-media-library';
import * as Haptics from 'expo-haptics';

/**
 * @module Camera-Screen
 * @description Camera UI flow
 */

/**
 * A screen component for capturing images using the device camera.
 * 
 * @returns {JSX.Element} A screen component containing camera functionality, including single and batch mode image capture, flash control, and image saving.
 */

export default function CameraScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const[image, setImage] = useState([]);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [mode, setMode] = useState('single');
    const cameraRef = useRef(null);
    const { addImage } = useImages();

    /**
     * Effect hook for requesting camera permissions and setting camera permission status.
     * 
     * This effect hook is used to asynchronously request camera permissions and set the state
     * variable `hasCameraPermission` based on the permission status.
     */

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

    /**
     * Function for taking a picture with the camera.
     * 
     * This function utilizes the camera reference (`cameraRef`) to take a picture asynchronously
     * when invoked. It triggers haptic feedback to indicate the action, then captures the picture
     * using the `takePictureAsync` method provided by the camera reference. The captured image URI
     * is then added to the `image` state array based on the current mode ('single' or 'batch').
     * If an error occurs during the picture capture process, it is logged to the console.
     */
    const takePicture = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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

    /**
     * Function for saving captured images.
     * 
     * This function checks if there are any captured images available in the `image` state array.
     * If images are present, it iterates over each image URI and adds them to the image context
     * using the `addImage` function provided by the image context. After successfully adding the
     * images, it clears the `image` state array. If any errors occur during the process, they are
     * logged to the console.
     */
    
    const saveImage = async () => {
        if (image.length > 0) {
            try {
                //const savedImages = await Promise.all(image.map(image => MediaLibrary.createAssetAsync(image)));
                alert('Pictures saved!');
                image.forEach(image => addImage(image));
                setImage([]);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <View style={cameraStyles.container}>
            {mode === 'single' ? (
                <><View style={cameraStyles.header}>
                    <Button size={25} icon={flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} />
                    <Text style={cameraStyles.headerTitle}>Camera</Text>
                </View>
                {image.length === 0 ? (
                    <Camera
                        style={cameraStyles.camera}
                        type={type}
                        flashMode={flash}
                        autoFocus={Camera.Constants.AutoFocus.on}
                        ref={cameraRef}
                    >
                    </Camera>
                ) : (
                    <Image source={{uri: image[0]}} style={cameraStyles.camera}/>
                )}
                {image.length === 0 ? (
                    <View style={cameraStyles.modeSelection}>
                            <TouchableOpacity style={mode === 'single' ? cameraStyles.modeButtonActive : cameraStyles.modeButton} onPress={() => setMode('single')}>
                                <Text style={mode === 'single' ? { color: '#000' } : { color: '#fff' }}>Single</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={mode === 'batch' ? cameraStyles.modeButtonActive : cameraStyles.modeButton} onPress={() => setMode('batch')}>
                                <Text style={mode === 'batch' ? { color: '#000' } : { color: '#fff' }}>Batch</Text>
                            </TouchableOpacity>
                        </View>
                ) : (
                    <View style={cameraStyles.modeSelection}>
                            <TouchableOpacity style={mode === 'single' ? cameraStyles.modeButton : cameraStyles.modeButton}>
                                <Text style={mode === 'single' ? { color: '#fff' } : { color: '#fff' }}></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={mode === 'batch' ? cameraStyles.modeButton : cameraStyles.modeButton}>
                                <Text style={mode === 'batch' ? { color: '#fff' } : { color: '#fff' }}></Text>
                            </TouchableOpacity>
                        </View>
                )}
                <View style={cameraStyles.buttonContainer}>
                    {image.length > 0 ?
                        <View style={cameraStyles.imageActionButtons}>
                            <Button style={cameraStyles.button} size={50} icon='reload' onPress={() => setImage([])} />
                            <Button style={cameraStyles.button} size={50} icon='checkmark-sharp' onPress={saveImage} />
                        </View>
                        :
                        <Button size={100} style={cameraStyles.button} icon='radio-button-on' onPress={takePicture} />}
                </View></>
            ) : (
                <><View style={cameraStyles.header}>
                        <Button size={25} icon={flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} />
                        <Text style={cameraStyles.headerTitle}>Camera</Text>
                    </View><Camera
                        style={cameraStyles.camera}
                        type={type}
                        flashMode={flash}
                        autoFocus={Camera.Constants.AutoFocus.on}
                        ref={cameraRef}
                    >
                    </Camera>
                    {image.length === 0 ? (
                        <View style={cameraStyles.modeSelection}>
                            <TouchableOpacity style={mode === 'single' ? cameraStyles.modeButtonActive : cameraStyles.modeButton} onPress={() => setMode('single')}>
                                <Text style={mode === 'single' ? { color: '#000' } : { color: '#fff' }}>Single</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={mode === 'batch' ? cameraStyles.modeButtonActive : cameraStyles.modeButton} onPress={() => setMode('batch')}>
                                <Text style={mode === 'batch' ? { color: '#000' } : { color: '#fff' }}>Batch</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={cameraStyles.modeSelection}>
                            <TouchableOpacity style={mode === 'single' ? cameraStyles.modeButton : cameraStyles.modeButton}>
                                <Text style={mode === 'single' ? { color: '#fff' } : { color: '#fff' }}></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={mode === 'batch' ? cameraStyles.modeButton : cameraStyles.modeButton}>
                                <Text style={mode === 'batch' ? { color: '#fff' } : { color: '#fff' }}></Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={cameraStyles.buttonContainer}>
                        <View style={cameraStyles.imageCountButton}>
                            <Text style={cameraStyles.imageCountText}>{image.length}</Text>
                        </View>
                        {image.length > 0 ?
                            <View style={cameraStyles.imageActionButtons}>
                                <Button style={cameraStyles.button} size={50} icon='reload' onPress={() => setImage([])} />
                                <Button size={100} style={cameraStyles.button} icon='radio-button-on' onPress={takePicture} />
                                <Button style={cameraStyles.button} size={50} icon='checkmark-sharp' onPress={saveImage} />
                            </View>
                            :
                            <Button size={100} style={cameraStyles.button} icon='radio-button-on' onPress={takePicture} />}
                    </View></>
            )}
        </View>
    );
}
