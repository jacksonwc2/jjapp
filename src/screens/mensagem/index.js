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
  CheckBox

} from "native-base";

import styles from "./styles";
import Proxy from '../../util/proxy';
import ls from 'local-storage'

import ComboBox from "../../components/comboBox";
import Util from "../../util/util";
import Iconx from 'react-native-vector-icons/FontAwesome';
export default class Mensagem extends Component {

  state = {
    dataSource: [],
    isDialogVisible: false,
    modalVisible: false,
    descricao: '',
    enviarPush: true,
    isHidden: true
  };
  empresas = [];
  constructor(props) {
    super(props);
    this.buscar();
    this.adquirirEmpresas();
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
            <Title>Avisos</Title>
          </Body>
          <Right>
            {ls.get('admin') ?
              <Button transparent onPress={() => this.novoDepartamento()}>
                <Iconx name="plus" />
              </Button> : null
            }
          </Right>
        </Header>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={data =>
              <ListItem >
                <Body>
                <Text style={styles.dataCadastro}>{Util.formatDate(data.dataCadastro)}</Text>
                  
                  <Text style={styles.title}>
                 
                  
                    {data.titulo} 
                    
                    
                  </Text>
                  
                  <Text>
                    {data.descricao}
                  </Text>
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
              <View style={{ marginTop: 20 }}>
                <View>
                  <View style={{ paddingTop: 18 }}>
                    <Text >
                      Titulo
                      </Text>
                    <TextInput style={styles.input}
                      placeholder="Titulo"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.titulo}
                      onChangeText={(text) => {
                        this.data.titulo = text;
                        this.setState({ titulo: text })
                      }} />
                  </View>
                  <View style={{ paddingTop: 18 }}>
                    <Text >
                      Descricao
              </Text>
                    <TextInput style={styles.inputDescicao}
                      numberOfLines={4}
                      multiline={true}
                      //style={{ height:100, textAlignVertical: 'top'}}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      value={this.state.descricao}
                      onChangeText={(text) => {
                        this.setState({ descricao: text })
                      }}
                    />
                  </View>
                  <View style={{ paddingTop: 18 }}>
                    <Text >
                      Enviarpush ao salvar mensagem?
              </Text>
                    <CheckBox
                      value={this.state.enviarPush}
                      onValueChange={() => this.setState({ enviarPush: !this.state.enviarPush })}
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
    this.setState({ descricao: '' })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  editar(data) {

    this.setModalVisible(!this.state.modalVisible);
    this.data = data;

    this.setState({ id: data.id })
    this.setState({ titulo: data.titulo })
    this.setState({ descricao: data.descricao })
    this.setState({ codigoEmpresa: data.codigoEmpresa })

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
    Proxy.POST(Proxy.IP_SERVER + 'mensagemService/deletar', data.id, success, function () {
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

    if (Util.isNullorEmpty(state.titulo)) { alert('Campo obrigatório: Título'); return; }

    if (Util.isNullorEmpty(state.descricao)) { alert('Campo obrigatório: Descrição'); return; }


    let obj = {
      "id": state.id,
      "codigoEmpresa": state.codigoEmpresa,
      "titulo": state.titulo,
      "descricao": state.descricao,

    };

    var me = this;
    var success = function (ret) {
      me.setModalVisible(!me.state.modalVisible);
      me.buscar();
    }
    Proxy.POST(Proxy.IP_SERVER + 'mensagemService/salvar', obj, success, function () { alert('falha') })

  }

  buscar() {
    let obj = {
      "dataCadastro": "01/01/2019",
      "codigoEmpresa": (ls.get('empresaDefault') == null ? [-1] : [ls.get('empresaDefault')])
    };

    var me = this;
    var success = function (ret) { 
      // debugger
      me.setState({ dataSource: ret })

    }
    Proxy.POST(Proxy.IP_SERVER + 'mensagemService/adquirir', obj, success,
      function (d, ee, rr) {
        //debugger
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
      DEBUGGER
      alert('Falha ao adquirir empresas.');
    }

    Proxy.POST(Proxy.IP_SERVER + 'empresaService/adquirir', null, success, falha);
  };
}




