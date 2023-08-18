import { StyleSheet, Text, View, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASE_URL } from '../components/index';

import Icon from 'react-native-vector-icons/FontAwesome';
const Buffer = require('buffer').Buffer;

export default Admin = ({ route }) => {


    const [usersData, setUsersData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [supervisorUsers, setSupervisorUsers] = useState([]);


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
    function modifierRole(id, role) {

        axios.put(`${BASE_URL}/api/users/${id}/role`, {
            role: role,

        }).then(res => {
            alert(res.data.message);
            getSuperviseur();
            getData();
            console.log(res.status);
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }
    function modifierSuperHierarchyId(id, superHierarchyId) {

        axios.put(`${BASE_URL}/api/users/${id}/superHierarchyId`, {
            super_herarchie_id: superHierarchyId,

        }).then(res => {
            alert(res.data.message);
            getSuperviseur();
            getData();

            console.log(res.status);
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }
    const [selectedRoles, setSelectedRoles] = useState({}); // Utilisez un objet pour stocker les états de rôle
    const [selectedSupervisors, setSelectedSupervisors] = useState({});
    const typeRole = [
        { label: "employe", value: "employe" },
        { label: "superviseur", value: "superviseur" },
        { label: "admin", value: "admin" },
    ];
    function renderItem({ item }) {

        const handleRoleChange = (itemValue) => {
            setSelectedRoles(prevSelectedRoles => ({
                ...prevSelectedRoles,
                [item.id]: itemValue, // Stockez l'état de rôle pour l'élément spécifique dans l'objet
            }));
        };

        const handleSupervisorChange = (itemValue) => {
            setSelectedSupervisors((prevSelectedSupervisors) => ({
                ...prevSelectedSupervisors,
                [item.id]: itemValue,
            }));
        };
        const selectedRole = selectedRoles[item.id] || item.role;
        const selectedSupervisor = selectedSupervisors[item.id] || item.super_herarchie_id;

        return (
            <View
                style={{
                    marginBottom: 10,
                    borderColor: 'gray',
                    paddingLeft: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={!!item.uri ? { uri: item.uri } : require('../assets/default_image2.png')}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>   {item.nom}  {item.prenom}</Text>
                        <Text>   {item.email}</Text>
                    </View>
                </View>
                <Text>role: {item.role}</Text>
                <Text>superviseur: {item.superherarchie.nom}  {item.superherarchie.prenom}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Role: </Text>
                    <View style={{
                        flex: 1,
                        borderWidth: 1,
                        height: 40,
                        borderColor: '#aaa',
                        justifyContent: 'center',
                        marginBottom: 8,
                        marginRight: 5,
                    }}>
                        <Picker
                            selectedValue={selectedRole}
                            onValueChange={handleRoleChange}
                        >
                            {typeRole.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => modifierRole(item.id, selectedRole)} >
                        <Icon name="save" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Supervisor: </Text>
                    <View style={{
                        flex: 1,
                        borderWidth: 1,
                        height: 40,
                        borderColor: '#aaa',
                        justifyContent: 'center',
                        marginBottom: 8,
                        marginRight: 5,
                    }}>
                        <Picker
                            selectedValue={selectedSupervisor}
                            onValueChange={handleSupervisorChange}
                        >
                            {supervisorUsers.map((supuser) => (
                                <Picker.Item key={supuser.id} label={`${supuser.nom} ${supuser.prenom}`} value={supuser.id} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => modifierSuperHierarchyId(item.id, selectedSupervisor)} >
                        <Icon name="save" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    const getData = () => {
        axios.get(`${BASE_URL}/api/users`, {
        }).then(async (res) => {
            const newData = res.data;
            for (const item of newData) {
                if (!!item.imageName) {
                    item.uri = await getImage(item.imageName);
                } else { item.uri = null; }
            }
            setUsersData(newData);
            console.log(res.status);
        }).catch(error => {
            console.error(error);
        });
    };
    function getSuperviseur() {
        axios.get(`${BASE_URL}/api/admin-users`)
            .then((response) => {
                if (response.data.success) {
                    setSupervisorUsers(response.data.users);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    useEffect(() => {
        getSuperviseur();
        getData();

    }, []);
    const handleRefresh = () => {
        setRefreshing(true);
        getSuperviseur();
        getData();
        setTimeout(() => {
            setRefreshing(false);
        }, 3000);
    };
    return (


        <View style={styles.container}>

            <Text>les utilisateur</Text>

            <FlatList
                data={usersData}
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
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,

        //backgroundColor: '#fff',

        justifyContent: 'center',
        height: '100%'
    }, imageContainer: {
        borderRadius: 25, // Rend l'image circulaire en utilisant la moitié de la largeur/hauteur
        overflow: 'hidden', // Masque le contenu qui dépasse du conteneur circulaire
        marginBottom: 5,
        width: 50,
    },
    image: {
        width: 50,
        height: 50,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        alignSelf: 'center',

        marginRight: 5,
    },
    icon: {
        marginRight: 2,
    },

});