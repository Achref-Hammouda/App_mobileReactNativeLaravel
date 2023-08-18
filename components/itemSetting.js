import { Text, TextInput, View, StyleSheet } from "react-native";
import Button from "./Button";
import axios from "axios";
import { BASE_URL } from './index';
import { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";

function Update() {
    const route = useRoute();
    const champ = route.params?.champ;
    const user = route.params?.user;
    const [value, setValue] = useState('')
    function sendData() {

        axios.put(`${BASE_URL}/api/users/${user.id}/${champ.FunUrl}`, {
            value: value,

        }).then(res => {
            alert(res.data.message);
            console.log(res.status);
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }

    return (
        <View style={{ paddingHorizontal: 20 }}>

            <Text> {champ.text} </Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={text => setValue(text)}

            />
            {/*<Text>Mot de passe </Text>
            <TextInput

    />*/}
            <Button onPress={sendData} >
                <Icon name="save" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Enregistrer</Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({

    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
    },
});
export default Update;