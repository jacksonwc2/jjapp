import React, { Component } from "react";
import { Text } from "react-native";

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
  View

} from "native-base";

export default class Contato extends Component {


  state = {
    dataSource: [
      { descricao: 'FACEBOOK: iead.smo' },
      { descricao: 'Telefone: (49) 3622-1406' },
      { descricao: 'Endereço: Rua XV de Novembro, 956, centro, São Miguel do Oeste - SC' }],
    isDialogVisible: false,
    modalVisible: false,
    descricao: ''
  };

  constructor(props) {
    super(props);

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
            <Title>Informações/Contatos</Title>
          </Body>
        </Header>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={data =>
              <ListItem >
                <Body>
                  <Text>
                    {data.descricao}
                  </Text>
                </Body>
              </ListItem>}
          />
        
        </Content>
        
      </Container>
    );
  }
}




