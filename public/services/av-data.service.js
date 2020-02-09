

class AVDataService {


    constructor(){

        this.baseURL = "https://www.alphavantage.co/";

        this.dataMap = { };

        this.volProfileDataMap = {};

    }

    fetchVolProfileData (symbol, series){
    
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
                let tickData = obj[key];
                let price = Math.round( (tickData["2. high"] + tickData["3. low"]) / 2 );
                resData[price] = (resData[price] || 0) + tickData["5. volume"];
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
                "&outputsize=full&apikey=JTZGZK8V8QC0UBWB";

        return url;
    }

}

export default new AVDataService();