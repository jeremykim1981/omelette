import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ListViewComponent,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import tailwind from 'tailwind-rn';
import HeadNoti from "./HeadNoti"
import Card from './Card';


const Processing = ({navigation})=> {
    return (<View >
        <HeadNoti/>
        <Card navigation={navigation} name="Customer 02" tel="0874055292" bgcolor=" bg-red-500" date="18-06-2012 " time="11:49" status="รับเรื่อง"/>
        <Card navigation={navigation}name="Customer 02" tel="0874055292" bgcolor=" bg-blue-500" date="18-06-2012 " time="11:49" status="กำลังดำเนินการ"/>
        <Card navigation={navigation} name="Customer 02" tel="0874055292" bgcolor=" bg-red-500" date="18-06-2012 " time="11:49" status="รับเรื่อง"/>
    </View>
    )
}
export default Processing