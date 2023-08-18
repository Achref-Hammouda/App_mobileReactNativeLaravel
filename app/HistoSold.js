import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/index';

export default HistoSold = ({ navigation, route }) => {

    const goToCongeFormPage = () => {
        navigation.navigate('demande', { user });
    };
    const [congeData, setCongeData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const user = route.params?.user;

    const renderItem = ({ item }) => (
        <View style={{
            marginBottom: 10,
            borderColor: 'gray',
            paddingLeft: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: item.etat === 'valide' ? 'rgba(124,252,0,0.4)' : item.etat === 'refuse' ? 'rgba(255,0,0,0.4)' : '#fff'
        }}>
            <Text style={{ fontWeight: 'bold' }}>Adresse mail: {item.user.email}</Text>
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
    const reversedCongeData = [...congeData].reverse();
    return (

        <View style={{ flex: 1 }}>
            {/*<Header name={user.email} />*/}
            <View style={styles.container}>
                <View><Text>votre solde est: {user.solde_de_conge}</Text></View>
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