
import React, { useState, useEffect } from 'react';
import {

    View,
    StyleSheet,
    Image,
    Animated,
    Text
} from 'react-native';

//import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({ navigation }) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0.1));
    const [displayText, setDisplayText] = useState('');
    const name = 'TacticVacay';


    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex <= name.length) {
                setDisplayText(name.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 230);
        //interval();
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000, // Durée de l'animation en millisecondes
                useNativeDriver: false, // Utilisation du moteur natif de l'animation (désactivé pour l'opacité)
            }
        ).start();

        setTimeout(() => {

        }, 3000); // 3000 milliseconds (3 seconds) delay in this example
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/tactic.png')}
                style={{
                    height: 200, width: 200,
                    opacity: fadeAnim
                }}

            />
            <Text style={{ color: 'blue', fontSize: 30, fontWeight: 'bold' }} >{displayText}</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
export default SplashScreen;