import axios from "axios";

//Api call function
const make_API_call = (req_method, path, data = {}) => {
  switch (req_method) {
    case "get":
      return axios
        .get(path)
        .then((res) => res.data)
        .catch((err) => {
          
          throw err.response.data;
        });

    case "post":
      return axios
        .post(path, data)
        .then((res) => res.data)
        .catch((err) => {
          
          throw err.response.data;
        });

    case "put":
      return axios
        .put(path, data)
        .then((res) => res.data)
        .catch((err) => {
          
          throw err.response.data;
        });

    case "delete":
      return axios
        .delete(path)
        .then((res) => res.data)
        .catch((err) => {
          
          throw err.response.data;
        });
    default: throw new Error('invalid type')
  }
};

export default make_API_call;
