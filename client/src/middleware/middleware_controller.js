import Axios from "axios";
const localRoute = "/private";
Axios.defaults.headers.common["Cache-Control"] = "no-cache";

class Express {
    async call(functionName, parameters, callback) {
        const results = await Axios.post(localRoute, {
            serviceName: functionName,
            parameters,
        });
        if (callback) {
            callback(results.data);
        }
        return results.data;
    }

    async callAsync(functionName, parameters) {
        const results = await Axios.post(localRoute, {
            serviceName: functionName,
            parameters,
        });
        return results.data;
    }

    getSessionId() {
        return window.sessionStorage.getItem("sessionId");
    }
}

export default new Express();
