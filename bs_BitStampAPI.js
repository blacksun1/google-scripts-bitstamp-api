/*jslint indent: 2, white: true */
/*globals Logger: false, UrlFetchApp: false, blacksun: true */
var blacksun = blacksun || {};

(function (blacksun) {
  blacksun.BitStampAPI = {
    bitStampApiBaseUrl: "https://www.bitstamp.net/api/",
    getTickerData: function () {
      var url = this.bitStampApiBaseUrl + "ticker/",
        response = null,
          json = null,
            data = null;
      
      response = UrlFetchApp.fetch(url);
      json = response.getContentText();
      data = JSON.parse(json);
      
      Logger.log(data);
      return data;
    },
    getBalanceData: function (username, password) {
      var url = this.bitStampApiBaseUrl + "balance/",
        bitStampAuthentication = {user: username, password: password},
          response = null,
            json = null,
              data;
      
      response = UrlFetchApp.fetch(url, {method: "POST", payload: bitStampAuthentication});
      json = response.getContentText();
      data = JSON.parse(json);
      
      Logger.log(data);
      return data;
    },
    getTransactionData: function (username, password, timeDelta) {
      var url = this.bitStampApiBaseUrl + "user_transactions/",
        bitStampAuthentication = {user: username, password: password},
          response = null,
            json = null,
              data = null,
                dataLen = null,
                  i = null;
      
      if (timeDelta !== undefined) {
        url = url + "?timedelta=" + parseInt(timeDelta, 10);
      }
      Logger.log(url);
      response = UrlFetchApp.fetch(url, {method: "POST", payload: bitStampAuthentication});
      json = response.getContentText();
      data = JSON.parse(json);
      
      for (dataLen = data.length, i = 0; i < dataLen; i = i + 1) {
        data[i].datetime = new Date(this.parseBitStampDate(data[i].datetime));
      }
      
      Logger.log(data);
      return data;
    },
    parseBitStampDate: function (dateString) {
      var splitDate = dateString.split(" ");
      return Date.parse(splitDate[0] + "T" + splitDate[1] + ".000Z");
    }
  };
}(blacksun));
