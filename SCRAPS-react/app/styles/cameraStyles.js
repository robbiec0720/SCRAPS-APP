import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
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
        width: '100%',
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
