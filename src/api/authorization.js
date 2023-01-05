import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

var mock = new MockAdapter(axios);

mock.onPost("/users").reply(function (config) {
    let credentials = JSON.parse(JSON.parse(config.data).body);
    if('test@test.com' === credentials.email && '12345678' === credentials.password) {
        return [
            200,
            { status: "success", id: 1 }
        ];
    }else{
        return [
            200,
            { status: "failed"}
        ];
    }
  });

function authorization(userData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData),
        validateStatus: false
    };
    return axios.post("/users", requestOptions);
}

export default authorization;