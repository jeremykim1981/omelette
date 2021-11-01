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

const UserAdd = ({navigation}) => {
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
  const onSuccess = e => {
    alert("Copied !")
  };
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

  const InfoCustomer = memo(() => {
    return (
      <View style={tailwind('mt-4')}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          ข้อมูลผู้ใช้
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <DropDownPicker
            style={tailwind('my-4 border border-gray-300  ')}
            dropDownContainerStyle={{
              borderColor: '#dfdfdf',
              top: 70,
            }}
            translation={{
              PLACEHOLDER: ' ตำแหน่ง',
            }}
            placeholderStyle={{
              color: '#8C8C8C',
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              ชื่อ - นามสกุล
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <DropDownPicker
            style={tailwind('my-4 border border-gray-300  ')}
            dropDownContainerStyle={{
              borderColor: '#dfdfdf',
              top: 70,
            }}
            translation={{
              PLACEHOLDER: ' แผนก',
            }}
            placeholderStyle={{
              color: '#8C8C8C',
            }}
            open={opens}
            value={value}
            items={monthlys}
            setOpen={setOpens}
            setValue={setValue}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              สถานที่
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
        </View>
      </View>
    );
  });
  const UserInfo = memo(() => {
    return (
      <View style={tailwind('mt-4')}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          บัญชีผู้ใช้{' '}
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              ชื่อบัญชี
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              เบอร์โทร
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          {/* <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              รหัสผ่าน
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View> */}
        </View>
      </View>
    );
  });
  if (loading) return <Loading />;
  if (done)
    return (
      <View
        style={tailwind(
          'bg-white items-center flex-1 justify-center bg-white p-4 ',
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
          style={tailwind('w-full h-32 my-4 ')}
          source={require('../../image/success.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            color: '#212757',
            fontSize: 16,
            fontWeight: '500',
          }}>
          Alisa Khotano
        </Text>
        <Text
          style={{
            color: '#8C8C8C',
            fontSize: 16,
            marginTop: 10,
          }}>
          แผนก : Laboratory, เขตกลางเหนือ
        </Text>
        <Text
          style={{
            color: '#8C8C8C',
            fontSize: 16,
            marginTop: 10,
          }}>
          สถานที่ : BKK
        </Text>
        <View
          style={tailwind('border border-gray-300 rounded-lg w-full p-4 mt-4')}>
          <View style={tailwind('flex flex-row justify-between items-center')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              เบอร์โทรศัพท์
            </Text>
            <Text
              style={{
                color: '#212757',

                fontWeight: '500',
              }}>
              0831288535
            </Text>
          </View>
          <View style={tailwind('border-b border-gray-300 my-4')}></View>
          <View style={tailwind('flex flex-row justify-between items-center')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              รหัสผ่าน
            </Text>
            <Text
              style={{
                color: '#212757',

                fontWeight: '500',
              }}>
              123456789
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 12,
            width: '100%',

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
              แชร์ข้อมูลผู้ใช้
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text
          onPress={() => navigation.navigate('usermain')}
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: '#222655',
              width: '100%',
            }}>
            กลับสู่หน้าหลัก
          </Text>
        </TouchableOpacity>
      </View>
    );

  if (loading) return <Loading />;
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white p-4 ')}>
      <KeyboardAwareScrollView style={tailwind('pb-20 ')}>
        {/* <InfoEquipment /> */}
        <InfoCustomer />
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
          }}>
          <Text
            onPress={submit}
            style={tailwind(
              'text-white w-full text-center text-base font-bold ',
            )}>
            สร้างบัญชี
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UserAdd;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
