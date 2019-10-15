import React, { Component } from "react";
import { View, Modal, Text, TextInput, Alert } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Left,
  Body,
  Right

} from "native-base";

import styles from "./styles";
import Proxy from '../../util/proxy';

export default class Departamento extends Component {

  state = {
    dataSource: [],
    isDialogVisible: false,
    modalVisible: false,
    descricao: ''
  };

  constructor(props) {
    super(props);
    this.buscar();
  }
  data = {};
  render() {
    return (
      <Container >
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Departamentos</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.novoDepartamento()}>
              <Icon type="FontAwesome" name="edit" />
            </Button>

          </Right>
        </Header>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={data =>
              <ListItem >

                <Body>
                  <Text>
                    Departamento: {data.descricao}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <Button success block style={{ flex: 1, margin: 5 }} onPress={() => this.editar(data)}>
                      <Icon type="FontAwesome" name="save" />
                      <Text>Editar</Text>
                    </Button>

                    <Button danger block style={{ flex: 1, margin: 5 }} onPress={() => this.deletar(data)}>
                      <Icon type="FontAwesome" color="red" name="close" />
                      <Text>Excluir</Text>
                    </Button>
                  </View>
                </Body>
                
              </ListItem>}
          />
          <View style={{ marginTop: 50 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text>Departamento:</Text>
                  <View >
                    <TextInput style={styles.input}
                      placeholder="Descrição"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.descricao}
                      onChangeText={(text) => {
                        this.data.descricao = text;
                        this.setState({ descricao: text })
                      }} />

                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button success block style={{ flex: 1, margin: 5 }} onPress={() => this.atualizar()}>
                      <Icon type="FontAwesome" name="save" />
                      <Text>Salvar</Text>
                    </Button>
                    <Button danger block style={{ flex: 1, margin: 5 }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                      <Icon type="FontAwesome" color="red" name="close" />
                      <Text>Cancelar</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </Content>
      </Container>
    );
  }
  novoDepartamento() {
    this.setModalVisible(!this.state.modalVisible);
    this.data = {};
    this.setState({ descricao: '' })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  editar(data) {

    this.setModalVisible(!this.state.modalVisible);
    this.data = data;
    this.setState({ descricao: data.descricao })

  }
  deletar(data) {

    Alert.alert(
      'Deseja Realmente deletar o item ' + data.descricao + '?',
      '',
      [
        { text: 'OK', onPress: () => this.confirmDelete(data) },
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )

  }
  confirmDelete(data) {


    var me = this;
    var success = function (ret) {

      if (ret == true) {
        me.buscar();
      }
      else {
        Alert.alert(
          'Não foi possivel excluir, este item deve possuir vínculo com alguma agenda :(',
          '',
          [
            { text: 'OK' }
          ],
          { cancelable: true }
        )
      }
    }
    Proxy.POST(Proxy.IP_SERVER + 'departamentoService/deletar', data.id, success, function () {
      Alert.alert(
        'Não foi possivel excluir, este item deve possuir vínculo com alguma agenda :(',
        '',
        [
          { text: 'OK', onPress: () => this.confirmDelete(data) }
        ],
        { cancelable: false }
      )
    })

  }
  fechar() {
    this.setModalVisible(!this.state.modalVisible);
  }
  atualizar() {

    let obj = {
      "id": this.data.id,
      "descricao": this.data.descricao
    };
    var me = this;
    var success = function (ret) {
      me.setModalVisible(!me.state.modalVisible);
      me.buscar();
    }
    Proxy.POST(Proxy.IP_SERVER + 'departamentoService/salvar', obj, success, function () { alert('falha') })

  }

  buscar() {
    let obj = { "login": "admin", "senha": "jjadmin" };

    var me = this;
    var success = function (ret) {
      me.setState({ dataSource: ret })

    }
    Proxy.POST(Proxy.IP_SERVER + 'departamentoService/adquirir', obj, success, function () { alert('falha') })

  }
}




