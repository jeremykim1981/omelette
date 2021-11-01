import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import React, { memo } from 'react';
import FastImage from 'react-native-fast-image';

const Loading = memo(() => {
    return (
        <View style={tailwind("bg-white items-center flex-1 justify-center")}>
            <FastImage
                style={tailwind('w-24 h-24 mb-4')}
                source={require('../image/logo.png')}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={tailwind("text-xl text-gray-500")}>รอสักครู่...</Text>
        </View>
    )
})

export default Loading