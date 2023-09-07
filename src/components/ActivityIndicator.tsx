import React from 'react';
import { ActivityIndicator } from 'react-native';

export const CustomActivityIndicator = ({ white = false }) => {

    return (
        <ActivityIndicator style={{
            position: 'absolute',
            backgroundColor: white ? '#fff' : '#d3d3d3',
            opacity: 0.7,
            zIndex: 2,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }} size="large" color={'#000'} />
    )
}
