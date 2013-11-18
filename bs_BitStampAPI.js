/*jslint indent: 2, white: true */
/*globals Logger: false, UrlFetchApp: false, blacksun: true, CryptoJS: false */
var blacksun = blacksun || {};

(function (blacksun) {
  "use strict";
  blacksun.BitStampAPI = function (key, secret, clientId) {
    this.key = key;
    this.secret = secret;
    this.clientId = clientId;
  };
  
  blacksun.BitStampAPI.prototype.bitStampApiBaseUrl = "https://www.bitstamp.net/api/";
  
  blacksun.BitStampAPI.prototype.getTickerData = function () {
    var url = this.bitStampApiBaseUrl + "ticker/",
      response = null,
      json = null,
      data = null;
    
    response = UrlFetchApp.fetch(url);
    json = response.getContentText();
    data = JSON.parse(json);
    
    return data;
  };
  
  blacksun.BitStampAPI.prototype.generateNonce = function() {
    return new Date().getTime().toString();
  };
  
  blacksun.BitStampAPI.prototype.generateSignature = function(nonce) {
    var message = nonce.toString() + this.clientId + this.key;
    return CryptoJS.HmacSHA256(message, this.secret).toString().toUpperCase();
  };
  
  blacksun.BitStampAPI.prototype.generateAuthPackage = function() {
    var nonce = this.generateNonce();
    return {
        nonce: nonce, 
        key: this.key, 
        signature: this.generateSignature(nonce)
      };
  };
  
  blacksun.BitStampAPI.prototype.getBalanceData = function () {
    var url = this.bitStampApiBaseUrl + "balance/",
      bitStampAuthentication = this.generateAuthPackage(),
      response = null,
      json = null,
      data = null;
    
    response = UrlFetchApp.fetch(url, {
      method: "POST", 
      payload: bitStampAuthentication
    });
    json = response.getContentText();
    data = JSON.parse(json);
    
    if (data.error !== undefined) {
      throw data.error.toString();
    }
    
    return data;
  };
  
  blacksun.BitStampAPI.prototype.getTransactionData = function (timeDelta) {
    var url = this.bitStampApiBaseUrl + "user_transactions/",
      bitStampAuthentication = this.generateAuthPackage(),
      response = null,
      json = null,
      data = null,
      dataLen = null,
      i = null;
    
    if (timeDelta !== undefined) {
      url = url + "?timedelta=" + parseInt(timeDelta, 10);
    }
    response = UrlFetchApp.fetch(url, {method: "POST", payload: bitStampAuthentication});
    json = response.getContentText();
    data = JSON.parse(json);
    
    if (data.error !== undefined) {
      throw data.error.toString();
    }
    
    for (dataLen = data.length, i = 0; i < dataLen; i = i + 1) {
      data[i].datetime = new Date(this.parseBitStampDate(data[i].datetime));
    }
    
    return data;
  };
  
  blacksun.BitStampAPI.prototype.parseBitStampDate = function (dateString) {
    var splitDate = dateString.split(" ");
    return Date.parse(splitDate[0] + "T" + splitDate[1] + ".000Z");
  };
  
}(blacksun));