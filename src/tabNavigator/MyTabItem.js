import React, { Component } from 'react';
import { TouchableOpacity, Image, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {selectTab} from '../Redux/actions/ActionsSelectedTab'
const search = require('../../assets/tab_icons/search.png');
const user = require('../../assets/tab_icons/user.png');
const explore = require('../../assets/tab_icons/explore.png');
const search_selected = require('../../assets/tab_icons/search_selected.png');
const user_selected = require('../../assets/tab_icons/user_selected.png');
const explore_selected = require('../../assets/tab_icons/explore_selected.png')
const images = [search, explore,  user];
const images_selected = [search_selected, explore_selected, user_selected];

class MyTabItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateTab_data: [],
            prev_tab_id: 0,
            new_tab_id: undefined

        }
    }
    componentDidMount() {

        this.setState({
            stateTab_data: this.props.tab_data
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    handleBackButton = () => {
        this.props.nav.goBack()
        this.props.selectTab(this.state.prev_tab_id)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    backgroundColor_tab_inactive = "transparent"

    onPressAction = (route_name, id) => {
        const { nav } = this.props;
        this.setState({
            prev_tab_id: this.props.selected_tab_id
        })
        this.props.selectTab(id); //Highlight the selected tab
        nav.navigate(route_name);
    }

    render() {
        const { tab_data, index, nav } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.onPressAction(this.state.stateTab_data.route_name, this.state.stateTab_data.id)}
                style={styles.tab_item}
            >
                {

                    !this.props.is_selected &&
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 0
                    }}
                    >
                        <Image
                            style={[styles.tab_img, { padding: 0 }]}
                            source={images[index]}
                            resizeMode="contain"
                        />
                    </View>
                }
                {

                    this.props.is_selected &&
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: scale(4),
                        marginBottom: 0
                    }}
                    >
                        <Image
                            style={[styles.tab_img, { padding: 0, marginTop: 0 }]}
                            source={images_selected[index]}
                            resizeMode="contain"
                        />
                    </View>
                }
            </TouchableOpacity>
        );
    }
}
const styles = {
    tab_item: {
        flex: 1,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    tab_img: {
        width: 20,
        height: 18,
    }
}

const mapStateToProps = (state, own_props) => {
    const { select_tab, user_data } = state;
    const is_selected = state.select_tab.selected_tab_id === own_props.tab_data.id;

    return {
        is_selected,
        selected_tab_id: select_tab.selected_tab_id,
        user: user_data?.user_info?.user_info
    }
}
const actions = {
    selectTab
}
export default connect(mapStateToProps, actions)(MyTabItem);
