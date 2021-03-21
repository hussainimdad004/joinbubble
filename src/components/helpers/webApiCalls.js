import axios from 'axios';
const _TIME_OUT = 1500
export default class WebApi {
    _BASE_URL = 'http://api-staging.joinbubble.co.uk/'
    USER_LOGIN = 'auth/local'
    LOGGED_IN_USER = 'api/user'
    LOCAL_SITTER = 'api/search'
    ACTIVE_SUMMARY = 'api/booking/activesummary'
    BOOKING_INFO = 'api/booking/'

    async sendGetRequest(_url, custom_headers) {
        _url = this._BASE_URL + _url;
        let _headers = custom_headers;
        try {
            let response = undefined
            response = await axios.get(_url, {
                timeout: _TIME_OUT,
                headers: _headers
            });
            console.log('API URL: ', _url, 'Response:', response)
            return response;
        } catch (error) {
            console.log('Error ', _url, 'Error: ', error)
            // let err = [];
            // err.error = error.response.data;
            return err;
        }
    }
    async sendPostRequest(_url, _params, custom_headers) {
        _url = this._BASE_URL + _url;
        let _headers = custom_headers;
        if (!_headers) {
            _headers = {};
        }
        _headers["Content-Type"] = "application/json";

        if (!_params) {
            _params = {}
        }
        try {
            let response = await axios({
                method: 'post',
                url: _url,
                data: _params,
                headers: _headers
            });
            console.log('API URL: ', this._BASE_URL + _url)
            console.log('API Response: ', response)
            return response;
        } catch (error) {
            console.log('Error in catch: ', _url, 'Error:', error)
            let err = [];
            err.error = error.response.data;
            return error;
        }
    }
    LoginUser(email, _password) {
        let url = this.USER_LOGIN
        let body = {
            email: email,
            password: _password
        };
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': "*"
        }
        console.log('body', body)
        return this.sendPostRequest(url, body, headers)
    }
    getLoggedInUser(jwt_token) {
        let url = this.LOGGED_IN_USER;
        let headers = {
            "Authorization": 'Bearer ' + jwt_token
        };
        return this.sendGetRequest(url, headers)
    }
    getLocalSitters(jwt_token) {
        let url = this.LOCAL_SITTER;
        let headers = {
            "Authorization": 'Bearer ' + jwt_token
        };
        return this.sendGetRequest(url, headers)
    }
    getActiveSummary(jwt_token) {
        let url = this.ACTIVE_SUMMARY;
        let headers = {
            "Authorization": 'Bearer ' + jwt_token
        };
        return this.sendGetRequest(url, headers)
    }
    getSingleBookingInfo(jwt_token, booking_id) {
        let url = this.BOOKING_INFO + "/" + booking_id;
        let headers = {
            "Authorization": 'Bearer ' + jwt_token
        };
        return this.sendGetRequest(url, headers)
    }
}
