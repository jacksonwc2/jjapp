import Moment from 'moment';

const Util = {

  /**
    * Retorna a data em uma string formatada
    * 
    * @param date
    * @param format //default 'DD/MM/YYYY'
    */
  dateToString: function (date, format) {
    return Moment(date).format(format || 'DD/MM/YYYY');
  },

  parseDate: function (dateString, format) {
    return Moment(dateString, format || 'DD/MM/YYYY');
    // return Moment(date).format(format || 'DD/MM/YYYY');
  },

  formatDate: function (string, format) {

    var ss = Moment(string, "YYYY-MM-DD");
    return Moment(ss).format(format || 'DD/MM/YYYY');
  },

  /**
    * Retorna true quando o obj for null
    * 
    * @param obj
    */
  isEmpty: function (obj) {
    return obj == null;;
  },

  /**
   * Função responsavel por formatar datas para exibir na 
   * listagem dos eventos de acordo com regras de negocio.
   */
  montarInformacaoDate: function (inicio, fim) {

    var dataInicio = Util.dateToString(new Date(inicio));
    var dataFim = Util.dateToString(new Date(fim));

    return dataInicio + (dataInicio != dataFim ? ' até ' + dataFim : '');
  },

  /**
    * Retorna true quando o obj for null
    * 
    * @param obj
    */
  isNullorEmpty: function (obj) {
    return obj == null || obj == '';
  }

}

export default Util;