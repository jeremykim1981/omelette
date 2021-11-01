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

const HeadNoti = () => {
  return (
    <View style={tailwind('mt-6 px-4 flex flex-row  ')}>
      <View style={tailwind('flex flex-row  items-center  mr-6  ')}>
        <View
          style={tailwind('w-4 h-4 bg-red-500 rounded-full mr-2  ')}></View>
        <Text style={tailwind('  ')}>แจ้งซ่อม</Text>
      </View>
      <View style={tailwind('flex flex-row  items-center   ')}>
        <View
          style={tailwind('w-4 h-4 bg-blue-500 rounded-full mr-2  ')}></View>
        <Text style={tailwind(' ')}>ติดต่อ</Text>
      </View>
    </View>
  );
};
export default HeadNoti;
