import React, { Component } from "react";
import { Content, View, Button, Text } from "native-base";
import InputDate from "../../components/inputDate";
import ComboBox from "../../components/comboBox";
import styles from "./styles";
import Proxy from "../../util/proxy";
import Util from '../../util/util';
import ls from 'local-storage'
/**
 * Pagina de filtros para eventos
 */
class Filtros extends Component {

    //constructor que inicializa objtos na tela
    constructor(props) {

        super(props);
        var me = this;

        this.state = { hide: true };

        //valores default
        me.parametros = {
            dataInicio: Util.dateToString(new Date()),
            dataFim: Util.dateToString(new Date()),
            codigoDepartamento: -1,
            codigoEmpresa: (ls.get('empresaDefault') == null ? [-1] : [ls.get('empresaDefault')])
        };

        me.adquirirDepartamentos();
    }

    //objeto que guarda os departamentos listados na combo
    departamentos = [];

    //objeto que guarda as empresas listados na combo
    empresas = [];

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
            me.setState({ hide: false });
        }

        let falha = function () {
            alert('Falha ao adquirir empresas.');
        }

        Proxy.POST(Proxy.IP_SERVER + 'empresaService/adquirir', null, success, falha);
    };

    /**
     * Evento change para data inicio
     */
    onChangeDataInicio = (value) => {
        this.parametros.dataInicio = Util.dateToString(value);
    };

    /**
     * Evento change para data fim
     */
    onChangeDataFim = (value) => {
        this.parametros.dataFim = Util.dateToString(value);
    };

    /**
     * Evento change para departamento
     */
    onChangeDepartamento = (value) => {
        this.parametros.codigoDepartamento = Number(value);
    };

    /**
     * Evento change para empresa
     */
    onChangeEmpresa = (value) => {
        this.parametros.codigoEmpresa = [Number(value)];
    };

    /**
     * Funcao responsavel por disparar evento
     * onChange da pagina de filtros para pagina principal onde é adquirido
     * novos evendos do server de acordo com parametros de pagina atual. 
     */
    filtrar = () => {
        let me = this;

        if (me.props.onChange instanceof Function) {
            me.props.onChange(me.parametros);
        }
    };

    render() {

        return this.state.hide ? null : (
            <Content padder>
                <View hide={true} style={styles.form}>
                    <InputDate onChange={this.onChangeDataInicio} label='Data Inicial:'></InputDate>
                    <InputDate onChange={this.onChangeDataFim} label='Data Final:'></InputDate>
                    <ComboBox onChange={this.onChangeDepartamento} label='Departamento:' data={this.departamentos}></ComboBox>
                    <ComboBox onChange={this.onChangeEmpresa} label='Igreja:' data={this.empresas} displayField='nomeFantasia'></ComboBox>
                </View>
                <View style={styles.viewBtn}>
                    <Button block bordered success onPress={this.filtrar}>
                        <Text>FILTRAR</Text>
                    </Button>
                </View>
            </Content>
        );
    }
}

export default Filtros;