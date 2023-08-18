import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { BASE_URL } from '../components/index';

const ModifierEmailPassword = ({ navigation, route }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const email = route.params?.email;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const sumbit = () => {
        if (
            password.trim() === ''
        ) {
            alert('Veuillez remplir le mot de passe');
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            alert(
                "Veuillez saisir un mot de passe d'au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
            );
            return;
        }

        axios.put(`${BASE_URL}/api/update-password`, {
            email: email,
            password: password

        }).then(res => {
            alert(res.data.message);
            console.log(res.status);
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="grey" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword}>
                    <Icon
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="grey"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={sumbit} >
                <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    icon: {
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ModifierEmailPassword;
