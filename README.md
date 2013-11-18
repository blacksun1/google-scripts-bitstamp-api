# google-scripts-bitstamp-api

BitStamp API wrapper for google scripts.

## Usage

Requires [crypto-js's hmac 256 api](http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha256.js). Before you can use it, you will need to copy the source and crypto's source into your google script project. Once you have it in your project you can use it like so.

    // setup object.
    var bs = new blacksun.BitStampAPI("<insert key>", "<insert secret>", "<insert customer id>");

    // Get public Ticker data (Will not send your authentication information)
    Logger.log(bs.getTickerData());

    // Get personal balance data
    Logger.log(bs.getBalanceData());

    // Get personal transactions
    Logger.log(bs.getTransactionData(31536000)) // 1 year of transactions

