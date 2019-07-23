import React from 'react';
import { View, Image, StatusBar } from 'react-native';

export default class Splash extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('AuthConfirm');
        }, 3000);
    }

    render() {
        return (
            <View style={{backgroundColor: '#FF5E3A', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <StatusBar hidden/>
                <Image source={require('../../assets/splash/splash.png')}/>
            </View>
        );
    }
}