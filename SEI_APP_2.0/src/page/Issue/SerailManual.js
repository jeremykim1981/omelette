import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import React, {memo, useState, useCallback} from 'react';
import tailwind from 'tailwind-rn';
import {StyleSheet} from 'react-native';

const SerailManual = ({navigation}) => {
  const [text, onChangeText] = React.useState(null);

  const onTab =()=> {
      alert("ไม่พบอุปกรณ์")
    navigation.navigate('Instrument')
  }

  return (
    <View style={tailwind(' bg-white flex-1')}>
      <View style={tailwind(' border border-gray-300 p-4 m-4 rounded-lg')}>
        <Text style={styles.textColor}>ค้นหาอุปกรณ์ด้วย Serial number</Text>
        <TouchableOpacity>
          <TextInput
            style={tailwind(
              'border  border-gray-300 text-gray-700 p-4 rounded-lg mt-4 w-full mb-6  ',
            )}
            onChangeText={onChangeText}
            value={text}
            placeholderTextColor={'#ccc'}
            placeholder="ตัวอย่างเช่น 1-779"
            keyboardType="numeric"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundButtonBlue}
          onPress={onTab}>
          <Text style={tailwind('text-white font-bold text-center  text-lg')}>
           
            ค้นหาอุปกรณ์
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SerailManual;
const styles = StyleSheet.create({
  textColor: {
    color: '#222655',
    fontWeight: '500',
  },
  roundButtonBlue: {
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 6,
    backgroundColor: '#222655',
    width: '100%',
    height: 40,
  },
});
