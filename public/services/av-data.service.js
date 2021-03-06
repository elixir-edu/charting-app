

class AVDataService {


    constructor(){

        this.baseURL = "https://www.alphavantage.co/";
        this.apiKey = "JTZGZK8V8QC0UBWB";

        this.intervalToSeriesMap = {
            "1 Minute": "TIME_SERIES_INTRADAY", 
            "5 Minutes": "TIME_SERIES_INTRADAY", 
            "15 Minutes": "TIME_SERIES_INTRADAY", 
            "30 Minutes": "TIME_SERIES_INTRADAY", 
            "1 Hour": "TIME_SERIES_INTRADAY", 
            "Daily": "TIME_SERIES_DAILY",
            "Weekly": "TIME_SERIES_WEEKLY", 
            "Monthly": "TIME_SERIES_MONTHLY"
        };

        this.intervalMap = {
            "1 Minute": "1min", 
            "5 Minutes": "5min", 
            "15 Minutes": "15min", 
            "30 Minutes": "30min", 
            "1 Hour": "60min"
        }

        this.dataMap = { };

        this.volProfileDataMap = {};

        this.charToSymbolMap = {};

    }

    getVolProfileData (symbol, interval){
    
        let series = this.intervalToSeriesMap[interval];
        interval = this.intervalMap[interval];

        return new Promise((resolve, reject) => {
            let volProfileData = this.volProfileDataMap[symbol + interval];
            if(volProfileData){
                resolve(volProfileData);
            }else{
                this.fetchRawData (symbol, series, interval)
                .then(rawData => {
                    let key = this.getRawDataKey(series, interval);
                    volProfileData = this.generateVolProfileData(rawData[key]);
                    this.volProfileDataMap[symbol + interval] = volProfileData;
                    resolve(volProfileData);
                });
            }
        });

    }

    generateVolProfileData (rawData){
        /*let rawData = data["Time Series (5min)"];*/
        let resData = {};
        for (let key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                let tickData = rawData[key];
                let price = Math.round( (Number(tickData["2. high"]) + Number(tickData["3. low"])) / 2 );
                resData[price] = (resData[price] || 0) + Number(tickData["5. volume"]);
            }
        }
        return resData;
    }

    getRawDataKey(series, interval){
        let key = "";

        switch(series){
            case "TIME_SERIES_INTRADAY":
                    key = "Time Series (" + interval +")";
                break;
            case "TIME_SERIES_DAILY":
                    key = "Time Series (Daily)";
                break;
            case "TIME_SERIES_WEEKLY": 
                    key = "Weekly Time Series";
                break;
            case "TIME_SERIES_MONTHLY":
                    key = "Monthly Time Series";
                break;
            default: 
                key = "";
                break;
        }

        return key;
    }

    fetchRawData(symbol, series, interval){
        
        return new Promise((resolve, reject) => {
            let seriesData = this.dataMap[series];
        
            if(seriesData){
                let symbolData = seriesData[symbol];
                if(symbolData){
                    resolve(symbolData);
                }
            }else{
                this.dataMap[series] = {};
            }

            let url = this.formURL(symbol, series, interval);

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.dataMap[series][symbol] = data;
                    resolve(data);
                });
        })

    }

    formURL (symbol, series, interval){
        let url = this.baseURL + 
                "query?function=" + (series || "TIME_SERIES_INTRADAY") +
                "&symbol=" + (symbol) +
                "&interval=" + (interval) +
                "&outputsize=full&apikey=" + this.apiKey;

        return url;
    }

    getSymbolList(char){
        return new Promise((resolve, reject) => {
            let symbolList = this.charToSymbolMap[char];
            if(symbolList){
                resolve(symbolList);
            } else {
                let url = this.baseURL +
                    "query?function=SYMBOL_SEARCH" +
                    "&keywords=" + char +
                    "&outputsize=full&apikey=" + this.apiKey;

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        symbolList = this.formSymbolList(data["bestMatches"]);
                        this.charToSymbolMap[char] = symbolList;
                        resolve(symbolList);
                    });
            }
        })
    }
    
    /**
     * Converts raw list to a flat  list
     * @param {Array} rawList 
     */
    formSymbolList(rawList){
        let symbolList = [];
        rawList.forEach(function (entity, index) {
            if(entity["3. type"] == "Equity"){
                symbolList.push({
                    symbol: entity["1. symbol"],
                    name: entity["2. name"],
                    exchange: entity["4. region"]
                });
            };
        });
        return symbolList;
    }

}

export default new AVDataService();