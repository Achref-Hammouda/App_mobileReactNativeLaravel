
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { BASE_URL } from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const fields = [
    { key: 'nomEmp', label: 'Nom', keyboardType: 'default', icon: 'user' },
    { key: 'prenomEmp', label: 'Prénom', keyboardType: 'default', icon: 'user' },
    { key: 'emailEmp', label: 'Email', keyboardType: 'email-address', icon: 'envelope' },
    { key: 'telephoneEmp', label: 'Téléphone', keyboardType: 'phone-pad', icon: 'phone' },

];

const Inscrit = () => {
    const [formData, setFormData] = useState({
        nomEmp: '',
        prenomEmp: '',
        emailEmp: '',
        telephoneEmp: '',
        passwordEmp: '',
    });

    const clearForm = () => {
        setFormData({
            nomEmp: '',
            prenomEmp: '',
            emailEmp: '',
            telephoneEmp: '',
            passwordEmp: '',
        });
        setSelectedAdminUser(null);
    };

    const [adminUsers, setAdminUsers] = useState([]);
    const [selectedAdminUser, setSelectedAdminUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);



    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        // Fetch admin users from the API
        axios.get(`${BASE_URL}/api/admin-users`)
            .then((response) => {
                if (response.data.success) {
                    setAdminUsers(response.data.users);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    const handleAdminUserChange = (itemValue) => {
        setSelectedAdminUser(itemValue);
    };
    const sendData = () => {
        if (
            formData.nomEmp.trim() === '') {
            alert('Veuillez remplir le nom');
            return;
        } if (
            formData.prenomEmp.trim() === '') {
            alert('Veuillez remplir le prenom');
            return;
        } if (
            formData.emailEmp.trim() === '') {
            alert("Veuillez remplir l'email");
            return;
        } if (
            formData.telephoneEmp.trim() === '') {
            alert('Veuillez remplir le telephone');
            return;
        } if (
            formData.passwordEmp.trim() === ''
        ) {
            alert('Veuillez remplir le mot de passe');
            return;
        } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailEmp)) {
            alert("Veuillez saisir une adresse email valide");
            return;
        }

        if (!/^\d{8}$/.test(formData.telephoneEmp)) {
            alert("Veuillez saisir un numéro de téléphone à 8 chiffres");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.passwordEmp)) {
            alert(
                "Veuillez saisir un mot de passe d'au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
            );
            return;
        }


        axios.post(`${BASE_URL}/api/users`, {
            email: formData.emailEmp,
            nom: formData.nomEmp,
            prenom: formData.prenomEmp,
            telephone: formData.telephoneEmp,
            password: formData.passwordEmp,
            super_herarchie_id: selectedAdminUser,
        }).then(res => {
            clearForm();
            alert(res.data.message);
            console.log(res.status);

        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    };

    const handleChange = (key, value) => {
        setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <KeyboardAvoidingView /*behavior={Platform.OS === 'ios' ? 'padding' : 'height'}*/ style={styles.container}>
                <ImageBackground source={require('../assets/conges.png')} style={styles.backgroundImage}>
                    <View style={styles.containerView}>
                        {fields.map((field) => (
                            <View key={field.key}>
                                <Text style={styles.text}>{field.label}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name={field.icon} size={20} color="#aaa" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder={field.label}
                                        value={formData[field.key]}
                                        onChangeText={(text) => handleChange(field.key, text)}
                                        keyboardType={field.keyboardType}
                                        secureTextEntry={field.secureTextEntry}
                                    />
                                </View>
                            </View>
                        ))}
                        <View key='passwordEmp'>
                            <Text style={styles.text}>Mot de passe</Text>
                            <View style={styles.inputContainer}>
                                <Icon name='lock' size={20} color="#aaa" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Mot de passe'
                                    value={formData['passwordEmp']}
                                    onChangeText={(text) => handleChange('passwordEmp', text)}
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
                        </View>
                        <View /*style={styles.pickerContainer}*/>
                            <Text style={styles.text}>Super Hirarchi</Text>
                            <View style={styles.pickerBorder}>
                                <Picker
                                    selectedValue={selectedAdminUser}
                                    onValueChange={handleAdminUserChange}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select an admin user" value={null} />
                                    {adminUsers.map((user) => (
                                        <Picker.Item key={user.id} label={`${user.nom} ${user.prenom}`} value={user.id} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <Button title="" onPress={sendData}>
                            <Icon name="check" size={20} color="#fff" style={styles.icon} />
                            <Text style={styles.buttonText}>Soumettre</Text>
                        </Button>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    picker: {
        height: 40,
    },
    pickerBorder: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#aaa',

        justifyContent: 'center',
        overflow: 'hidden', // This will hide the borders of the Picker inside the pickerContainer
    },
    containerView: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    text: {
        fontWeight: 'bold',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});

export default Inscrit;
