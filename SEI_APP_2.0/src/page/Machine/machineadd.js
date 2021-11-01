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
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import Loading from '../Loading';

const MachineAdd = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [loading,setLoading] = useState(false)
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
    {label: 'ทุก 3 เดือน', value: 'ทุก 3 เดือน'},
    {label: 'ทุก 6 เดือน', value: 'ทุก 6 เดือน'},
  ]);
  ///PDF///
  const [commentFile, setCommentFile] = useState();

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      showDone();
    }, 2000);
  };

  const showDone = () => {
    setLoading(false);
    navigation.goBack()
  };
  const InfoEquipment = memo(() => {
    return (
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          ข้อมูลอุปกรณ์
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              ชื่ออุปกรณ์
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              Model
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              Serial Number
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              วันที่รับเครื่องเข้าบริษัท
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('flex flex-row justify-between  items-center')}>
            <Text
              style={{
                color: '#222655',
                fontWeight: '500',
              }}>
              Loaner
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#bcbcbc"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    );
  });

  const InfoCustomer = memo(() => {
    return (
      <View style={tailwind('mt-4')}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          ข้อมูลลูกค้า
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              ลูกค้า
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
              สถานที่
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              รายละเอียดที่อยู่เพิ่มเติม (อาคาร, ชั้น)
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              ตัวแทนขาย
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              วันส่งสินค้า
            </Text>
            <TouchableHighlight
              style={tailwind('mt-2 border-b  border-gray-300 ')}
              activeOpacity={0.9}
              underlayColor="#f5f5f5"
              onPress={() => setOpendate(true)}>
              <Text>{date.toLocaleString('th-TH')}</Text>
            </TouchableHighlight>
            <DatePicker
              modal
              open={opendate}
              date={date}
              onConfirm={date => {
                setOpendate(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpendate(false);
              }}
            />
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              วันที่ประกันหมดอายุ
            </Text>
            <TouchableHighlight
              style={tailwind('mt-2 border-b  border-gray-300 ')}
              activeOpacity={0.9}
              underlayColor="#f5f5f5"
              onPress={() => setOpendate(true)}>
              <Text>{date.toLocaleString('th-TH')}</Text>
            </TouchableHighlight>
            <DatePicker
              modal
              open={opendate}
              date={date}
              onConfirm={date => {
                setOpendate(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpendate(false);
              }}
            />
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              รอบการ PM
            </Text>

            <DropDownPicker
              style={tailwind('my-4 border border-gray-300  ')}
              dropDownContainerStyle={{
                borderColor: '#dfdfdf',
                top: 70,
              }}
              translation={{
                PLACEHOLDER: ' รอบการ PM',
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
          </View>
        </View>
      </View>
    );
  });
  const VideoLink = memo(() => {
    return (
      <View style={tailwind('mt-4')}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          วีดีโอการใช้งาน
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              Video URL
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
          <View style={tailwind('mb-4')}>
            <Text
              style={{
                color: '#8C8C8C',
              }}>
              คำบรรยาย
            </Text>
            <TextInput
              style={tailwind('border-b border-gray-300 mt-2')}></TextInput>
          </View>
        </View>
      </View>
    );
  });
  const onSelectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setCommentFile(res);
    } catch (err) {
      console.log('error', err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const PDFUpload = memo(() => {
    return (
      <View style={tailwind('mt-4')}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
          }}>
          คู่มือการใช้งาน
        </Text>
        <View style={tailwind('border border-gray-300 mt-4 p-4 rounded-lg')}>
          <View style={tailwind('mb-4 ')}>
            <Text
              style={{
                color: '#8C8C8C',
                textAlign: 'center',
              }}>
              ฮัพโหลดไฟล์ PDF ขนาดไม่เกิน 8 mb
            </Text>
          </View>
          <TouchableOpacity onPress={onSelectDocument}>
            <Text
              style={{
                color: '#222655',
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              อัพโหลด
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  if(loading) return <Loading/>
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white p-4 ')}>
      <KeyboardAwareScrollView style={tailwind('pb-20 ')}>
        <InfoEquipment />
        <InfoCustomer />
        <VideoLink />
        <PDFUpload />
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
            เพิ่มอุปกรณ์
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MachineAdd;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
