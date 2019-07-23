import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { styles } from './styles';

const ActionButton = ({handleBooking, disabled}) => {
    return (
        <Button style={disabled ? {...styles.fabContainer, backgroundColor: '#D7D7D7'} : styles.fabContainer} onPress={handleBooking} disabled={disabled}>
            <Text style={styles.btnText}>Book</Text>
        </Button>
    );
}

export default ActionButton;