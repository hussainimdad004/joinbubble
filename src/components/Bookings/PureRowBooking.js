import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ONYX_COLOR, PRIMARY_COLOR, LIGHT_GRAY } from '../helpers/colors';
import MyStorage from '../helpers/myStorage';
import WebApi from '../helpers/webApiCalls';

class PureRowBooking extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            parentProfile: undefined
        };
    }

    render() {
        const { item, index, title } = this.props;
        return (
            <>
                <TouchableOpacity
                    activeOpacity={0.9}
                    key={index}
                    onPress={() => { this.openBookingDetails(item.id) }}
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 4,
                        padding: 8
                        // alignItems: "center"
                    }} >

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{
                            flex: 0.50,
                            width: "100%",
                            borderWidth: 0.7,
                            borderColor: ONYX_COLOR
                        }}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={{
                                    height: 120,
                                }}
                                resizeMode='contain'
                            />
                        </View>



                        <View
                            style={{
                                flex: 0.50,
                                marginLeft: 12
                            }}
                        >
                            <Text
                                style={{
                                    color: PRIMARY_COLOR,
                                    fontSize: 14,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                {item.otherUserFullName}
                            </Text>
                            <Text
                                style={{
                                    color: ONYX_COLOR,
                                    fontSize: 11,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                {item.scheduledDuration}
                            </Text>
                            <Text
                                style={{
                                    color: ONYX_COLOR,
                                    fontSize: 12,
                                    marginTop: 6,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                {new Date(item.scheduledStart).toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                    {
                        this.state.parentProfile
                        &&
                        <View
                            style={{
                                flex: 1,
                                marginTop: 8,
                                backgroundColor: '#fff',
                                marginLeft: 12
                            }}
                        >
                            <Text
                                style={{
                                    color: PRIMARY_COLOR,
                                    fontSize: 11,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                Detail of Booking
                            </Text>
                            <Text
                                style={{
                                    color: ONYX_COLOR,
                                    fontSize: 14,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                {this.state.parentProfile.fullName}
                            </Text>
                            <Text
                                style={{
                                    color: ONYX_COLOR,
                                    fontSize: 11,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                {this.state.parentProfile.mobileNumber}
                            </Text>
                            <Text
                                style={{
                                    color: ONYX_COLOR,
                                    fontSize: 12,
                                    marginTop: 6,
                                    fontFamily: 'Quicksand-Bold',
                                }}
                            >
                                {'Address:' + this.state.parentProfile.address.houseNo + ' ' + this.state.parentProfile.address.street + ' ' + this.state.parentProfile.address.town + ' ' + this.state.parentProfile.address.postcode}
                            </Text>
                        </View>
                    }
                </TouchableOpacity>
            </>
        );
    }

    openBookingDetails = (id) => {
        new MyStorage().getUserToken().then(token => {
            if (token) {
                new WebApi().getSingleBookingInfo(token, id).then(result => {
                    if (result && result.data) {
                        this.setState({
                            parentProfile: result.data.parent
                        })
                    }
                }).catch((error) => console.log('Error: ', error));
            }
        })
    }
}

export default PureRowBooking;