import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
var Buffer = require('buffer').Buffer;

export default SuperHerarchi = ({ navigation, route }) => {

    const [congeData, setCongeData] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const user = route.params?.user;

    function sendData(etat, id) {

        axios.put(`${BASE_URL}/api/conges/${id}/etat`, {
            etat: etat,

        }).then(res => {
            alert(res.data.message);
            console.log(res.status);
            getData();
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }

    const getImage = async (imageName) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/get-image/${imageName}`,  // Replace "image.jpg" with the actual image name you want to retrieve
                {
                    responseType: 'arraybuffer',
                }
            );

            let base64ImageData = Buffer.from(response.data, 'binary').toString('base64');

            //setImageData(`data:image/jpeg;base64,${base64ImageData}`);
            return `data:image/jpeg;base64,${base64ImageData}`

        } catch (error) {
            console.error('Error:', error);
            return '../assets/default_image2.png';
        }
    };


    function renderItem({ item }) {

        return (
            <View style={{
                marginBottom: 10,
                backgroundColor: '#fff',
                borderColor: 'gray',
                paddingLeft: 10,
                borderWidth: 1,
                borderRadius: 10,
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={!!item.uri ? { uri: item.uri } : require('../assets/default_image2.png')}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>  {item.user.nom}  {item.user.prenom}</Text>
                        <Text>  {item.user.email}</Text>
                        <Text>  solde :  {item.user.solde_de_conge}</Text>
                    </View>
                </View>

                <Text>Type de congé: {item.type_conge}</Text>
                <Text>Date début: {item.date_debut}</Text>
                <Text>Date fin: {item.date_fin}</Text>
                {item.type_date && <Text>Type date: {item.type_date}</Text>}
                <Text>Description: {item.description}</Text>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                >
                    <Icon
                        name={selectedItemId === item.id ? 'check-square' : 'square-o'}
                        size={20}
                        color={selectedItemId === item.id ? 'green' : 'black'}
                    />
                    <Text style={{ marginLeft: 10 }}>cliquez ici</Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'rgb(0,128,0)', opacity: selectedItemId === item.id ? 1 : 0.5 }]}
                        disabled={!(selectedItemId === item.id)}
                        onPress={() => sendData('validé', item.id)}
                    >
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'rgb(255,0,0)', opacity: selectedItemId === item.id ? 1 : 0.5 }]}
                        disabled={!(selectedItemId === item.id)}
                        onPress={() => sendData('refusé', item.id)}
                    >
                        <Text style={styles.buttonText}>Refuser</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    const getData = () => {
        axios.get(`${BASE_URL}/api/conges/superherar/${user.id}`, {
        }).then(async (res) => {
            const newData = res.data;
            for (const item of newData) {
                if (!!item.user.imageName) {
                    item.uri = await getImage(item.user.imageName);
                } else { item.uri = null; }
            }
            setCongeData(newData);

            console.log(res.status);
        }).catch(error => {
            console.error(error);
        });
    };
    useEffect(() => {
        getData();

    }, []);
    const handleRefresh = () => {
        setRefreshing(true);
        getData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    return (

        <View style={{ flex: 1 }}>

            <View style={styles.container}>

                <Text>congés  demendés </Text>
                <View style={{ height: '95%' }} >
                    <FlatList
                        data={congeData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={['#00aaff']}
                                tintColor="#00aaff"
                                title="Refreshing..."
                                titleColor="#00aaff"
                            />
                        }
                    />
                </View>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,

        //backgroundColor: '#fff',

        //justifyContent: 'center',
        height: '100%'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageContainer: {
        borderRadius: 25, // Rend l'image circulaire en utilisant la moitié de la largeur/hauteur
        overflow: 'hidden', // Masque le contenu qui dépasse du conteneur circulaire
        marginBottom: 2,
        width: 50,
    },
    image: {
        width: 50,
        height: 50,
    },
    button: {
        flexDirection: 'row',
        height: '70%',
        borderRadius: 5,
        marginHorizontal: '5%',
        paddingHorizontal: '8%',
        marginVertical: 8,
        //backgroundColor: 'rgb(42, 55, 68)',
        justifyContent: 'center',
        alignItems: 'center'

    },


    buttonText: {
        color: '#fff',
        fontSize: 16,
    },

});