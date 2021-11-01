import {SafeAreaView} from 'react-navigation';
import React, {useRef, useState} from 'react';
import Search from 'react-native-search-box';
import {
  FlatList,
  
} from 'react-native-gesture-handler';
import {View, Text,  TouchableHighlight,
  TouchableOpacity,} from 'react-native';
import tailwind from 'tailwind-rn';
import FastImage from 'react-native-fast-image';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

const MachineMain = ({navigation}) => {
  const ref = useRef();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([
    {
      name: 'Anh Tuan Nguyen',
      age: 28,
    },
    {
      name: 'An Nhien',
      age: 2,
    },
    {
      name: 'Thanh Tu Pham',
      age: 32,
    },
    {
      name: 'Tien Thanh',
      age: 24,
    },
  ]);

  const renderRow = ({item}) => {
    console.log('render', item.name);
    return (
      <TouchableHighlight
      activeOpacity={0.9}
              underlayColor="#f5f5f5"
      onPress={() => navigation.navigate('machineedit')}
        style={tailwind(' bg-white w-full border-b border-gray-200')}>
        <View style={tailwind('flex flex-row items-center p-4')}>
          <View
            style={{
              backgroundColor: '#212757',
              borderRadius: 90,
              height: 50,
              width: 50,
            }}>
            <Text style={tailwind('text-white text-center mt-4 font-bold')}>
              {item.name.substring(0, 1)}
            </Text>
          </View>
          <View style={tailwind('ml-4')}>
            <Text
              style={{
                color: '#212757',
                fontSize: 16,
                fontWeight: '700',
                marginBottom:10,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: '#8C8C8C',
                fontSize: 14,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: '#8C8C8C',
                fontSize: 14,
              }}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const onSearch = searchText => {
    return new Promise((resolve, reject) => {
      console.log(searchText);
      console.log('Add your search function here.');
      resolve();
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <View
        style={tailwind('flex flex-row justify-center items-center py-4 px-4')}>
        <View style={tailwind('flex-1')}>
          <Search
            ref={ref}
            onSearch={onSearch}
            backgroundColor={'#eee'}
            // backgroundColor={"#fff"}
          />
        </View>
        <TouchableOpacity
          style={{backgroundColor: 'transparent'}}
          onPress={() => navigation.navigate('machinescan')}>
          <FastImage
            style={tailwind('w-5 h-5 mr-2')}
            source={require('../../image/qr.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'transparent'}}
          onPress={() => navigation.navigate('machineadd')}>
          <FastImage
            style={tailwind('w-5 h-5')}
            source={require('../../image/plus.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>

      <Tabs
        defaultIndex={index} // default = 0
        uppercase={false}
        style={{backgroundColor: 'white', marginTop: 4}}
        theme={{colors: {primary: '#222655'}}}
        onChangeIndex={newIndex => setIndex(newIndex)} // react on index change
      >
        <TabScreen label="Product">
          <FlatList data={data} renderItem={renderRow}></FlatList>
        </TabScreen>
        <TabScreen label="Loaner">
          <View></View>
        </TabScreen>
      </Tabs>
    </View>
  );
};

export default MachineMain;
