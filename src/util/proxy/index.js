import React, { Component } from "react";
import ls from 'local-storage';
import { Toast } from "native-base";
const Proxy = {

    IP_SERVER: 'http://18.222.209.144:8080/',
    /**
      * Realiza request method POST
      *  
      * @param urlRequest 
      * @param parms 
      * @param success 
      * @param falha 
      */
    POST: function (urlRequest, parms, success, falha) {
        this.request('POST', urlRequest, parms, success, falha);
    },

    /**
     * Realiza request method POST
     * 
     * @param urlRequest 
     * @param parms 
     * @param success 
     * @param falha 
     */
    GET: function (urlRequest, parms, success, falha) {
        parms = parms != null ? JSON.stringify(parms) : null;
        this.request('GET', urlRequest, parms, success, falha);
    },

    /**
     * Realiza request method PUT
     * 
     * @param urlRequest 
     * @param parms 
     * @param success 
     * @param falha 
     */
    PUT: function (urlRequest, parms, success, falha) {
        this.request('PUT', urlRequest, parms, success, falha);
    },

    /**
     * Realiza request method DELETE
     * 
     * @param urlRequest 
     * @param parms 
     * @param success 
     * @param falha 
     */
    DELETE: function (urlRequest, parms, success, falha) {
        this.request('DELETE', urlRequest, parms, success, falha);
    },

    /**
     * function que monta request
     * 
     * @param metodo 
     * @param header 
     * @param urlRequest 
     * @param parms 
     * @param success 
     * @param falha 
     */
    request: function (metodo, urlRequest, parms, success, falha) {
        //this.show()
        //debugger
        return fetch(urlRequest, {
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'ticketAcesso': ls.get('ticketAcesso'),
                'sistema': '1'
            },
            body: JSON.stringify(parms)
        }).then((response) => response.json())
            .then((responseJson) => {
                success(responseJson);
            })
            .catch((error) => {
                falha(error);
            });
    },

    show: function () {
        //debugger
        setTimeout(() => {
            Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" }
            })
        }, 2000);

        setTimeout(function () { alert("Hello"); }, 3000);

    }
}

export default Proxy;