import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";

import axios from "axios";
import { BASE_URL } from '../components/index';
import { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

function UpdateEmail({ route }) {


    const user = route.params?.user;
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    function sendData() {
        if (
            email.trim() === '') {
            alert('Veuillez saisir votre adresse mail');
            return;
        } if (
            password.trim() === ''
        ) {
            alert('Veuillezsaisir votre mot de passe');
            return;
        } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Veuillez saisir une adresse email valide");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            alert(
                "Votre mot de passe est faux"
            );
            return;
        }

        axios.put(`${BASE_URL}/api/users/${user.id}/email`, {
            email: email,
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
                <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
                <TextInput

                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setemail(text)}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={text => setPassword(text)}
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
export default UpdateEmail;