import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ONYX_COLOR } from '../helpers/colors';
import MyStorage from '../helpers/myStorage';
import PureRow from '../helpers/PureRow';
import WebApi from '../helpers/webApiCalls';

class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            local_sitter: []
        };
    }
    componentDidMount() {
        new MyStorage().getUserToken().then(token => {
            if (token) {
                new WebApi().getLocalSitters(token).then(result => {
                    if (result && result.data) {
                        this.setState({
                            local_sitter: result.data
                        })
                    }
                }).catch((error) => console.log('Error: ', error));
            }
        })
    }
    _renderRowItem = ({ item, index }) => {
        //  const {navigate} = this.props.nav;
        const navigate = this.props.navigation

        return (
            <PureRow item={item} index={index} nav={navigate} title="PROMOTIONS" />
        );
    }
    render() {
        return (<View style={{ flex: 1 }}>
            <Text
                style={{
                    color: ONYX_COLOR,
                    fontSize: 22,
                    marginLeft: 20,
                    marginTop: 16,
                    fontFamily: 'Quicksand-Bold',
                }}
            >
                Local Sitters
            </Text>
            <FlatList
                ref={ref => { this.flatList = ref; }}
                disableVirtualization={false}
                data={this.state.local_sitter}
                renderItem={this._renderRowItem}
                keyExtractor={item => item.id + ""}
            />
        </View>
        );
    }
}
export default SearchScreen;