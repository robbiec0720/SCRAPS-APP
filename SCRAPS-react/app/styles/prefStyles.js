import { StyleSheet } from 'react-native';

export const prefStyles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 5,
        marginBottom: 70,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: 100,
        backgroundColor: '#e1d5c9'
    },
    scrollContainer: {
        height: '35%', 
        width: '100%', 
        padding: 10,
    },
    table: {
        flex: 1,
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    continueButton: {
        width: '20%',
        marginTop: 5,
        marginLeft: '55%',
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
    },
    removeButton: {
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
    },
    label: {
        flex: 1,
        textAlign: 'left',
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 5,
        padding: 10,
    },
    rightAligned: {
        textAlign: 'right',
    },
});