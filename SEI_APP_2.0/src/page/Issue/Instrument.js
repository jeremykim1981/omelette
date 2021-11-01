import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {memo, useState, useCallback} from 'react';
import tailwind from 'tailwind-rn';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

const Instrument = ({navigation, prop}) => {
  const instruement = {
    code: 'KBP6395F',
    name: 'Termaks : Climate chamber',
    serial: '1-779',
    latest_ma_date: '2021-03-22',
    latest_ma_by: 'นายเอเชียเมด',
    warranty_expire: '2019-02-28',
    customer_name: 'พนิต จ๋วงพานิช',
    location: 'Laboratory โรงพิมพ์ธนบัตร สายออกบัตรธนาคาร',
    sale: 'Mr.Asiamed',
    installed_date: '2019-02-28',
  };

  const [index, setIndex] = useState(0);
  const Content = memo(({label, value}) => {
    return (
      <View style={tailwind('mb-4')}>
        <Text style={tailwind('text-xs text-gray-500')}>{label}</Text>
        <Text style={tailwind('text-blue-900 text-base font-medium')}>
          {value}
        </Text>
        {/* <Text style={{width:Dimensions.get('window').width / 2}}>Testsdxzkjgfsdkfjdsxkjfgdskhj</Text> */}
      </View>
    );
  });

  const Instruction = () => {
    return (
      <View style={tailwind('flex-1 mx-4 ')}>
        <Video
          controls={true}
          style={tailwind('w-full h-44 mt-4  rounded-lg')}
          source={require('../../image/asiamed.mp4')}
        />
        <Text style={tailwind('mt-2 mb-4 text-gray-700 font-bold')}>การดูแลรักษาเครื่อง Elisa 600</Text>
      </View>
    );
  };
  const [historys, setHistorys] = useState([
    {user: 'โดย : นายเอเชียเมด', date: '2019-08-28'},
    {user: 'โดย : นายเอเชียเมด', date: '2019-05-28'},
    {user: 'โดย : นายเอเชียเมด', date: '2019-03-28'},
    {user: 'โดย : นายเอเชียเมด', date: '2019-02-28'},
  ]);
  const History = ({date = '', user = ''}) => {
    return (
      <View style={tailwind('mx-4 mt-6 flex-shrink-0')}>
        <Text style={tailwind(' mb-1 font-bold  ')}>{date}</Text>
        <Text style={styles.text}>{user}</Text>
        <View style={tailwind(' border-b border-gray-300 mt-6 ')}></View>
      </View>
    );
  };

  return (
    <View style={{
      flex:1,
      backgroundColor: '#222655',
    }}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <ImageBackground
        source={require('../../image/issue_bg.jpeg')}
        style={tailwind('flex-1 p-4    ')}>
        <ScrollView style={{height: Dimensions.get('window').height * 0.2}}>
          <View style={{width: Dimensions.get('window').width / 1.7}}>
            <Text style={tailwind('font-bold text-blue-500')}>
              {instruement.code}
            </Text>
            <Text style={tailwind('text-xl font-bold mt-1 mb-2')}>
              {/* <Text style={styles.header}> */}
              {instruement.name}
            </Text>
            <Content label="SERIAL#" value={instruement.serial} />
            <View style={tailwind('mb-4')}>
              <Text style={tailwind('text-xs text-gray-500')}>
                บำรุงรักษาครั้งล่าสุด
              </Text>
              <Text style={tailwind('text-blue-900 text-base font-medium')}>
                {instruement.latest_ma_date}
              </Text>
              <Text style={tailwind('text-blue-900 text-xs ')}>
                โดย : {instruement.latest_ma_by}
              </Text>
            </View>
            <Content
              label="ประกันหมดอายุ"
              value={instruement.warranty_expire}
            />
            <View style={tailwind('border-b border-gray-300  ')}></View>
            <Text style={tailwind('font-bold text-lg my-4')}>ข้อมูลทั่วไป</Text>
            <Content label="ลูกค้า" value={instruement.customer_name} />
            <Content label="สถานที่" value={instruement.location} />
            <Content label="ตัวแทนขาย" value={instruement.sale} />
            <Content label="วันที่ติดตั้ง" value={instruement.installed_date} />
          </View>
        </ScrollView>
      </ImageBackground>
      <View style={tailwind('flex-1  bg-white   ')}>
        <TouchableOpacity
          onPress={() => navigation.navigate('แจ้งปัญหา')}
          style={{
            padding: 12,
            marginTop: 5,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: '#222655',
          marginHorizontal:12,
          }}>
          <Text
            style={tailwind(
              'text-white w-full text-center text-base font-bold ',
            )}>
            แจ้งซ่อม
          </Text>
        </TouchableOpacity>

        <Tabs
          defaultIndex={index} // default = 0
          uppercase={false}
          style={{backgroundColor: 'white'}}
          theme={{colors: {primary: '#222655'}}}
          onChangeIndex={newIndex => setIndex(index)} // react on index change
        >
          <TabScreen label="คู่มือการใช้งาน">
            <ScrollView style={tailwind('flex-1')}>
              <Instruction />
            </ScrollView>
          </TabScreen>
          <TabScreen label="ประวัติ">
            <ScrollView>
              {historys.map((history, index) => {
                return (
                  <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                    <History
                      user={history.user}
                      date={history.date}
                      index={index}
                    />
                    {/* <Youtube name={howto} /> */}
                  </View>
                );
              })}
            </ScrollView>
          </TabScreen>
        </Tabs>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 4,
  },
  text: {
    color: '#8c8c8c',
  },
  header: {
    color: '#212757',
  },
});

export default Instrument;
