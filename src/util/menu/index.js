const Menu = {

  setMenuAdmin: function () {
    debugger
    global.menu.push({
      name: "Departamentos",
      route: "Departamento",
      icon: "phone-portrait",
      bg: "#477EEA"

    }, {
        name: "Igreja",
        route: "Empresa",
        icon: "phone-portrait",
        bg: "#477EEA"
      }/*, {
        name: "Cad Eventos",
        route: "CadastroEvento",
        icon: "phone-portrait",
        bg: "#477EEA"
      }*/);
  },

  setMenuUserDefault: function (obj) {
    //ao abrir a pagina de eventos troca o menu como ex
    global.menu = [{
      name: "Agenda",
      route: "Eventos",
      icon: "phone-portrait",
      bg: "#477EEA",
      //types: "3"
    }, {
      name: "Avisos",
      route: "Mensagem",
      icon: "phone-portrait",
      bg: "#477EEA",
      // types: "3"
    }, {
      name: "Contatos",
      route: "Contato",
      icon: "phone-portrait",
      bg: "#477EEA",
      // types: "3"
    }, {
      name: "Pastores",
      route: "Membros",
      icon: "phone-portrait",
      bg: "#477EEA",
      // types: "3"
    }];

    //this.setMenuAdmin()
  },

  setMenuUserAuthenticated: function (obj) {
    return obj == null;
  }
}

export default Menu;