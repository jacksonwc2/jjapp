import React, { Component } from "react";
import { Image, View, Alert, TextInput } from "react-native";
import { SideBar } from "../sidebar/index";
import { Menu } from "../sidebar/menu";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import {
  Container, Button, Text,
  Header,
  Title,
  Content,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form
} from "native-base";
import ls from 'local-storage'
import styles from "./styles";
import Proxy from '../../util/proxy';
import App from '../../App';
import MenuUtil from "../../util/menu";
const logo = require("../../../assets/logo.png");

class Login extends Component {

  constructor(props) {
    super(props);

  }

  state = {
    usuario: null,
    senha: null
  };

  data = {};

  render() {

    return (
      <Container style={styles.content}>
        <Content>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Logar</Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.viewLogo}>
            <Image source={logo} style={styles.logo} />
          </View>
          <Form>
            <Text>Usuario:</Text>
            <View >
              <TextInput style={styles.input}
                placeholder="usuario"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                value={this.state.usuario}
                onChangeText={(text) => {
                  //this.data.usuario = text;
                  this.setState({ usuario: text })
                }} />

            </View>

            <Text>Senha:</Text>
            <View >
              <TextInput style={styles.input} secureTextEntry
                placeholder="Senha"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                value={this.state.senha}
                onChangeText={(text) => {
                  //this.data.usuario = text;
                  this.setState({ senha: text })
                }} />

            </View>

          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.logar()}>
            <Text>Logar</Text>
          </Button>
        </Content>
      </Container>

    );
  }
  triggerChildAlert() {
    console.log("dfdfdf")
    this.refs.SideBar.method();
  }
  logar() {

    let obj = { "login": "admin", "senha": "deusamado" };
    //let obj = { "login": this.state.usuario, "senha": this.state.senha };


    var me = this;

    Proxy.POST(Proxy.IP_SERVER + 'autenticacaoService/autenticar', obj, success, function (ww, ee, rr) {

      Alert.alert(
        'Alerta',
        'Usuario ou senha não confere',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      )
    })




    var me = this;
    function success(ret) {

      ls.set('ticketAcesso', ' ret.ticketAcesso')

      ls.set('admin', true);
      MenuUtil.setMenuAdmin();
      me.props.navigation.navigate("Home")
    }
  }
}




export default Login;