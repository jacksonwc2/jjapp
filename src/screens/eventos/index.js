import React, { Component } from "react";
import {
  Container,
  Button,
  Item,
  Content,
  Header,
  Left,
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Text,
  List,
  ListItem,
  View,
  Body,
  Right
} from "native-base";
import { TextInput, Alert } from 'react-native';
import styles from "./styles";
import Filtros from "./filtros";
import Lista from "./lista";
import Proxy from "../../util/proxy";
import Util from "../../util/util";
import ls from 'local-storage'
/**
 * Pagina de Eventos com o conteudo da agenda.
 */
class Eventos extends Component {

  //constructor que inicializa objtos na tela
  constructor(props) {
    debugger
    super(props);
    this.state = { tabActive: 0, listaEventos: [] };
    this.pesquisa = React.createRef();
    this.listaEventos = [];





    this.onChangeFiltros();
    this.render()

  }
  componentWillUnmount() {
    // debugger
  }

  /**
  * Adquire filtros de ./filtros e busca eventos
  * no servidor.
  */
  onChangeFiltros = function (parametros) {
    //debugger
    if (parametros == undefined) {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
debugger
      let year = currentDate.getFullYear();
      //valor default para pesquisa
      parametros = {
        dataInicio: "01/" + (month < 9 ? "0" + month : month) + "/" + year,
        dataFim: Util.dateToString(new Date()),
        codigoDepartamento: -1,
        codigoEmpresa: (ls.get('empresaDefault') == null ? [-1] : [ls.get('empresaDefault')])
      };
    }
    var me = this;

    //adiciona aos parametros a descricao da pesquisa
    parametros.pesquisa = me.pesquisa.value;
    //debugger
    let success = function (ret) {
       debugger
      me.listaEventos = ret;
      me.setState({ tabActive: 0, listaEventos: ret });
      // debugger
    }

    let falha = function () {
      alert('Falha ao adquirir Eventos.');
    }

    Proxy.POST(Proxy.IP_SERVER + 'agendaService/adquirir', parametros, success, falha);
  }
  /**
      * Funcao que abre pagina de detalhamento do evento
      */
  abrirDetalhamento = (data) => {
    //debugger
    this.props.navigation.navigate("Detalhamento", data);
  }

  editar(data) {

    this.props.navigation.navigate("CadastroEvento", data)

  }
  deletar(data) {

    Alert.alert(
      'Deseja Realmente deletar o item ' + data.titulo + '?',
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
      debugger
      if (ret == true) {
        me.onChangeFiltros();
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

    Proxy.POST(Proxy.IP_SERVER + 'agendaService/deletar', data.id, success, function (www, eee, rrr) {
      debugger
      Alert.alert(
        'Não foi possivel excluir, este item deve possuir vínculo com alguma agenda :(',
        '',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      )
    })

  }
  render() {

    return (
      <Container>
        <Header searchBar rounded>
          <Left style={styles.goBack}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Item style={styles.searchBar}>
            <Icon style={styles.icon} active name="search" />
            <TextInput underlineColorAndroid="transparent" style={styles.input} placeholder="Pesquisar..." ref={this.pesquisa} />
            <Icon style={styles.icon} name="close" onPress={() => this.pesquisa.current.clear()} />
          </Item>
        </Header>
        <Item >
          {ls.get('admin') ?
            <Button success block style={{ flex: 1, margin: 5 }}
              onPress={() => this.props.navigation.navigate("CadastroEvento")}>
              <Icon type="FontAwesome" name="save" />
              <Text>Adicionar</Text>
            </Button> : null}
        </Item>
        <Content>
          <Tabs page={this.state.tabActive}>
            <Tab heading={<TabHeading style={styles.tabs}>
              <Text style={styles.tabText}>Eventos</Text>
            </TabHeading>}>
              <Content>

                <Container >
                  <Content>
                    <List
                      dataArray={this.state.listaEventos}
                      renderRow={data =>
                        <ListItem thumbnail
                          onPress={() => this.abrirDetalhamento(data)} >
                          <Left style={styles.left}>
                            <View style={styles.line}></View>
                            <Icon name="calendar" style={styles.lineIcon} />
                            <View style={styles.line}></View>
                          </Left>
                          <Body>
                            <Text numberOfLines={2}>
                              {data.titulo}
                            </Text>
                            <Text numberOfLines={1} note>
                              Localização: {data.local}
                            </Text>
                            <Text numberOfLines={1} note>
                              Data: {Util.montarInformacaoDate(data)}
                            </Text>
                            <Text numberOfLines={1} note>
                              Departamento: {data.codigoDepartamento}
                            </Text>
                            <Text numberOfLines={1} note>
                              Igreja: {data.codigoEmpresa}
                            </Text>
                            {ls.get('admin') ?
                              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                <Button success block style={{ flex: 1, margin: 5 }} onPress={() => this.editar(data)}>
                                  <Icon type="FontAwesome" name="save" />
                                  <Text>Editar</Text>
                                </Button>

                                <Button danger block style={{ flex: 1, margin: 5 }} onPress={() => this.deletar(data)}>
                                  <Icon type="FontAwesome" color="red" name="close" />
                                  <Text>Excluir</Text>
                                </Button>
                              </View> : null}
                          </Body>
                          <Right>
                            <Icon name="arrow-forward" />
                          </Right>
                        </ListItem>
                      } />
                  </Content>
                </Container>
              </Content>
            </Tab>
            <Tab heading={<TabHeading style={styles.tabs}>
              <Text style={styles.tabText}>Filtros</Text>
            </TabHeading>}>
              <Filtros onChange={(obj) => this.onChangeFiltros(obj)}></Filtros>
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

export default Eventos;