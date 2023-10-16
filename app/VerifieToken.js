import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { BASE_URL } from '../components/index';
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

function VerifieToken({ navigation, route }) {
    const gotoModifierEmailPassword = (email) => {

        navigation.navigate('ModifierEmailPassword', { email });
    }
    const email = route.params?.email;
    const [token, setToken] = useState('')
    function sendData() {

        axios.post(`${BASE_URL}/api/verify-token`, {
            email: email,
            token: token

        }).then(res => {
            alert(res.data.message);
            console.log(res.status);
            if (res.data.success) {
                gotoModifierEmailPassword(email);
            }
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }

    return (
        <View style={styles.container}>

            <Text style={{ alignSelf: 'flex-start' }}> Token </Text>

            <View style={styles.inputContainer}>
                <Icon name="key" size={20} color="#aaa" style={styles.icon} />
                <TextInput

                    style={styles.input}
                    placeholder="Token"
                    value={token}
                    onChangeText={text => setToken(text)}

                />
            </View>

            <TouchableOpacity style={styles.button} onPress={sendData} >
                <Icon name="save" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>send</Text>
            </TouchableOpacity >
        </View>
    )
}
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
export default VerifieToken;