import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ListViewComponent,
  ScrollView,
} from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';
import HeadNoti from './HeadNoti';
import Card from './Card';
import {StyleSheet} from 'react-native';

const Done = ({navigation}) => {
  return (
    <View >
      {/* <Button
        title="Tap"
        onPress={() => navigation.push('ProductLibaryPdf')}></Button> */}

      <HeadNoti />
      <Card
        navigation={navigation}
        name="Customer 02"
        tel="0874055292"
        bgcolor=" bg-red-500"
        date="18-06-2012 "
        time="11:49"
        status="เสร็จสิ้น"
      />
      <Card
        navigation={navigation}
        name="Customer 02"
        tel="0874055292"
        bgcolor=" bg-blue-500"
        date="18-06-2012 "
        time="11:49"
        status="เสร็จสิ้น"
      />
      
    </View>
  );
};
export default Done;
const styles = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#000'
    },
   
  });