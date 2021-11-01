import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ListViewComponent,
    ScrollView,
  } from 'react-native';
  import tailwind from 'tailwind-rn';
  import React, {memo, useState, useCallback} from 'react';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import {StyleSheet} from 'react-native';
  import {linear} from 'react-native/Libraries/Animated/Easing';
  import FastImage from 'react-native-fast-image';
  
  const MainContact = () => {
    const [titles, setTitles] = useState([
      'สอบถามข้อมูลสินค้า ',
      'นัดพบ ',
      'ขอใบเสนอราคา',
      'อื่น ๆ',
    ]);
    const [checked, setChecked] = React.useState('first');
    const Bullet = memo(({name = ''}) => {
      return (
        <TouchableOpacity>
          {titles.map((title, index) => {
            return (
              <Text
                key={index}
                style={tailwind('   font-light text-gray-700 mt-2')}>
                {/* รอทำเป็น radiobutton */}
                {'\u2022'}
                {title}
              </Text>
            );
          })}
        </TouchableOpacity>
      );
    });
    return (
      <ScrollView style={tailwind(' flex-1 bg-white ')}>
        <View style={tailwind('  p-4  ')}>
          <Bullet />
          <View>
            <Text style={tailwind(' text-gray-700 mt-4 text-lg font-medium  ')}>
              รายละเอียด
            </Text>
            <TouchableOpacity
              style={tailwind(
                ' border border-gray-300 rounded-md w-full h-40 mt-4 ',
              )}></TouchableOpacity>
            <TouchableOpacity
              style={tailwind(
                ' bg-gray-100 rounded-md w-full h-10 mt-4 flex flex-row justify-center items-center ',
              )}>
              <FastImage
                style={tailwind('w-6 h-6  rounded-full mr-4 ')}
                source={require('../../image/imgicon.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={tailwind(' text-gray-700 font-medium ')}>
                อัพโหลดรูปภาพ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind(
                ' bg-gray-100 rounded-md w-full h-10 mt-4 flex flex-row justify-center items-center ',
              )}>
              <FastImage
                style={tailwind('w-6 h-6  rounded-full mr-4 ')}
                source={require('../../image/videoicon.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={tailwind(' text-gray-700 font-medium ')}>
              อัพโหลดวีดีโอ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProductLibary')}>
            <Text
              style={tailwind(
                'text-white text-lg font-semibold text-center py-2   ',
              )}>
              ติดต่อเรา
            </Text>
          </TouchableOpacity>
        
      </ScrollView>
    );
  };
  
  export default MainContact;
  const styles = StyleSheet.create({
      // ...
      button: {
        backgroundColor: '#222655',
        borderRadius: 20,
        marginTop: 10,
        marginLeft:10,
        marginRight:10,
      },
      
    });