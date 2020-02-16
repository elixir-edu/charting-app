

class AVDataService {


    constructor(){

        this.baseURL = "https://www.alphavantage.co/";
        this.apiKey = "JTZGZK8V8QC0UBWB";

        this.dataMap = { };

        this.volProfileDataMap = {};

        this.charToSymbolMap = {};

    }

    getVolProfileData (symbol, series){
    
        return new Promise((resolve, reject) => {
            let volProfileData = this.volProfileDataMap[symbol];
            if(volProfileData){
                resolve(volProfileData);
            }else{
                this.fetchRawData (symbol, series)
                .then(rawData => {
                    volProfileData = this.generateVolProfileData(rawData);
                    this.volProfileDataMap[symbol] = volProfileData;
                    resolve(volProfileData);
                });
            }
        });

    }

    generateVolProfileData (data){
        let rawData = data["Time Series (5min)"];
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

    fetchRawData(symbol, series){
        
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

            let url = this.formURL(symbol);

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
                "&symbol=" + (symbol || "MSFT") +
                "&interval=" + (interval || "5min") +
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