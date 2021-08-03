class Utils {

    convertToJsonList(result) {
        let res = [];
        for (var row of result) {
            let item = {};
            for (var obj of row) item[obj.metadata.colName] = obj.value;
            res.push(item);
        }
        return res;
    }

    formatServiceStatus(info) {
        let json = [];
        let lines = (info.split("\n")).slice(2);
        for (var line of lines) {
            let words = line.split(/\s+/);
            let service = {};
            service.status = words[0];
            service.type = words[1];
            service.name = "";
            let hi = 0;
            for (var word of words.slice(2)) {
                hi++;
                service.name += word + " ";
                if (hi == 3) break;
            }
            json.push(service);
        }
        return json;
    }

    // Converts a list of servers to a comma separated string of servers
    convertServerList(serverList) {
        let res = "";
        for (let server of serverList) {
            res += server + ",";
        }
        return res.substring(0, res.length-1);
    }

}

module.exports = new Utils();