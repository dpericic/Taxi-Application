import React from 'react';
import { Text, View, Image, StatusBar, Animated, Dimensions, Easing, TouchableOpacity, AsyncStorage, Keyboard, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextField } from 'react-native-material-textfield';
import Ripple from '../Ripple/Ripple';
import { styles } from './styles';
import * as firebase from 'firebase';

const { width } = Dimensions.get('window');

const EXPANDED_BUTTON_WIDTH = width - 100;
const COLLAPSED_BUTTON_WIDTH = 40;

const AnimatedRipple = Animated.createAnimatedComponent(Ripple)

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: new Animated.Value(EXPANDED_BUTTON_WIDTH),
      opacity: new Animated.Value(1),
      loaderOpacity: new Animated.Value(0),
      buttonOpacity: new Animated.Value(1),
      rotation: new Animated.Value(0),
      circlePosition: { x: 0, y: 0 },
      scale: new Animated.Value(0),
      circleOpacity: new Animated.Value(0),
      inputAnimation: new Animated.Value(1),
      email: '',
      password: '',
      loading: false
    };
    this._initFirebase();
  }

  _initFirebase = () => {
    if (!firebase.apps.length) {
      const config = {
        apiKey: "AIzaSyBlzQiRbWTsQ8c0PF_aSzZtUmJNlodnSLU",
        authDomain: "test-bcd6e.firebaseapp.com",
        databaseURL: "https://test-bcd6e.firebaseio.com",
        projectId: "test-bcd6e",
        storageBucket: "",
        messagingSenderId: "753142227248",
        appId: "1:753142227248:web:677a0849787eaf4f"
      };

      firebase.initializeApp(config);
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)

    this.state.buttonWidth.addListener(({ value }) => {
      if (value === COLLAPSED_BUTTON_WIDTH) {
        Animated.parallel([
          Animated.timing(this.state.buttonOpacity, {
            toValue: 0,
            duration: 150
          }),
          Animated.timing(this.state.loaderOpacity, {
            toValue: 1,
            duration: 250
          }),
          Animated.loop(Animated.timing(this.state.rotation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
          }))
        ]).start();

        //Animate white circle
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(this.state.circleOpacity, {
              toValue: 1,
              duration: 200
            }),
            Animated.timing(this.state.scale, {
              toValue: 1,
              duration: 1100,
              easing: Easing.linear
            })
          ]).start();
        }, 1000)
      }
    });
  }

  _onSignInPress() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 150
      }),
      Animated.timing(this.state.buttonWidth, {
        toValue: COLLAPSED_BUTTON_WIDTH,
        duration: 300
      }),
      Animated.timing(this.state.inputAnimation, {
        toValue: 0,
        duration: 300,
        delay: 100
      })
    ]).start();

    const { navigate } = this.props.navigation;

    setTimeout(() => {
      navigate('App');
    }, 1700);
  }

  _handleEmail = email => this.setState({email});

  _handlePassword = password => this.setState({password});

  _login = async () => {
    this.setState({loading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this._setToken(JSON.stringify(res.user));
        this.setState({loading: false});
        this._onSignInPress();
      })
      .catch(error => {
        this.setState({loading: false});
        alert(error.message);
      });
  }

  _setToken = async(user) => {
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(user));
    } catch (error) {
      console.warn(error);
    }
  }

  _toggleLoading = () => {
    this.setState({loading: true});

    setTimeout(() => this.props.navigation.navigate('SignUp'), 500);
  }

  render() {
    const inputProps = {
      textColor: 'white',
      baseColor: 'rgba(255,255,255,0.8)',
      tintColor: 'rgba(255,255,255,0.8)'
    }

    const spin = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    const borderColor = this.state.buttonOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0)', 'white']
    })

    const scale = this.state.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    })

    const translateY = this.state.inputAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 60]
    })

    return (
      <View style={styles.container}>
        <Image style={styles.background}
          source={require('../../assets/login/background.png')} />
        <LinearGradient
          colors={['transparent', '#fc5a28']}
          style={styles.gradient} />

        <View style={styles.inputContainer}>
          <Text style={styles.titleStyle}>LOGIN</Text>
          <Animated.View style={{
            opacity: this.state.inputAnimation,
            transform: [{ translateY }]
          }}>
            <TextField
              {...inputProps}
              label='Email'
              style={styles.inputStyle}
              onChangeText={this._handleEmail}
              value={this.state.email}
              onSubmitEditing={()=> this.password.focus()} />
            <TextField
              {...inputProps}
              label='Password'
              secureTextEntry={true}
              style={styles.inputStyle}
              onChangeText={this._handlePassword}
              value={this.state.password}
              ref={(input) => this.password = input} />
          </Animated.View>
          <AnimatedRipple
            onLayout={({ nativeEvent }) => {
              //get button coords for the circle
              const { x, y } = nativeEvent.layout;
              if (this.state.circlePosition.x === 0)
                this.setState({ circlePosition: { x, y } })
            }}
            rippleContainerBorderRadius={20}
            rippleOpacity={0.5}
            onPress={this._login}
            rippleColor={'white'}
            style={{
              marginTop: 80,
              alignSelf: 'center',
              width: this.state.buttonWidth
            }}>

            <Animated.View style={[styles.loginButtonStyle, { borderColor: borderColor }]}>
              <Animated.Text style={[styles.loginTextStyle, { opacity: this.state.opacity }]}>SIGN IN</Animated.Text>
              <Animated.Image style={[
                styles.loaderStyle,
                {
                  opacity: this.state.loaderOpacity,
                  transform: [{ rotate: spin }]
                }]} source={require('../../assets/login/spinner.png')} />

            </Animated.View>
          </AnimatedRipple>
          {this.state.loading && <ActivityIndicator style={{marginTop: 40}} size="large" color="#fff" />}
          <Text style={styles.bottomTextStyle}>Don't have account yet?</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', fontSize: 16 }}>Swipe left to register</Text>
        </View>
        {/* Circle View */}
        <Animated.View style={[styles.authCircleStyle, {
          left: this.state.circlePosition.x + EXPANDED_BUTTON_WIDTH / 2 - 20,
          top: this.state.circlePosition.y + 20,
          transform: [{ scale }],
          opacity: this.state.circleOpacity
        }]} />
      </View>
    );
  }
}