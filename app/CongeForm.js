import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../components/index';
import DateTimePicker from '@react-native-community/datetimepicker';


const DateTimeInput = ({ style, value, onShow, placeholder }) => {
    return (
        <TouchableOpacity style={style} onPress={onShow}>
            <TextInput style={{ color: 'black' }} value={value} editable={false} placeholder={placeholder} />
        </TouchableOpacity>
    );
};
export default CongeForm = ({ route }) => {
    const [date, setDate] = useState(new Date());
    const [showPickDebut, setshowPickDebut] = useState(false);
    const [showPickFin, setshowPickFin] = useState(false);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [description, setDescription] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);


    const onDateDebutChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshowPickDebut(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate =
            tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();

        setDateDebut(fDate);
        console.log(fDate);
    };
    const onDateFinChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshowPickFin(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate =
            tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();

        setDateFin(fDate);
        console.log(fDate);
    };

    const showDatepicker = () => {
        setshowPickDebut(true);
    };
    const showDatepicker1 = () => {
        setshowPickFin(true);
    };

    const today = new Date();
    const user = route.params?.user;

    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
    };
    const typeMemeJour = [
        { label: "Selecter le type de jour ", value: null },
        { label: "Journée", value: "journée" },
        { label: "Demi-jour", value: "demi-jour" },

    ];

    const [selectedValueTypeConge, setSelectedValueTypeConge] = useState(null);
    const typeConge = [
        { label: "Selecter le type de congé", value: null },
        { label: "Payé", value: "payé" },
        { label: "Non-payé", value: "non-payé" },
        { label: "Maladie", value: "maladie" },
        { label: "Maternité", value: "maternité" }
    ];

    const handleValueChangeTypeConge = (itemValue) => {
        setSelectedValueTypeConge(itemValue);
    };
    function sendData() {
        if (
            selectedValueTypeConge === '') {
            alert('Veuillez remplir type de congé');
            return;
        } if (
            dateDebut.trim() === '') {
            alert('Veuillez remplir date de debut');
            return;
        } if (
            dateFin.trim() === '') {
            alert('Veuillez remplir date de fin');
            return;
        } if (
            dateFin < dateDebut) {
            alert('Veuillez une date de fin superier ou égal à la date de déburt');
            return;
        } if (
            dateDebut != '' && dateDebut === dateFin && selectedValue.trim() === '') {
            alert('Veuillez remplir type de date');
            return;
        } if (
            description.trim() === ''
        ) {
            alert('Veuillez remplir description');
            return;
        } if (
            dateDebut !== dateFin) {
            setSelectedValue(null)
        }


        axios.post(`${BASE_URL}/api/conges`, {
            type_conge: selectedValueTypeConge,
            date_debut: dateDebut,
            date_fin: dateFin,
            type_date: selectedValue,
            user_id: user.id,
            description: description,
        }).then(res => {
            alert(res.data.message);

        }).catch(error => {
            console.error('Error sending data to the server:', error);
        })
            ;
    };



    return (
        <ScrollView>
            <View style={{ flex: 1 }}>

                <View style={styles.container}>

                    <Text>type de congé</Text>
                    <View style={styles.input}>
                        <Picker
                            selectedValue={selectedValueTypeConge}
                            onValueChange={handleValueChangeTypeConge}
                        >
                            {typeConge.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                    <Text>de</Text>

                    <DateTimeInput
                        style={styles.input}
                        value={dateDebut}
                        onShow={showDatepicker}
                        placeholder="Date de debut de congé" />
                    {showPickDebut && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="spinner"
                            onChange={onDateDebutChange}
                            minimumDate={today}
                        />
                    )}
                    <Text>à</Text>

                    <DateTimeInput
                        style={styles.input}
                        value={dateFin}
                        onShow={showDatepicker1}
                        placeholder="Date de fin de congé" />
                    {showPickFin && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="spinner"
                            onChange={onDateFinChange}
                            minimumDate={today}
                        />
                    )}

                    {dateDebut != '' && dateDebut === dateFin && (<View>
                        <Text>type jour</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={handleValueChange}
                            >
                                {typeMemeJour.map((option, index) => (
                                    <Picker.Item key={index} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>)
                    }
                    <Text> description</Text>
                    <TextInput
                        style={styles.inputM}
                        placeholder="description"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        multiline
                    />

                    <TouchableOpacity style={styles.button} onPress={sendData} >
                        <Text style={styles.buttonText}>confermer</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        //backgroundColor: '#fff',
        height: '100%'
    },
    input: {
        width: '100%',
        height: 40,
        color: 'black',
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    inputM: {
        width: '100%',
        height: 120,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingHorizontal: 10,
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