import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        height: 45,
        borderRadius: 5,
        marginHorizontal: '20%',
        marginVertical: 10,
        backgroundColor: 'rgb(42, 55, 68)',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

const Button = (props) => {
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>

            {props.children}

        </TouchableOpacity>
    );
}

export default Button;