import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default HistoSold = ({ navigation, route }) => {

    const goToCongeFormPage = () => {
        navigation.navigate('demande', { user });
    };
    const [congeData, setCongeData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const user = route.params?.user;
    const [solde_de_conge, setSolde_de_conge] = useState(user.solde_de_conge);
    function supprimer(id) {
        axios.delete(`${BASE_URL}/api/conges/${id}`).then(res => {
            alert(res.data.message);
            getData();

            console.log(res.status);
        }).catch(error => {
            console.error('Error sending data to the server:', error);
        });
    }
    const renderItem = ({ item }) => (
        <View style={{
            marginBottom: 10,
            borderColor: 'gray',
            paddingLeft: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: item.etat === 'validé' ? 'rgba(124,252,0,0.4)' : item.etat === 'refusé' ? 'rgba(255,0,0,0.4)' : '#fff'
        }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>Email: {item.user.email}</Text>
                {item.etat === 'attent' && <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                    <TouchableOpacity
                        style={[styles.buttonicon,]}

                    //onPress={() => modifier(, item)}
                    >
                        <Icon name="pencil" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonicon, { backgroundColor: 'rgb(255,0,0)', }]}

                        onPress={() => supprimer(item.id)}
                    >
                        <Icon name="trash" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                </View>}
            </View>
            <Text>Type de congé: {item.type_conge}</Text>
            <Text>Date début: {item.date_debut}</Text>
            <Text>Date fin: {item.date_fin}</Text>
            {item.type_date && <Text>Type date: {item.type_date}</Text>}
            <Text>Description: {item.description}</Text>

        </View>
    );

    const getData = () => {
        axios.get(`${BASE_URL}/api/conges/user/${user.id}`, {
        }).then(res => {

            setCongeData(res.data)
            setSolde_de_conge(res.data[0].user.solde_de_conge)
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

        }, 2500);
    };
    const reversedCongeData = [...congeData].reverse();
    return (

        <View style={{ flex: 1 }}>
            {/*<Header name={user.email} />*/}
            <View style={styles.container}>
                <View><Text>votre solde est: {solde_de_conge}</Text></View>
                <Text>historique conge </Text>
                <View style={{ height: '85%' }}>
                    <FlatList
                        data={reversedCongeData}
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

                <TouchableOpacity style={styles.button} onPress={goToCongeFormPage} >
                    <Text style={styles.buttonText}>Demande un congé</Text>
                </TouchableOpacity>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,

        // backgroundColor: '#fff',

        justifyContent: 'center',

        height: '100%'
    },
    buttonicon: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        alignSelf: 'center',

        marginRight: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

});