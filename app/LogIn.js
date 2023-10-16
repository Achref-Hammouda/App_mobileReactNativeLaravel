import { StyleSheet, SafeAreaView, View, TextInput, Text, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import Spinner from '../components/Spinner';
import { BASE_URL } from '../components/index';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


export default LogIn = ({ navigation, route }) => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [pushNotificationToken, setPushNotificationToken] = useState();
    const [etatButton, setEtatButton] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const goSecondPage = () => {
        navigation.navigate('Inscription');
    };
    const goToAdminTab = (user) => {
        navigation.navigate('AdminTab', { screen: 'admin', params: { user } });
        navigation.navigate('AdminTab', { screen: 'Superviseur', params: { user } });
        navigation.navigate('AdminTab', { screen: 'Parametres', params: { screen: 'Parametre', params: { user } } });
        navigation.navigate('AdminTab', { screen: 'Historique Solde', params: { screen: 'HistoSold', params: { user } } });

    };
    const goToSuperherarchiTab = (user) => {
        // navigation.navigate('AdminTab', { screen: 'admin', params: { user } });
        navigation.navigate('SuperherarchiTab', { screen: 'Superviseur', params: { user } });
        navigation.navigate('SuperherarchiTab', { screen: 'Parametres', params: { screen: 'Parametre', params: { user } } });
        navigation.navigate('SuperherarchiTab', { screen: 'Historique Solde', params: { screen: 'HistoSold', params: { user } } });

    };
    function goToEmployeTab(user) {

        navigation.navigate('EmployeTab', { screen: 'Parametres', params: { screen: 'Parametre', params: { user } } });
        navigation.navigate('EmployeTab', { screen: 'Historique Solde', params: { screen: 'HistoSold', params: { user } } });

    };

    const gotoResetPassword = () => {

        navigation.navigate('ResetPassword');
    }
    function buttonSpiner() {
        if (etatButton) {
            return (<Spinner />);
        } else {
            return (<TouchableOpacity style={styles.button} onPress={test}>
                <Icon name="sign-in" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Connexion            </Text>
            </TouchableOpacity>);
        }
    }




    function test() {
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
        setEtatButton(true);

        axios.post(`${BASE_URL}/api/login`, {
            email: email,
            password: password,
            push_token: pushNotificationToken,
        }).then(result => {
            console.log(result.status);
            setEtatButton(false);
            if (result.data.success === true) {
                var user = result.data.user;
                if (result.data.user.role == 'admin') {

                    goToAdminTab(user);
                } else if (result.data.user.role == 'superviseur') {

                    goToSuperherarchiTab(user);
                } else {

                    goToEmployeTab(user);
                }
            } else { alert(result.data.message); }
        }).catch(error => {
            console.error('Error sending data to the server:', error);
            setEtatButton(false);
        });

    }
    const token = route.params?.token;
    useEffect(() => {
        setPushNotificationToken(token);
        console.log(token);
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ImageBackground source={require('../assets/conges.png')} style={styles.backgroundImage} >
                    <Image style={{ start: 10, top: '5%', height: 45, width: 150 }} source={require('../assets/logo.png')} />
                    <View style={styles.containerView}>

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
                        {buttonSpiner()}
                        <TouchableOpacity style={styles.button} onPress={goSecondPage}>
                            <Icon name="user-plus" size={20} color="#fff" style={styles.icon} />
                            <Text style={styles.buttonText}>Créer un compte</Text>
                        </TouchableOpacity  >
                        <View style={styles.textView}>
                            <Text onPress={gotoResetPassword} style={styles.text}>oublier password</Text>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Redimensionne l'image pour qu'elle couvre toute la zone
        justifyContent: 'center', // Centre l'image verticalement et horizontalement
        //height: '100%',

    },
    containerView: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
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

    textView: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    text: {
        fontWeight: 'bold',
        justifyContent: 'center',
        textDecorationLine: 'underline',
        fontSize: 17

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

