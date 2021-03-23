import React from 'react';
import MyStorage from '../helpers/myStorage';
import SignInStack from './SignInStack';
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
        this.setState({
          token: token
        })
      }
    })
  };
  render() {
    const storage = new MyStorage();
    storage.getUserToken().then(token => {
      if (token) {
        return <MyRouter />
      } else {
        return <SignInStack />
      }
    })
  }
}
export default AuthLoadingScreen;