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

export default class Empresa extends Component {

  state = {
    dataSource: [],
    isDialogVisible: false,
    modalVisible: false,
    nomeFantasia: '',
    endereco: null,
    cnpj: null,
    razaoSocial: null,
    id: null
  };

  constructor(props) {
    super(props);
    this.buscar();
  }
  data = {};
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Igreja</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.novaEmpresa()}>
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
                    Igreja: {data.nomeFantasia}
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

              }}>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text>Nome Fantasia:</Text>
                  <View >
                    <TextInput style={styles.input}
                      placeholder="Descrição"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.nomeFantasia}
                      onChangeText={(text) => {
                        this.data.nomeFantasia = text;
                        this.setState({ nomeFantasia: text })
                      }} />

                  </View>
                  <View >
                    <Text>Endereco:</Text>
                    <TextInput style={styles.input}
                      placeholder="Endereço"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.endereco}
                      onChangeText={(text) => {
                        this.data.endereco = text;
                        this.setState({ endereco: text })
                      }} />

                  </View>
                  <View >
                    <Text>Cnpj:</Text>
                    <TextInput style={styles.input}
                      type={'cpf'}
                      placeholder="cnpj"

                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.cnpj}
                      onChangeText={(text) => {
                        this.data.cnpj = text;
                        this.setState({ cnpj: text })
                      }} />
                  </View>
                  <View >
                    <Text>Razão Social:</Text>
                    <TextInput style={styles.input}
                      placeholder="Razão Social"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.razaoSocial}
                      onChangeText={(text) => {
                        this.data.razaoSocial = text;
                        this.setState({ razaoSocial: text })
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
  novaEmpresa() {
    this.setModalVisible(!this.state.modalVisible);
    this.data = {};
    this.setState({
      cnpj: null,
      razaoSocial: null,
      endereco: null,
      nomeFantasia: null,
      id: null
    })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  editar(data) {

    this.setModalVisible(!this.state.modalVisible);
    this.data = data;
    this.setState({
      cnpj: data.cnpj,
      razaoSocial: data.razaoSocial,
      endereco: data.endereco,
      nomeFantasia: data.nomeFantasia
    })

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
    Proxy.POST(Proxy.IP_SERVER + 'empresaService/deletar', data.id, success, function () {
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
      "nomeFantasia": this.state.nomeFantasia,
      "endereco": this.state.endereco,
      "cnpj": this.state.cnpj,
      "razaoSocial": this.state.razaoSocial,
      "id": this.data.id
    };

    var me = this;
    var success = function (ret) {
      me.setModalVisible(!me.state.modalVisible);
      me.buscar();
    }
    Proxy.POST(Proxy.IP_SERVER + 'empresaService/salvar', obj, success, function () { alert('falha') })

  }

  buscar() {
    let obj = { "login": "admin", "senha": "jjadmin" };

    var me = this;
    var success = function (ret) {
      me.setState({ dataSource: ret })

    }
    Proxy.POST(Proxy.IP_SERVER + 'empresaService/adquirir', obj, success, function () { alert('falha') })

  }
}




