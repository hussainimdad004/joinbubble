import React from 'react';
import MyStorage from '../helpers/myStorage';
// import jwt_decode from 'jwt-decode';
import SignInStack from './SignInStack';
import App from '../../MyRouter';
import MyRouter from '../../MyRouter';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: undefined };
  }
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const storage = new MyStorage();
    await storage.getUserToken().then(token => {
      if (token) {
        console.log('TOKEEEEENNNN', token)
        // let decoded_jwt = jwt_decode(token);
        this.setState({
          token: token
        })
      }
    })
  };

  // Render any loading content that you like here
  render() {
    const storage = new MyStorage();
    storage.getUserToken().then(token => {
      if (token) {
        console.log('TOKEEEEENNNN', token)
        // let decoded_jwt = jwt_decode(token);
        return <MyRouter />
      } else {
        return <SignInStack />
      }
    })
  }
}
export default AuthLoadingScreen;