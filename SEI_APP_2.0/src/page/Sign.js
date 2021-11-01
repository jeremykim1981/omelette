import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Sign = ({navigation, updateAuthState}) => {
  const signIn = () => {
    //updateAuthState('loggedIn');
    navigation.navigate("ResetPassword")
  };

  const signInAdmin = () => {
    updateAuthState('loggedInAdmin');
  };
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={tailwind(' flex-1 ')}>
      <ImageBackground
        source={require('../image/bg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={tailwind(' flex-1 justify-center')}>
          <View style={tailwind('  flex  items-center ')}>
            <FastImage
              style={tailwind('w-32 h-24  ')}
              source={require('../image/logo.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={tailwind('pt-8   px-8')}>
              <Text
                style={tailwind(' text-white font-semibold uppercase mb-2 ')}>
                เบอร์โทรศัพท์
              </Text>
              <TextInput
                style={tailwind(
                  'border-b border-white text-white w-full mb-2  ',
                )}
                placeholderTextColor={'#ccc'}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="ไม่ต้องใส่ country code เช่น 0819278409"
                keyboardType="numeric"
              />
              <Text
                style={tailwind(' text-white font-semibold uppercase mb-2 ')}>
                รหัสผ่าน
              </Text>
              <TextInput
                style={tailwind(
                  'border-b border-white text-white w-full mb-6  ',
                )}
                
                onChangeText={onChangeText}
                value={text}
                placeholderTextColor={'#ccc'}
                placeholder="อย่างน้อย 8 หลัก เช่น  Asiamed1234"
                keyboardType="default"
              />
              <Text
                style={tailwind(' text-white font-semibold underline  mb-6 ')}>
                ลืมรหัสผ่าน
              </Text>
            <TouchableOpacity style={styles.roundButtonBlue} onPress={signIn}>
              <Text style={tailwind(' text-white font-semibold uppercase')}>
                Login User
              </Text>
            </TouchableOpacity>
            <View style={tailwind(' mt-6 w-full')}>
              <TouchableOpacity
                style={styles.roundButtonOrange}
                onPress={signInAdmin}>
                <Text style={tailwind(' text-white font-semibold uppercase')}>
                  Login Sale
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Sign;
const styles = StyleSheet.create({
  textColor: {
    color: '#6C73C4',
  },

  roundButtonBlue: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    backgroundColor: '#22abdd',
    width: '100%',
    height: 40,
  },
  roundButtonOrange: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    backgroundColor: '#FFA800',
    width: '100%',
    height: 40,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
