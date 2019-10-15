import React, { Component } from "react";
import { Image, View, Modal, Text, TextInput } from "react-native";
import {
  Container, Button, Content, Header,


  Title,


  Icon,

  Body,
  Right,
  CheckBox
} from "native-base";
import styles from "./styles";
import ls from 'local-storage'
import ComboBox from "../../components/comboBox";
import Proxy from '../../util/proxy';
const logo = require("../../../assets/fachada.png");

class Home extends Component {

  state = {
    modalVisible: false
  };
  empresas = [];
  constructor(props) {
    super(props);

    global.logged = ls.get('ticketAcesso') != null;
    this.adquirirEmpresas();
  }

  render() {

    return (
      <Container >
        <Header>

          <Body>
            <Title>IEAD - São Miguel do oeste</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.novoDepartamento()}>
              <Icon name="plus" />
            </Button>
          </Right>
        </Header>
        <View style={styles.viewTitle}>
          <Text>IEAD - São Miguel do oeste</Text>
        </View>
        <View style={styles.viewLogo}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.viewBtn}>
          <Button block primary style={styles.btn} onPress={() => this.props.navigation.navigate("Eventos")}>
            <Text>Buscar Eventos</Text>
          </Button>

        </View>
        <Content>
          <View style={{ marginTop: 50 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
              }}>
              <ComboBox onChange={this.empresaDefault} 
               label='Igreja de sua preferênçia:'
                data={this.empresas}
                displayField='nomeFantasia' />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <Button success block style={{ flex: 1, margin: 5 }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                  <Icon type="FontAwesome" color="red" name="close" />
                  <Text>Fechar</Text>
                </Button>
              </View>
            </Modal>
          </View>
        </Content>
      </Container>
    );
  }
 
  empresaDefault = (value) => {
    //this.parametros.codigoDepartamento = Number(value);
    debugger
   ls.set('empresaDefault',value)
};
  novoDepartamento() {
    this.setModalVisible(!this.state.modalVisible);
    this.data = {};
    this.setState({ descricao: '' })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  /**
     * Function que adquire as empresas para
     * a combo de empresas
     */
  adquirirEmpresas = () => {
    let me = this;

    let success = function (data) {

      me.empresas = data;
    }

    let falha = function () {

      alert('Falha ao adquirir empresas.');
    }

    Proxy.POST(Proxy.IP_SERVER + 'empresaService/adquirir', null, success, falha);
  };
}


export default Home;