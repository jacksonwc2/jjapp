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
  Right,
  Item,

} from "native-base";
//import { TextInputMask } from 'react-native-masked-text'
import styles from "./styles";
import Proxy from '../../util/proxy';
import ls from 'local-storage'
import InputDate from '../../components/inputDate/';

import ComboBox from "../../components/comboBox";
import Util from "../../util/util";
import Iconx from 'react-native-vector-icons/FontAwesome';
export default class Membros extends Component {

  state = {
    dataSource: [],
    isDialogVisible: false,
    modalVisible: false,
    descricao: '',
    enviarPush: true,
    isHidden: true,
    codigoPapel: null,
    nome: '',
    codigoEmpresa: null,
    numeroTelefone: null,
    numeroCelular: null,
    dataNascimento: null,
    data: [],
    dataBackup: [],
  }

  empresas = [];
  papel = [];
  constructor(props) {
    super(props);
    this.buscar();
    this.adquirirEmpresas();
    this.adquirirPapel();

  }

  setSearchText(event) {

    searchText = event.nativeEvent.text;
    data = this.state.dataBackup;
    searchText = searchText.trim().toLowerCase();
    data = data.filter(l => {
      return l.nome.toLowerCase().match(searchText);
    });
    this.setState({
      data: data
    });
  }
  data = {};
  render() {

    return (
      <Container >
        <Header  >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Item style={styles.searchBar}>
            <Icon style={styles.icon} active name="search" />
            <TextInput underlineColorAndroid="transparent" style={{ width: 150 }} placeholder="Pesquisar..."
              onChange={this.setSearchText.bind(this)} />
            <Icon style={styles.icon} name="close" onPress={() => this.pesquisa.current.clear()} />
          </Item>

          <Body>
            <Title></Title>
          </Body>
          <Right>
            {ls.get('admin') ?
              <Button transparent onPress={() => this.novoDepartamento()}>
                <Iconx name="plus" />
              </Button> : null
            }
          </Right>
        </Header>
        <Content style={{ width: '100%' }}>
          <View style={{ width: '100%', height: 20, flexDirection: 'row' }}>
            <View style={{ width: '25%', backgroundColor: 'powderblue' }} ><Text>
              Nome
                    </Text></View>
            <View style={{ width: '25%', backgroundColor: 'skyblue' }} ><Text>
              codigoPapel
                    </Text></View>
            <View style={{ width: '25%', backgroundColor: 'steelblue' }} ><Text>
              numeroTelefone
                    </Text></View>
            <View style={{ width: '25%', backgroundColor: 'steelblue' }} ><Text>
              numeroCelular
                    </Text></View>
            <View style={{ width: '25%', backgroundColor: 'steelblue' }} ><Text>
              dataNascimento
                    </Text></View>
          </View>
          <List
            dataArray={this.state.data}
            renderRow={data =>
              <ListItem >
                <Body>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '25%', backgroundColor: 'powderblue' }} ><Text>
                      -> {data.nome}
                    </Text></View>
                    <View style={{ width: '25%', backgroundColor: 'powderblue' }} ><Text>
                      -> {data.descricaoPapel}
                    </Text></View>
                    <View style={{ width: '25%', backgroundColor: 'skyblue' }} ><Text>
                      -> {data.numeroTelefone}
                    </Text></View>
                    <View style={{ width: '25%', backgroundColor: 'steelblue' }} ><Text>
                      -> {data.numeroCelular}
                    </Text></View>
                    <View style={{ width: '25%', backgroundColor: 'steelblue' }} ><Text>
                      -> {data.dataNascimento}
                    </Text></View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {ls.get('admin') ?
                      <Button success block style={{ flex: 1, margin: 5 }} onPress={() => this.editar(data)}>
                        <Icon type="FontAwesome" name="save" />
                        <Text>Editar</Text>
                      </Button> : null}
                    {ls.get('admin') ?
                      <Button danger block style={{ flex: 1, margin: 5 }} onPress={() => this.deletar(data)}>
                        <Icon type="FontAwesome" color="red" name="close" />
                        <Text>Excluir</Text>
                      </Button> : null}
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
              <ComboBox onChange={(text) => {
                this.setState({ codigoEmpresa: text })
              }} label='Igreja:'
                data={this.empresas}
                displayField='nomeFantasia' />

              <ComboBox onChange={(text) => {
                this.setState({ codigoPapel: text })
              }} label='Papel:'
                data={this.papel}
                displayField='descricao' />
              <InputDate
                onChange={(text) => {
                  this.setState({ dataNascimento: text })
                }}
                label='Data nascimento:'
              />

              <View style={{ marginTop: 20 }}>
                <View>
                  <View style={{ paddingTop: 18 }}>
                    <Text >
                      Nome
                      </Text>
                    <TextInput style={styles.input}
                      placeholder="Nome"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.nome}
                      onChangeText={(text) => {
                        this.data.nome = text;
                        this.setState({ nome: text })
                      }} />
                  </View>
                  <View style={{ paddingTop: 18 }}>
                    <Text >
                      Telefone
              </Text>
                    <TextInput style={styles.input}
                      placeholder="Telefone"
                      type={'cel-phone'}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.numeroTelefone}
                      onChangeText={(text) => {
                        this.setState({ numeroTelefone: text })
                      }}
                    />
                  </View>
                  <View style={{ paddingTop: 18 }}>
                    <Text >
                      Celular
                </Text>
                    <TextInputMask style={styles.input}
                    type={'cel-phone'}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.numeroCelular}
                      onChangeText={(text) => {
                        this.setState({ numeroCelular: text })
                      }}
                    />
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

    this.setState({ id: null })
    this.setState({ codigoEmpresa: null })
    this.setState({ codigoPapel: null })
    this.setState({ nome: null })
    this.setState({ codigoEmpresa: null })
    this.setState({ numeroTelefone: null })
    this.setState({ numeroCelular: null })
    this.setState({ dataNascimento: Date() })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  editar(data) {

    this.setModalVisible(!this.state.modalVisible);
    this.data = data;

    this.setState({ id: data.id })
    this.setState({ codigoEmpresa: data.codigoEmpresa })
    this.setState({ codigoPapel: data.codigoPapel })
    this.setState({ nome: data.nome })
    this.setState({ codigoEmpresa: data.codigoEmpresa })
    this.setState({ numeroTelefone: data.numeroTelefone })
    this.setState({ numeroCelular: data.numeroCelular })
    this.setState({ dataNascimento: data.dataNascimento })
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
    Proxy.POST(Proxy.IP_SERVER + 'membroService/deletar', data.id, success, function () {
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
    var state = this.state;
    if (Util.isNullorEmpty(state.codigoEmpresa)) { alert('Campo obrigatório: Empresa'); return; }

    if (Util.isNullorEmpty(state.nome)) { alert('Campo obrigatório: Nome'); return; }

    if (Util.isNullorEmpty(state.codigoPapel)) { alert('Campo obrigatório: codigoPapel'); return; }


    let obj = {
      "id": state.id,
      "codigoPapel": state.codigoPapel,
      "nome": state.nome,
      "codigoEmpresa": state.codigoEmpresa,
      "numeroTelefone": state.numeroTelefone.replace(/[^0-9]/g, ''),
      "numeroCelular": state.numeroCelular.replace(/[^0-9]/g, ''),
      "dataNascimento": state.dataNascimento,
    };

    var me = this;
    var success = function (ret) {
      me.setModalVisible(!me.state.modalVisible);
      me.buscar();
    }
    Proxy.POST(Proxy.IP_SERVER + 'membroService/salvar', obj, success, function () { alert('falha') })

  }

  buscar() {
    let obj = { 

    };

    var me = this;
    var success = function (ret) {

      me.setState({ dataSource: ret })
      me.setState({ data: ret })
      me.setState({ dataBackup: ret })

    }
    Proxy.POST(Proxy.IP_SERVER + 'membroService/adquirir', obj, success,
      function (d, ee, rr) {
        alert('falha')
      })

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

  adquirirPapel = () => {
    let me = this;

    let success = function (data) {
      me.papel = data;
    }

    let falha = function () {
    }

    Proxy.POST(Proxy.IP_SERVER + 'papelService/adquirir', null, success, falha);
  };
}




