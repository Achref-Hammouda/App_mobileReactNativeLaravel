import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../components/index';
import * as ImagePicker from 'expo-image-picker';
var Buffer = require('buffer').Buffer;


const Settings = ({ navigation, route }) => {
    const user = route.params?.user;
    const ListSetting = [
        { text: 'Nom', FunUrl: 'nom', value: user.nom },
        { text: 'Prénom', FunUrl: 'prenom', value: user.prenom },
        { text: 'Telephone', FunUrl: 'telephone', value: user.telephone },

    ];

    const [image, setImage] = useState(null);
    const [etatButtonImage, setEtatButtonImage] = useState(false);
    const [super_herarchie, setSuper_herarchie] = useState({});

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [8, 9],
            quality: 1,
        });

        if (!result.canceled) {

            setImage(result.uri);
        }
    };
    const handleImageUpload = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }
        setEtatButtonImage(false);
        // Prepare the image data to be sent to the server
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // Adjust the image type accordingly if needed
            name: 'image.jpg',
        });

        try {
            const response = await axios.post(
                `${BASE_URL}/api/upload-image/${user.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Handle the response from the server
            console.log(response.data);
            alert('Image uploaded successfully.');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to upload image.');
        }
    };
    const [imageData, setImageData] = useState(null);

    const getImage = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/get-image/${user.imageName}`,  // Replace "image.jpg" with the actual image name you want to retrieve
                {
                    responseType: 'arraybuffer',
                }
            );
            console.log(response.status)
            let base64ImageData = Buffer.from(response.data, 'binary').toString('base64');

            setImageData(`data:image/jpeg;base64,${base64ImageData}`);


        } catch (error) {
            console.error('Error:', error);
        }
    };
    function goToUpdatePasswored() {
        navigation.navigate('updatePassword', { user });
    }
    function goToUpdateEmail() {



        navigation.navigate('updateEmail', { user });
    };
    function handleTextPress(champ) {


        navigation.navigate('Parame', { champ, user });
    };
    function getsuperherarchi(id) {
        axios.get(
            `${BASE_URL}/api/users/${id}`,
        ).then(res => {

            setSuper_herarchie(res.data)
        }).catch(error => {
            console.error(error);
        });
    }


    function logout() {
        axios.post(
            `${BASE_URL}/api/logout`,
            { user_id: user.id },).then(res => {
                alert(res.data.message);
                navigation.navigate("page d'acceuil");
            }).catch(error => {
                console.error(error);
            });
    }
    useEffect(() => {
        if (!!user.super_herarchie_id) {
            getsuperherarchi(user.super_herarchie_id);
        }
        if (!!user.imageName) {
            getImage();
        }
    }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setEtatButtonImage(!etatButtonImage)}>
                <View style={styles.imageContainer}>
                    <Image
                        source={!(!image) ? { uri: image } : !!imageData ? { uri: imageData } : require('../assets/default_image2.png')} // Remplacez le chemin par le chemin de votre image
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
            {etatButtonImage && (<View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={styles.button} onPress={pickImage} >
                    <Icon name="image" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleImageUpload} >
                    <Icon name="cloud-upload" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
            </View>)}

            {ListSetting.map((champ, index) => (
                <TouchableOpacity key={index}
                    onPress={() => {
                        handleTextPress(champ);
                    }}>
                    <Text style={styles.text}>{champ.text}: {champ.value}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                onPress={() => {
                    goToUpdateEmail();
                }}>
                <Text style={styles.text}>email: {user.email}</Text>
            </TouchableOpacity>

            <TouchableOpacity
            >
                <Text style={styles.text}>superviseur: {super_herarchie.nom}  {super_herarchie.prenom} </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    goToUpdatePasswored();
                }}>
                <Text style={styles.text}>mot de passe </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={logout} >
                <Icon name="sign-out" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Deconnection</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    imageContainer: {
        borderRadius: 50, // Rend l'image circulaire en utilisant la moitié de la largeur/hauteur
        overflow: 'hidden', // Masque le contenu qui dépasse du conteneur circulaire
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 5,
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white',

    },
    buttonIcon: {
        marginRight: 5,
    },
});

export default Settings;