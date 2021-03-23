import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import MyStorage from '../helpers/myStorage';
import WebApi from '../helpers/webApiCalls';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { LIGHT_GRAY, ONYX_COLOR, PRIMARY_COLOR } from '../helpers/colors';

function UserScreen({ }) {
    const [profile_pic, setProfilePic] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [address, SetAddress] = useState('')
    useFocusEffect(
        React.useCallback(() => {
            new MyStorage().getUserToken().then(token => {
                new WebApi().getLoggedInUser(token).then(result => {
                    console.log('Result => ', result);
                    if (result && result.data && result.data) {
                        const { data } = result
                        setName(data.fullName);
                        setPhoneNumber(data.mobileNumber);
                        setEmail(data.email)
                        setProfilePic(result.data.profileImageUrl)
                        setBio(result.data.biography)
                        SetAddress(result.data.address)

                    }
                }).catch(error => console.log('Error: ', error));
            });
        }, [])
    );
    const createItem = (id, name, icon_name) => {
        return (
            <>
                <View
                    key={id}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 40,
                        marginTop: 20,
                        paddingBottom: 10
                    }}>
                    <AntDesign
                        color={PRIMARY_COLOR}
                        name={icon_name}
                        style={{}}
                        size={30}
                    />
                    <Text
                        style={{
                            color: ONYX_COLOR,
                            fontSize: 16,
                            flex: 1,
                            marginLeft: 30,
                            fontFamily: 'Quicksand-Bold',
                        }}>
                        {name}
                    </Text>
                    <View />
                </View>
                <View style={{ width: '100%', height: 1.7, backgroundColor: LIGHT_GRAY }}></View>
            </>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: LIGHT_GRAY }}>
            <View style={{
                height: '25%',
                backgroundColor: PRIMARY_COLOR,
                width: '100%',
                transform: [{ scaleX: 1.3 }],
                borderBottomStartRadius: 500,
                borderBottomEndRadius: 500,
                overflow: 'hidden',
            }} />
            <View style={{
                alignItems: 'center', position: 'absolute', marginTop: '28%',alignSelf: 'center'
            }}>
                <Avatar
                    rounded
                    size={'xlarge'}
                    source={{
                        uri: 'https://via.placeholder.com/48x60?text=',
                    }}
                />
            </View>
            <View style={{
                marginTop: 90,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 20,
                marginHorizontal: 20
            }}>
                {createItem(1, name, 'user')}
                {createItem(1, phone, 'phone')}
                {createItem(1, email, 'mail')}
                {createItem(1, bio, 'infocirlceo')}
                {createItem(1, `${'Address: ' + address.houseNo + ' ' + address.street + ' ' + address.town + ' ' + address.postcode}`, 'infocirlceo')}
            </View>


        </View>
    );
}
export default UserScreen;