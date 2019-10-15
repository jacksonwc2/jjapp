import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button
} from "native-base";
import styles from "./style";
import Menu from "../../util/menu";
import ls from 'local-storage'


const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo.png");

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };

    Menu.setMenuUserDefault();
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={global.menu || []}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
        {global.logged ?
          <Button block primary style={styles.btn} type="clear"  onPress={() => this.sair()}>
            <Text>Sair</Text>
          </Button> : null}
        {global.logged ? null :
          <Button block primary style={styles.btn} onPress={() => this.props.navigation.navigate("Login")}>
            <Text>Logar</Text>
          </Button>}
      </Container>
    );
  }
  sair() {
    console.log('dddd')
    ls.set('admin', false);
    ls.set('ticketAcesso', null)
    Menu.setMenuUserDefault();
    global.logged = false;
    this.props.navigation.navigate("Home")
  }
}

export default SideBar;
