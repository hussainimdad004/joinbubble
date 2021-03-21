import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { LIGHT_GRAY } from '../components/helpers/colors';
import MyTabItem from './MyTabItem';

class MyTabNavigator extends Component {
    tab_data = [
        { id: 0, route_name: "Search" },
    ];
    constructor(props) {
        super(props);
    }
    render() {
        console.log('coming here')
        return (
            <View style={styles.tab_bar} >
                {/* {
                    this.tab_data.map((item, index) => {
                        return <MyTabItem key={index} nav={this.props.navigation} tab_data={item} index={index} />
                    })
                } */}
            </View>
        )
    }
}
const styles = {
    tab_bar: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: LIGHT_GRAY,
        flexDirection: "row",
        paddingBottom: Platform.OS == 'ios' ? 10 : 6,
        alignItems: "center",
    }
}
export default MyTabNavigator;