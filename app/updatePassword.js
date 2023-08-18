import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";

import axios from "axios";
import { BASE_URL } from '../components/index';
import { useState, useEffect } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

function UpdatePassword({ route }) {


    const user = route.params?.user;

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    function sendData() {
        if (
            newPassword.trim() === '') {
            alert('Veuillez saisir votre nouveau mot de passe');
            return;
        } if (
            password.trim() === ''
        ) {
            alert('Veuillezsaisir votre mot de passe');
            return;
        } if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
            alert("Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre minuscule, une lettre majuscule et un chiffre.");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            alert(
                "Votre mot de passe est faux"
            );
            return;
        }

        axios.put(`${BASE_URL}/api/users/${user.id}/password`, {
            newPassword: newPassword,
            password: password,
        }).then(res => {
            alert(res.data.message);
            console.log(res.status);
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }

    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Ancien mot de passe"
                    value={password}
                    onChangeText={text => setPassword(text)}

                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    secureTextEntry={!showPassword}
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

            <TouchableOpacity style={styles.button} onPress={sendData} >
                <Icon name="save" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({


    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    icon: {
        marginRight: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

});
export default UpdatePassword;