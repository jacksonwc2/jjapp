import React, { Component } from "react";
import { Container, Button, Text, Content, Item, Header, Left, Icon, View } from "native-base";
import styles from "./styles";
import Util from "../../util/util";
class Home extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left style={styles.goBack}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Item style={styles.itemTitulo}>
            <Text style={styles.titulo}>Detalhamento</Text>
          </Item>
        </Header>
        <Content style={styles.contentDetalhamento}>
          <Item style={styles.item}>
            <Text style={styles.tituloDetalhamento}>{this.props.navigation.getParam('titulo')}</Text>
          </Item>
          <Item style={styles.item}>
            <Text style={styles.textBold}>Data: </Text><Text>{Util.montarInformacaoDate(this.props.navigation.getParam('dataInicio'), this.props.navigation.getParam('dataFim'))}</Text>
          </Item>
          <Item style={styles.item}>
            <Text style={styles.textBold}>Local: </Text><Text>{this.props.navigation.getParam('local')}</Text>
          </Item>
          <Item style={styles.item}>
            <Text style={styles.textBold}>Igreja: </Text><Text>{this.props.navigation.getParam('codigoEmpresa')}</Text>
          </Item>
          <Item style={styles.item}>
            <Text style={styles.textBold}>Departamento: </Text>
            <Text>{this.props.navigation.getParam('codigoDepartamento')}</Text>
          </Item>
          <Item style={styles.item}>
            <Text style={styles.textBold}>Descrição:</Text>
            <Text>{this.props.navigation.getParam('descricao')}</Text>
          </Item>

        </Content>
      </Container>
    );
  }
}

export default Home; 