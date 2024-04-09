import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 35,
    },
    image: {
        width: 300, 
        height: 200,
        resizeMode: 'cover', 
        marginVertical: 10, 
        borderRadius: 10,
    },
    removeButton: {
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
    },
    continueButton: {
        position: 'absolute',
        right: 10,
        top: 70,
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
    },
});