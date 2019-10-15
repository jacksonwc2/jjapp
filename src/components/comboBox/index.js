import React, { Component } from "react";
import { Content, Item, Label, Icon, Picker } from "native-base";
import styles from "./styles";

class ComboBox extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Atributo a ser mostrado no display do field
     */
    displayField = this.props.displayField || 'descricao';

    /**
    * Atributo a ser utilizado como value do field
    */
    valueField = this.props.valueField || 'id';

    /**
     * Atributo label para componente
     */
    label = this.props.label || 'Data';

    /**
     * Atributo de data contendo lista de objeto com label e value
     * Ex: [{label: 'a', value:'1'}, {label: '2', value:'2'}]
     */
    data = this.props.data || [];

    /**
     * Atributo placeholder para componente
     */
    placeholder = this.props.placeholder || 'Selecione...';

    /**
     * Atributo state value component
     */
    state = {
        value: this.props.value || ''
    };

    /**
     * Confirma a alteração do item selecionado
     */
    onValueChange = (valor) => {

        this.setState({
            value: valor
        });

        if (this.props.onChange instanceof Function) {
            this.props.onChange(valor);
        }
    };

    render() {
        return (
            <Content style={styles.content}>
                <Label style={styles.label}>{this.label}</Label>
                <Item style={styles.item}>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.value}
                        onValueChange={this.onValueChange}
                    >
                        <Item label={this.placeholder || 'Selecionar...'} value="-1" />
                        {this.props.data.map(item => <Item label={item[this.displayField]} key="value" value={String(item[this.valueField])} />)}
                    </Picker>
                </Item>
            </Content>
        );
    }
}

export default ComboBox;