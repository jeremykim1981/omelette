import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import tailwind from 'tailwind-rn';
import FastImage from 'react-native-fast-image';

import React, {memo, useState, useCallback} from 'react';

const MachineEdit = ({navigation}) => {
  const [Details, setDetails] = useState([
    {title: 'ข้อมูลลูกค้า', text: 'Alisa Khotano', subtext: ''},
    {title: 'ที่อยู่', text: 'แผนก A, BKK', subtext: 'Asiamed ชั้น 3'},
    {title: 'ตัวแทนขาย', text: 'Mr.Asiamed', subtext: ''},
    {title: 'วันที่รับเครื่องเข้าบริษัท', text: '20 Jun 2021', subtext: ''},
    {title: 'วันที่ส่งสินค้า', text: '28 Jun 2021', subtext: ''},
    {title: 'ตรวจเช็คล่าสุด', text: '28 Jun 2021', subtext: 'โดย Mr.Asiamed'},
    {title: 'ประกันหมดอายุ', text: '28 Jun 2022', subtext: ''},
    {title: 'รอบการ PM ครั้งถัดไป', text: '20 Jun 201', subtext: '28 Sep 2022'},
  ]);

  const Social = memo(() => {
    return (
      <View style={tailwind('flex flex-row justify-between items-center my-4')}>
        <TouchableOpacity
          style={tailwind('border border-gray-300 rounded-lg p-4')}>
          <FastImage
            style={tailwind('w-16 h-16  ')}
            source={require('../../image/qr.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind('border border-gray-300 rounded-lg p-4 mx-2')}>
          <FastImage
            style={tailwind('w-16 h-16  ')}
            source={require('../../image/videoicon.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind('border border-gray-300 rounded-lg p-4')}>
          <FastImage
            style={tailwind('w-16 h-16  ')}
            source={require('../../image/pdf.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    );
  });
  const Title = memo(({title = '', text = '', subtext = ''}) => {
    return (
      <View>
        <View style={tailwind('flex flex-row justify-between  items-start')}>
          <Text
            style={{
              color: '#212757',
            }}>
            {title}
          </Text>
          <View style={tailwind(' flex justify-end items-end')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#212757',
              }}>
              {text}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                color: '#8C8C8C',
                marginTop: 4,
              }}>
              {subtext}
            </Text>
          </View>
        </View>
        <View style={tailwind('border-b border-gray-300 my-4')}></View>
      </View>
    );
  });
  const HistoryCard = memo(() => {
    return (
      <View
        style={{
            marginVertical:10,
          backgroundColor: '#E0EEFF',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          padding: 10,
        }}>
        <View style={tailwind('flex flex-row justify-between items-center')}>
          <View>
            <Text
              style={{
                marginBottom: 4,
                color: '#212757',
              }}>
              ผู้แจ้ง : Customer 02
            </Text>
            <Text
              style={{
                marginBottom: 4,
                color: '#212757',
              }}>
              เบอร์โทร : 0831288535
            </Text>
            <Text
              style={{
                marginBottom: 4,
                color: '#212757',
              }}>
              18-06-2012 11:49
            </Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: '#01BF14',
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 4,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              เสร็จสิ้น
            </Text>
          </View>
        </View>
      </View>
    );
  });
  return (
    <SafeAreaView style={tailwind(' bg-white flex-1  ')}>
      <ScrollView style={tailwind(' p-4  ')}>
        <View style={tailwind('flex flex-row justify-between items-center')}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#212757',
            }}>
            LSI : Freeze dryer
          </Text>
          <FastImage
            style={tailwind('w-6 h-6  ')}
            source={require('../../image/edit.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: '#212757',
            marginTop: 10,
          }}>
          1234
        </Text>
        <View
          style={tailwind('border border-gray-300 rounded-lg w-full p-4 mt-4')}>
          <View style={tailwind('flex flex-row justify-between items-center')}>
            <View style={tailwind('flex flex-row justify-start items-center')}>
              <FastImage
                style={tailwind('w-6 h-6 mr-3  ')}
                source={require('../../image/scan.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '500',
                }}>
                Serial Number
              </Text>
            </View>
            <Text
              style={{
                color: '#212757',
                fontWeight: '500',
              }}>
              15-1689
            </Text>
          </View>
        </View>
        <Social />
        {Details.map((detail, index) => {
          return (
            <View key={index}>
              <Title
                title={detail.title}
                text={detail.text}
                subtext={detail.subtext}
                index={index}
              />
              {/* <Youtube name={howto} /> */}
            </View>
          );
        })}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212757',
            marginBottom: 10,
          }}>
          ประวัติบริการ
        </Text>
        <View style={tailwind('pb-10')}>
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </View>
        
      </ScrollView>
      <TouchableOpacity
          style={{
            padding: 12,
            marginTop: 16,
            marginHorizontal: 20,
            marginBottom: 15,
            borderRadius: 30,
            backgroundColor: '#222655',
          }}>
          <Text
            onPress={() => navigation.navigate('machinemain')}
            style={tailwind(
              'text-white w-full text-center text-base font-bold ',
            )}>
            บันทึกการแก้ไข
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MachineEdit;
