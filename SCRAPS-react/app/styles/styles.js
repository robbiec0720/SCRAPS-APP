import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginTop: '15%',
        height: '100%',
        backgroundColor: '#e1d5c9',
    },
    homeContainer: {
        marginTop: '15%',
        height: '100%',
        backgroundColor: '#e1d5c9',
        flexGrow: 1,
        paddingBottom: 90
    },
    header: {
        padding: 20,
        backgroundColor: '#FA7070',
        width: '100%',
        alignItems: 'center',
    },
    boldtext: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
    },
    backButton: {
        width: '20%',
        marginTop: 5,
        marginLeft: 10,
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    instructionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    instructionsText: {
        fontSize: 20, 
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 28, 
    },
});