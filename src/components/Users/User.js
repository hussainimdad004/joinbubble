import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import MyStorage from '../helpers/myStorage';
import WebApi from '../helpers/webApiCalls';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useFocusEffect } from '@react-navigation/native';
import { ONYX_COLOR } from '../helpers/colors';

function UserScreen({ }) {
    const [profile_pic, setProfilePic] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('')
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
                    }
                }).catch(error => console.log('Error: ', error));
            });
        }, [])
    );
    console.log('propf', profile_pic)
    return (<View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Avatar
                size={120}
                rounded
                source={profile_pic != '' ? { uri: profile_pic } : ' '}
                activeOpacity={0.7}
                onPress={() => { }}
                containerStyle={{
                    flex: 1,
                    position: 'absolute',
                    backgroundColor: profile_pic != '' ? 'transparent' : ONYX_COLOR
                }}
            >
            </Avatar>
        </View>
        <View style={{ marginTop: 150, marginHorizontal: 40 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text>Name: </Text><Text>{name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text>Contact: </Text><Text>{phone}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text>Email: </Text><Text>{email}</Text>
            </View>
        </View>
    </View>);
}
export default UserScreen;