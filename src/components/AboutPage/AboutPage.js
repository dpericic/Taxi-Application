import React from "react";
import { View, Text } from "react-native";
import { Container, Header, Left, Body, Right, Button } from "native-base";
import { styles } from './styles';
import Icon from "react-native-vector-icons/FontAwesome";

const AboutPage = ({ navigation }) => {
  return (
    <Container>
      <Header
        style={{ backgroundColor: "#FF5E3A" }}
        androidStatusBarColor="#D3D3D3"
      >
        <Left
          style={{
            flex: 1
          }}
        >
          <Button transparent>
            <Icon
              name="bars"
              style={styles.icon}
              onPress={() => navigation.openDrawer()}
            />
          </Button>
        </Left>
        <Body
          style={{
            flex: 1
          }}
        >
          <Text style={styles.headerText}>About</Text>
        </Body>
        <Right
          style={{
            flex: 1
          }}
        >
          <Icon
            name="home"
            style={styles.icon}
            onPress={() => navigation.navigate("Main")}
          />
        </Right>
      </Header>
      <View style={styles.textWrapper}>
        <Text style={styles.aboutText}>
          Taxi Application used for booking taxi cab drives. Just select your
          pickup and drop-off location, and if there are any drivers in the area,
          they'll come and pick you up.
        </Text>
      </View>
    </Container>
  );
};

export default AboutPage;
