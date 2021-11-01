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
import React, {memo, useState, useCallback} from 'react';
import tailwind from 'tailwind-rn';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Loading from '../Loading';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const Form = ({navigation, mode = 'fix'}) => {
  const user = {phone: '0819278409', name: 'คุณธิดา เรืองสิริธัญญกุล'};
  const [form, setForm] = useState({});
  const [media, setMedia] = useState([require('../../image/news.png')]);
  const [video, setVideo] = useState(['asiamed']);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [type, setType] = useState(0);
  var radio_props = [
    {label: 'สอบถามข้อมูลสินค้า', value: 0},
    {label: 'นัดพบ', value: 1},
    {label: 'ขอใบเสนอราคา', value: 2},
    {label: 'อื่นๆ', value: 3},
  ];

  const onSelectImage = res => {
    if (res.uri != undefined) {
      let temp = [...media];
      temp.push(res.uri);
      setMedia(temp);
    }
  };

  const deleteImg = index => {
    var temp = [...media];
    if (index > -1) {
      temp.splice(index, 1);
      setMedia(temp);
    }
  };

  const deleteVdo = index => {
    var temp = [...video];
    if (index > -1) {
      temp.splice(index, 1);
      setMedia(temp);
    }
  };

  const onSelectVideo = res => {
    if (res.uri != undefined) {
      let temp = [...video];
      temp.push(res.uri);
      setVideo(temp);
    }
  };

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

  const sliderWidth = Dimensions.get('window').width / 2.75;

  const renderImg = ({item, index}) => (
    <View style={tailwind('p-1 m-1 bg-white')}>
      <Image
        style={{
          width: sliderWidth,
          height: (sliderWidth / 3) * 4,
          borderRadius: 10,
        }}
        resizeMode="contain"
        source={item}
      />
      <TouchableOpacity
        onPress={() => deleteImg(index)}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 10,
          right: 8,
        }}>
        <FastImage
          style={tailwind('w-5 h-5')}
          source={require('../../image/remove.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );

  const renderVDO = ({item, index}) => (
    <View style={tailwind('p-1 m-1 ')}>
      <Video
        controls={true}
        style={{
          width: sliderWidth,
          height: (sliderWidth / 3) * 4,
          borderRadius: 10,
        }}
        source={require('../../image/asiamed.mp4')}
      />
      <TouchableOpacity
        onPress={() => deleteVdo(index)}
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 10,
          right: 8,
        }}>
        <FastImage
          style={tailwind('w-5 h-5')}
          source={require('../../image/remove.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) return <Loading />;
  if (done)
    return (
      <View style={tailwind('bg-white items-center flex-1 justify-center ')}>
        {mode === 'fix' ? (
          <FastImage
            style={tailwind('w-full h-56 mb-4 mt-20')}
            source={require('../../image/fix_done.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <FastImage
            style={tailwind('w-full h-56 mb-4 mt-20')}
            source={require('../../image/contact_done.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}

        <Text style={tailwind('text-xl text-gray-800')}>
          เราได้รับข้อความของคุณแล้ว
        </Text>
        <Text style={tailwind('text-sm text-gray-500 mt-1  mx-10 text-center')}>
          {mode === 'fix'
            ? 'หลังจากตรวจสอบข้อมูลเสร็จแล้วจะติดต่อคุณกลับไปให้เร็วที่สุด'
            : 'ตัวแทนของเราจะติดต่อคุณกลับไปให้เร็วที่สุด'}
        </Text>
        <View style={tailwind('flex-1')}></View>
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={{
            width: '80%',
            padding: 12,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 30,
            backgroundColor: '#222655',
          }}>
          <Text
            style={tailwind(
              'text-white w-full text-center text-base font-bold',
            )}>
            กลับสู่หน้าหลัก
          </Text>
        </TouchableOpacity>
      </View>
    );
  return (
    <SafeAreaView style={tailwind('  flex-1 bg-white')}>
      <ScrollView style={tailwind('  p-4')}>
        {mode === 'fix' ? (
          <View>
            <Text
              style={{
                color: '#212757',
                fontWeight: '900',
                fontSize: 16,
                marginBottom: 16,
              }}>
              ข้อมูลผู้แจ้ง
            </Text>
            <View
              style={tailwind(
                'pb-4 border-b border-gray-300 flex flex-row justify-between',
              )}>
              <Text
                style={{
                  color: '#212757',
                  fontWeight: '500',
                }}>
                {user.name}
              </Text>
              <Text
                style={{
                  color: '#212757',
                  fontWeight: '500',
                }}>
                {user.phone}
              </Text>
            </View>
            <Text
              style={{
                color: '#212757',
                fontWeight: '900',
                fontSize: 16,
                marginTop: 12,
              }}>
              ปัญหาที่พบ
            </Text>
          </View>
        ) : (
          <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonColor={'#222655'}
            onPress={value => {
              setType(value);
            }}
          />
        )}
        <TextInput
          style={tailwind(
            'bg-white w-full h-40 p-2 border border-gray-200 mt-2',
          )}
          multiline={true}
          placeholder="ปัญหาที่พบ เช่น เครื่องไม่ทำงาน เปิดไม่ติด "
          value={form?.desc}
          onChange={value => setForm({...form, desc: value})}
        />
        <TouchableOpacity
          onPress={() =>
            launchImageLibrary(
              {mediaType: 'photo', quality: 0.7},
              onSelectImage,
            )
          }>
          <View style={styles.roundButtonGray}>
            <FastImage
              style={tailwind('w-5 h-5 mr-2 ')}
              source={require('../../image/imgicon.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={tailwind('  text-gray-800  text-base')}>
              อัพโหลดรูปภาพ
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            launchImageLibrary(
              {mediaType: 'video', quality: 0.7},
              onSelectVideo,
            )
          }>
          <View style={styles.roundButtonGray}>
            <FastImage
              style={tailwind('w-5 h-5 mr-2 ')}
              source={require('../../image/videoicon.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={tailwind('  text-gray-800  text-base')}>
              อัพโหลดวีดีโอ
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: '#212757',
            fontWeight: '900',
            fontSize: 16,
            marginVertical: 12,
          }}>
          ภาพ
        </Text>
        <FlatList
          data={media}
          horizontal={true}
          renderItem={renderImg}></FlatList>
        <Text
          style={{
            color: '#212757',
            fontWeight: '900',
            fontSize: 16,
            marginVertical: 12,
          }}>
          วิดีโอ
        </Text>
        <FlatList
          data={video}
          horizontal={true}
          renderItem={renderVDO}></FlatList>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 12,
        }}>
        <TouchableOpacity
          onPress={submit}
          style={{
            padding: 12,
            marginTop: 20,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: '#222655',
          }}>
          <Text
            style={tailwind(
              'text-white w-full text-center text-base font-bold ',
            )}>
            {mode === 'fix' ? 'แจ้งซ่อม' : 'ติดต่อ'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Form;
const styles = StyleSheet.create({
  textColor: {
    color: '#6C73C4',
  },
  shadowCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  roundButtonGray: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
  },
});
