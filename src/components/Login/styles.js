import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    background: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: 0.9
    },
    gradient: {
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    titleStyle: {
      fontWeight: 'bold',
      fontSize: 35,
      color: 'white',
      marginTop: 80,
      letterSpacing: 2,
      alignSelf: 'center'
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 50
    },
    inputStyle: {
      backgroundColor: 'transparent',
      color: 'white'
    },
    loginButtonStyle: {
      borderRadius: 20,
      borderWidth: 1.5,
      alignItems: 'center',
      height: 40,
      width: '100%'
    },
    loginTextStyle: {
      color: 'white',
      padding: 10
    },
    bottomTextStyle: {
      color: 'rgba(255,255,255,0.8)',
      marginTop: 80,
      alignSelf: 'center',
      fontSize: 12
    },
    loaderStyle: {
      position: 'absolute',
      width: 40,
      height: 39
    },
    authCircleStyle: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      position: 'absolute',
      borderRadius: 20
    }
  });