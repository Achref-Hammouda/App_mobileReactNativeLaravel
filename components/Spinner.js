import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    spinner: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const Spinner = () => {
    return (
        <View style={styles.spinner}>
            <ActivityIndicator size={'large'} />
        </View>
    );
}

export default Spinner; 
