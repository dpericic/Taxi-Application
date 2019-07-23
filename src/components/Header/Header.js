import React from 'react';
import { Text, Image } from 'react-native';
import { Header as NBHeader, Left, Body, Right, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const Header = ({logo, navigation}) => {
    return (
        <NBHeader style={{backgroundColor: '#FF5E3A'}} androidStatusBarColor='#D3D3D3'>
            <Left style={{flex: 1}}>
                <Button transparent>
                    <Icon name='bars' style={styles.icon} onPress={() => navigation.openDrawer()}/>
                </Button>
            </Left>
            <Body style={{flex: 1}}>
                { logo && <Image resizeMode='contain' style={styles.logo} source={logo}/>  || <Text style={styles.headerText}>Driver on the way...</Text>}
            </Body>
            <Right style={{flex: 1}}/>
        </NBHeader>
    );
}

export default Header;