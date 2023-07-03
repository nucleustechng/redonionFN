import axios from "axios";
export default axios.create({
    baseURL: "https://redonion-server.herokuapp.com/api/v1",
});
