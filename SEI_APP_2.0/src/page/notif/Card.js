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
import {StyleSheet} from 'react-native';

const Card = ({navigation,
  name = '',
  bgcolor = 'bg-red-500',
  tel = '',
  date = '',
  time = '',
  status='',
}) => {

  const getStylebyStatus = (status ="รับเรื่อง") => {
      if(status === "รับเรื่อง") return styles.roundButtonBlue
      if(status === "กำลังดำเนินการ") return styles.roundButtonYellow
    return styles.roundButtonGreen
  }
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("Task")} style={styles.shadowCard}><View
      style={tailwind(
        'mt-4  flex flex-row justify-between    border border-gray-200 bg-white  ',
      )}>
      <View style={tailwind('flex flex-row  items-center   ')}>
        <View style={tailwind('w-4 h-full   mr-2  ' + [bgcolor])}></View>
        <View style={tailwind(' py-4 ')}>
          <Text style={tailwind('pb-2 ')}>ผู้แจ้ง : {name} </Text>
          <Text style={tailwind('pb-2')}>เบอร์โทร : {tel} </Text>
          <View style={tailwind(' pb-2')}>
            <Text style={styles.textColor}>
              {date} {time}
            </Text>
          </View>
        </View>
      </View>
      <View style={tailwind('flex justify-center items-center pr-4')}>
        <View style={getStylebyStatus(status)}>
          <Text style={tailwind(' text-white  font-semibold py-2 px-4')}>
            {status}
          </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};
export default Card;
const styles = StyleSheet.create({
  textColor: {
    color: '#6C73C4',
  },
  shadowCard:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
  roundButtonBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    backgroundColor: '#0081FF',
  },
  roundButtonYellow: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    backgroundColor: '#FFA800',
  },
  roundButtonGreen: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    backgroundColor: '#01BF14',
  },
});
