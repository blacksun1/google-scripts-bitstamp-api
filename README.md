# google-scripts-bitstamp-api

BitStamp API wrapper for google scripts.

## Usage

    // setup object.
    var bs = new blacksun.BitStampAPI("<insert key>", "<insert secret>", "<insert customer id>");

    // Get public Ticker data (Will not send your authentication information)
    Logger.log(bs.getTickerData());

    // Get personal balance data
    Logger.log(bs.getBalanceData());

    // Get personal transactions
    Logger.log(bs.getTransactionData(31536000)) // 1 year of transactions

