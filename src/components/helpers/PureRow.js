import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LIGHT_GRAY, ONYX_COLOR, PRIMARY_COLOR } from './colors';

class PureRow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, index, title } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => { }}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: '#fff',
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 4,
                    padding: 8
                    // alignItems: "center"
                }} >

                <View style={{
                    flex: 0.50,
                    width: "100%",
                    borderWidth: 0.7,
                    borderColor: ONYX_COLOR
                }}>
                    <Image
                        source={{ uri: item.profileImageUrl }}
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
                        {item.fullName}
                    </Text>
                    <Text
                        style={{
                            color: ONYX_COLOR,
                            fontSize: 11,
                            fontFamily: 'Quicksand-Bold',
                        }}
                    >
                        {item.distanceInKm}
                    </Text>
                    <Text
                        style={{
                            color: ONYX_COLOR,
                            fontSize: 10,
                            marginTop: 6,
                            fontFamily: 'Quicksand-Medium',
                        }}
                    >
                        {item.biography}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    openArticleDetail = (index, _title, item) => {

    }
}

export default PureRow;