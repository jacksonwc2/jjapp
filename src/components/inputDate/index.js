import React, { Component } from "react";
import { Content, Item, Label, Icon } from "native-base";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Util from '../../util/util';
import { Text } from 'react-native';
import styles from "./styles";


/**
 * https://github.com/mmazzarolo/react-native-modal-datetime-picker
 */
class InputDate extends Component {

    /**
     * Atributo label para componente
     */
    label = this.props.label || 'Data';

    /**
     * Atributo state para tornar picker visivel
     */
    state = {
        isVisible: false
    };

    /**
     * Atributo valor atual do campo
     */
    value = this.props.value;

    /**
     * Setter para atributo value  
     */
    setValue = (value) => { this.value = value };

    /**
     * Getter para atributo value  
     */
    getValue = () => { return this.value };

    /**
     * Setter para atributo isVisible  
     */
    setVisible = (visible) => { this.setState({ isVisible: visible }) };

    /**
     * Getter para atributo isVisible  
     */
    getVisible = () => { return this.isVisible };

    /**
     * Abre picker para selecionar date  
     */
    showPicker = () => { this.setVisible(true) };

    /**
     * Cancela a edicao da data
     */
    cancelPicker = () => { this.setVisible(false) };

    /**
     * Confirma a alteração da data selecionada
     */
    confirmValue = (date) => {
        this.setValue(date);
        this.setVisible(false);

        if (this.props.onChange instanceof Function) {
            this.props.onChange(date);
        }
    };

    render() {

        return (
            <Content padder>

                <Label style={styles.label}>{this.label}</Label>
                <Item style={styles.item}>
                    <Text onPress={this.showPicker} style={styles.text}>{Util.dateToString(this.value)}</Text>
                    <Icon onPress={this.showPicker} style={styles.icon} name="calendar" />
                </Item>

                <DateTimePicker
                    minimumDate={this.props.minimumDate}
                    maximumDate={this.props.maximumDate}
                    date={this.value}
                    isVisible={this.state.isVisible}
                    onConfirm={this.confirmValue}
                    onCancel={this.cancelPicker}
                />
            </Content>
        );
    }
}

export default InputDate;