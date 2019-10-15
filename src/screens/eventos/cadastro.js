import React, { Component } from "react";
import { Image, View, TextInput } from "react-native";
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

import styles from "./styles";
import Proxy from '../../util/proxy';
import InputDate from '../../components/inputDate/';
import ComboBox from "../../components/comboBox";
import Util from "../../util/util";

const logo = require("../../../assets/logo.png");

export default class CadastroEvento extends Component {

    //constructor que inicializa objtos na tela
    constructor(props) {

        super(props);
        var me = this;

        

        var param = this.props.navigation.state.params
        if (param != null) {
            this.state = {


                codigoDepartamento: param.codigoDepartamento,
                codigoEmpresa: param.codigoEmpresa,
                dataFim: Util.parseDate(param.dataFim),
                dataInicio: Util.parseDate(param.dataInicio),
                descricao: param.descricao,
                id: param.id,
                local: param.local,
                titulo: param.titulo
            };
        } else {
            this.state = {
                codigoDepartamento: null,
                codigoEmpresa: null,
                isDialogVisible: false,
                modalVisible: false,
                id: null,
                descricao: '',
                local: '',
                titulo: '',
                departamento: '',
                empresa: '',
                dataInicio: Util.dateToString(new Date()),
                dataFim: Util.dateToString(new Date()),
                isFocused: false,
            };
        }

        me.adquirirDepartamentos();
    }



    //objeto que guarda os departamentos listados na combo
    departamentos = [];

    //objeto que guarda as empresas listados na combo
    empresas = [];

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
    render() {
        const { label, ...props } = this.props;


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
                            <Title>Cad agenda</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Form>

                        <View style={{ paddingTop: 18 }}>
                            <Text >
                                Titulo
                            </Text>
                            <TextInput style={styles.input} required
                                autoCapitalize="none"
                                underlineColorAndroid="transparent"
                                value={this.state.titulo}
                                onChangeText={(text) => {
                                    this.setState({ titulo: text })
                                }}
                            />
                        </View>
                        <View style={{ paddingTop: 18 }}>
                            <Text >
                                Descricao
                                </Text>
                            <TextInput style={styles.input}
                                autoCapitalize="none"
                                underlineColorAndroid="transparent"
                                value={this.state.descricao}
                                onChangeText={(text) => {
                                    this.setState({ descricao: text })
                                }}
                            />
                        </View>

                        <ComboBox onChange={(text) => {
                            this.setState({ codigoEmpresa: text })
                        }} label='Igreja:'
                            data={this.empresas}
                            displayField='nomeFantasia' />

                        <ComboBox onChange={(text) => {
                            this.setState({ codigoDepartamento: text })
                        }} label='Departamento:' data={this.departamentos}></ComboBox>


                        <View style={{ paddingTop: 18 }}>
                            <Text >
                                Local
                                </Text>
                            <TextInput style={styles.input}
                                autoCapitalize="none"
                                underlineColorAndroid="transparent"
                                value={this.state.local}
                                onChangeText={(text) => {
                                    this.setState({ local: text })
                                }}
                            />
                        </View>

                        <InputDate
                            onChange={(text) => {
                                this.setState({ dataInicio: text })
                            }}
                            label='Data Inicial:'
                        />

                        <InputDate onChange={(text) => {
                            this.setState({ dataFim: text })
                        }} label='Data Final:'></InputDate>

                    </Form>
                    <Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.salvar()}>
                        <Text>Salvar</Text>
                    </Button>
                </Content>
            </Container>

        );
    }

    salvar() {

        var state = this.state;
        var me = this;
        
        if (Util.isNullorEmpty(state.titulo)) { alert('Campo obrigatório: Título'); return; }
        if (Util.isNullorEmpty(state.codigoEmpresa) || state.codigoEmpresa == '-1') { alert('Campo obrigatório: Igreja'); return; }
        if (Util.isNullorEmpty(state.codigoDepartamento) || state.codigoDepartamento == '-1') { alert('Campo obrigatório: Departamento'); return; }

        if (Util.isNullorEmpty(state.descricao)) { alert('Campo obrigatório: Descrição'); return; }
        if (Util.isNullorEmpty(state.local)) { alert('Campo obrigatório: Local'); return; }
        if (Util.isNullorEmpty(state.dataInicio)) { alert('Campo obrigatório: Data inicio'); return; }
        if (Util.isNullorEmpty(state.dataFim)) { alert('Campo obrigatório: Data Fim'); return; }

        let obj = {
            "id": state.id,
            "codigoEmpresa": state.codigoEmpresa,
            "codigoDepartamento": state.codigoDepartamento,
            "titulo": state.titulo,
            "descricao": state.descricao,
            "local": state.local,
            "dataInicio": state.dataInicio,
            "dataFim": state.dataFim
        };
        return Proxy.POST(Proxy.IP_SERVER + 'agendaService/salvar', obj, success, function () { alert('falha') })

        function success(ret) {
            
            console.log(ret)
            //me.props.navigation.goBack();
            me.props.navigation.navigate("Eventos")


        }
    }

    /**
    * Function que adquire os departamentos para
    * a combo de departamentos
    */
    adquirirDepartamentos = () => {
        let me = this;

        let success = function (data) {
            me.departamentos = data;
            me.adquirirEmpresas();
        }

        let falha = function () {
            alert('Falha ao adquirir departamentos.');
        }

        Proxy.POST(Proxy.IP_SERVER + 'departamentoService/adquirir', null, success, falha);
    };

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



