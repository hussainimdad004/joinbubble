import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ONYX_COLOR } from '../helpers/colors';
import MyStorage from '../helpers/myStorage';
import WebApi from '../helpers/webApiCalls';
import PureRowBooking from './PureRowBooking';

class BookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booking_list: []
        };
    }
    componentDidMount() {
        new MyStorage().getUserToken().then(token => {
            if (token) {
                new WebApi().getActiveSummary(token).then(result => {
                    if (result && result.data) {
                        this.setState({
                            booking_list: result.data.confirmedBookings
                        })
                    }
                }).catch((error) => console.log('Error: ', error));
            }
        })
    }
    _renderRowItem = ({ item, index }) => {
        const navigate = this.props.navigation
        return (
            <PureRowBooking item={item} index={index} nav={navigate} title="PROMOTIONS" />
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
                Confirmed Bookings
            </Text>
            <FlatList
                ref={ref => { this.flatList = ref; }}
                disableVirtualization={false}
                data={this.state.booking_list}
                renderItem={this._renderRowItem}
                keyExtractor={item => item.id + ""}
            />
        </View>);
    }
}
export default BookingScreen;