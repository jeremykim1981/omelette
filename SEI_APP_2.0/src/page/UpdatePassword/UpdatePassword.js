import {SafeAreaView} from 'react-navigation';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tailwind from 'tailwind-rn';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {memo} from 'react/cjs/react.development';
import DropDownPicker from 'react-native-dropdown-picker';

import Loading from '../Loading';
import FastImage from 'react-native-fast-image';

const UpdatePassword = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  /// section date variable
  const [date, setDate] = useState(new Date());
  const [opendate, setOpendate] = useState(false);
  /// normal variable
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState(null);
  
  const [items, setItems] = useState([
    {label: 'Manager', value: 'Manager'},
    {label: 'Sale', value: 'Sale'},
    {label: 'Technician', value: 'Technician'},
    {label: 'Customer', value: 'Customer'},
  ]);
  const [monthlys, setMonthlys] = useState([
    {label: 'แผนก a', value: 'แผนก a'},
    {label: 'แผนก b', value: 'แผนก b'},
    {label: 'แผนก c', value: 'แผนก c'},
    {label: 'แผนก d', value: 'แผนก d'},
    {label: 'แผนก e', value: 'แผนก e'},
  ]);
  ///ฺBOTTONFILE///

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      showDone();
    }, 2000);
  };

  const showDone = () => {
    setLoading(false);
    setDone(true);
  };

  
  const UserInfo = memo(() => {
    return (
      <View style={{
       backgroundColor:'#EFF6FF',
       padding:14,
       marginTop:10,
      }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          กำหนดรหัสผ่าน
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              กำหนดรหัสผ่าน 8 หลัก
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              ยืนยันรหัสผ่าน 8 หลัก
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          
        </View>
      </View>
    );
  });
  if (loading) return <Loading />;
  if (done)
    return (
        <ScrollView style={tailwind(
            'bg-white  flex-1  ',
          )}>
        <SafeAreaView style={tailwind(
            ' items-center flex-1 justify-center  p-4  ',
          )}>
      
        <Text
          style={{
            color: '#212757',
            fontSize: 18,
            fontWeight: '700',
          }}>
          สร้างบัญชีผู้ใช้สำเร็จ!
        </Text>
        <FastImage
          style={tailwind('w-full h-44 my-4 ')}
          source={require('../../image/newpassword.jpg')}
          resizeMode={FastImage.resizeMode.contain}
        />
         <FastImage
          style={tailwind('w-full h-20 mb-4 ')}
          source={require('../../image/correct.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            color: '#212757',
            fontSize: 18,
            fontWeight: '500',
          }}>
         กำหนดรหัสผ่านของคุณ 
สำเร็จแล้ว!!
        </Text>
        <Text
          style={{
            color: '#212757',
            fontSize: 16,
            marginTop: 10,
          }}>
         สำหรับผู้ใช้งานหมายเลขโทรศัพท์  
        </Text>
        <Text
          style={{
            color: '#212757',
            fontSize: 16,
            marginTop: 10,
          }}>
          0831288535
        </Text>
        
        <View
          style={{
            marginHorizontal: 12,
            width: '100%',

          }}>
          <TouchableOpacity
         onPress={() => navigation.popToTop()}
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
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>
        </View>
        
     
      </SafeAreaView>
      </ScrollView>
    );

  if (loading) return <Loading />;
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white   ')}>
      <KeyboardAwareScrollView style={tailwind('pb-20 pt-4 ')}>
      <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
     textAlign:'center',

          }}>
          กำหนดรหัสผ่านของคุณ
        </Text>
        <FastImage
          style={tailwind('w-full h-44 my-4 ')}
          source={require('../../image/newpassword.jpg')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
     textAlign:'center',

          }}>
          สำหรับผู้ใช้งานหมายเลขโทรศัพท์  
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop:10,
            color: '#212757',
     textAlign:'center',

          }}>
          0831288535
        </Text>
        <UserInfo />
        {/* <PDFUpload /> */}
        <TouchableOpacity
          style={{
            padding: 12,
            marginTop: 16,
            marginHorizontal: 20,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: '#222655',
            marginBottom:30,
          }}>
          <Text
            onPress={submit}
            style={tailwind(
              'text-white w-full text-center text-base font-bold  ',
            )}>
            บันทึก
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdatePassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
