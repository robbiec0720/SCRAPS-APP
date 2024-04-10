import { StyleSheet } from 'react-native';

export const recipeStyles = StyleSheet.create({
    container: {
        marginTop: '15%',
        height: '100%',
        backgroundColor: '#e1d5c9',
        paddingBottom: 80
    },
    scrollContainer: {
        width: '100%',
        padding: 10
    },
    recipeContainer: {
        backgroundColor: '#e1d5c9',
        borderRadius: 10,
        padding: 20,
        margin: 10,
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
});
