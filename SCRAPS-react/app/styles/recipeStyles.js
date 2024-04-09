import { StyleSheet } from 'react-native';

export const recipeStyles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        padding: 10
    },
    recipeContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FA7070',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ingredientsContainer: {
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        marginBottom: 5,
    },
    link: {
        fontSize: 14,
        marginBottom: 5, 
        color: 'blue',
        textDecorationLine: 'underline',
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
