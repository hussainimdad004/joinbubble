import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyStorage from '../helpers/myStorage';
import WebApi from '../helpers/webApiCalls';

class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        new WebApi().getLocalSitters().then(result => {
            console.log('Result getLocalSitters:=>', result)
        }).catch((error) => console.log('Error: ', error));
    }
    render() {
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text>search Screen</Text>
        </View>
        );
    }
}
export default SearchScreen;