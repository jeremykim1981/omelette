import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import tailwind from 'tailwind-rn';
import React, {memo, useState, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfile = ({navigation, updateAuthState}) => {
  const [profileImage, setProfileImage] = React.useState();
  const onSuccess = e => {
    alert("Save !")
  };

  const [details, setDetails] = useState([
    {title: 'ชื่อ-นามสกุล', text: 'Mr.Asiamed'},
    {title: 'ตำแหน่ง', text: 'ฝ่ายขาย'},
    {title: 'เบอร์โทรศัพท์', text: '0831288535'},
    {title: 'สถานที่', text: 'กรุงเทพฯ ภาคกลาง'},
  ]);

  const onSelectImage = res => {
    if (res.uri != undefined) {
      setProfileImage(res.uri);
    }
  };



  const Title = memo(({title = '', text = '',navigation}) => {
    return (
      <View>
        <View style={tailwind('pt-2   px-8')}>
          <Text
            style={{
              marginBottom: 4,
              color: '#8C8C8C',
            }}>
            {title}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: '500',
              color: '##212757',
            }}>
            {text}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={tailwind(' flex-1 ')}>
      <ScrollView>
        <View style={tailwind(' flex-1 justify-center')}>
          <View style={tailwind('flex  items-center mb-2 mt-8 ')}>
            {profileImage != undefined ? (
              <Image
                style={tailwind('w-32 h-24')}
                resizeMode="contain"
                source={profileImage}
              />
            ) : (
              <FastImage
                style={tailwind('w-32 h-24  ')}
                source={require('../image/user.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}

            <Text
              onPress={() =>
                launchImageLibrary(
                  {mediaType: 'photo', quality: 0.7},
                  onSelectImage,
                )
              }
              style={tailwind('  font-semibold uppercase my-2 ')}>
              แก้ไข
            </Text>
          </View>
          {details.map((detail, index) => {
            return (
              <View key={index}>
                <Title title={detail.title} text={detail.text} index={index} />
              </View>
            );
          })}

          <View
            style={{
              marginHorizontal: 12,
              
            }}>
            <TouchableOpacity
              onPress={onSuccess}
              style={{
                padding: 12,
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 30,
                backgroundColor: '#222655',
                width: '100%',
              }}>
              <Text
                style={tailwind(
                  'text-white w-full  text-center text-base font-bold ',
                )}>
                บันทึก
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 12,
              
            }}>
            <TouchableOpacity
              onPress={()=>updateAuthState('loggedOut')}
                
              style={{
                
                width: '100%',
              }}>
              <Text
                 style={{
                   textDecorationLine:'underline',
                   fontSize:16,
                   fontWeight:'500',
                 textAlign:'center',
                  color: '#2CACE6',
                 
                }}>
               ออกจากระบบ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
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
