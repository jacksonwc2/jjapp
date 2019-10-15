import React, { Component } from "react";
import { Content, List, Text, ListItem, Left, Right, Icon, View, Body, Button, Container } from "native-base";
import styles from "./stylesLista";
import Util from "../../util/util";

class Lista extends Component {

    //constructor que inicializa objtos na tela
    constructor(props) {
        super(props); debugger
        this.state = { data: this.props.data || [] };
    }

    /**
     * Funcao que abre pagina de detalhamento do evento
     */
    abrirDetalhamento = (data) => {
        this.props.navigation.navigate("Detalhamento", data);
    }

    render() {

        return (
            <Container >
                <Content>
                    <List
                        dataArray={this.state.data}
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
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        } />
                </Content>
            </Container>
        );
    }
}

export default Lista;