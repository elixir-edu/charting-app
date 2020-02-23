
class ChartDataService{


    translateData( rawData ){
        let rows = rawData.sheets[0].rows;
        let rowIdxs = Object.keys(rows);
        let rowsCnt = rowIdxs.length;

        let priceQtyMap = {};
        let tickArr = [];

        for(let idx=1; idx<rowsCnt; idx++){
            let cells = rows[idx].cells;
            // let tickInfo = {
            //     "time": cells[1].value,
            //     "price": cells[3].value,
            //     "qty": cells[4].value
            // }
            // tickArr.push(tickInfo);

            let price = cells[3].value;
            if(priceQtyMap[price] != undefined){
                priceQtyMap[price] += cells[4].value;
            }
            else{
                priceQtyMap[price] = cells[4].value;
            }

        }

        return priceQtyMap;
    }


}

export default new ChartDataService();