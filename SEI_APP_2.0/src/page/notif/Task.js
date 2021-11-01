import React, {useState} from 'react';
import {View, Text, Dimensions, TextInput,FlatList,TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  ScrollView,
  TouchableHighlight,
  
} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Video from 'react-native-video';
import tailwind from 'tailwind-rn';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';

const Task = ({navigation, status = 'เสร็จสิ้น',type="ติดต่อ",subType = "ใบเสนอราคา"}) => {
  const [images] = useState([
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
  ]);
  const [commentImg, setCommentImg] = useState([]);
  const [commentFile, setCommentFile] = useState();
  const [media, setMedia] = useState([require('../../image/news.png')])
  
//   const sliderWidth  = Dimensions.get('window').width / 2.75;
  

  const renderImg = ({ item, index }) => (
      
    <View style={tailwind("p-1 m-1 bg-white")}>
        <Image
            style={{ width: sliderWidth, height: (sliderWidth / 3 * 4), borderRadius: 10 }}
            resizeMode="contain"
            source={item} />
      
    </View>
)

  const onSelectImage = res => {
    if (res.uri != undefined) {
      let temp = [...media];
      temp.push(res.uri);
      setCommentImg(temp);
    }
  };

  const onSelectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
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

  const onDeleteImage = index => {
    var temp = [...media];
    if (index > -1) {
      temp.splice(index, 1);
      setCommentImg(temp);
    }
  };
  const [activeSlide, setActiveSlide] = useState(0);
//   const [histories, setHistories] = useState(['', '']);
  const _renderItem = ({item, index}) => {
    return (
      <FastImage
        style={{
          backgroundColor: '#fff',
          resizeMode: 'contain',
          borderRadius: 0,
          width: Dimensions.get('window').width,
          height: 300,
          marginTop: 0,
        }}
        source={{
          uri: item,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  };

  const [historys, setHistorys] = useState([
    {user: 'โดย : นายเอเชียเมด', date: '2019-08-28',comment:'กำลังเปลี่ยนอะไหล่'},
    {user: 'โดย : นายเอเชียเมด', date: '2019-05-28',comment:'รับทราบ ช่างกำลังเข้าซ่อม'},
    {user: 'โดย : นายเอเชียเมด', date: '2019-03-28',comment:'รับทราบ ช่างกำลังเข้าซ่อม'},
   
  ]);

  const HistoryCard = ({date = '', comment = '',user=''}) => {
    return (
      <View style={tailwind('mx-4 mt-6 flex-shrink-0')}>
        <Text style={tailwind(' mb-1 text-gray-500  ')}>{date}</Text>
        <Text style={styles.text}>{comment}</Text>
        <Text style={tailwind(' mt-1 text-gray-500  ')}>{user}</Text>
        <FlatList
                    data={media}
                    horizontal={true}
                    renderItem={renderImg}>
                </FlatList>

        <View style={tailwind(' border-b border-gray-300 mt-6 ')}></View>
      </View>
    );
  };

  const sliderWidth = Dimensions.get('window').width / 2.75;
  const getStylebyStatus = (status = 'รับเรื่อง') => {
    if (status === 'รับเรื่อง') return styles.roundButtonBlue;
    if (status === 'กำลังดำเนินการ') return styles.roundButtonYellow;
    return styles.roundButtonGreen;
  };
  const getStylebyType = (type = 'แจ้งซ่อม') => {
    if (type === 'แจ้งซ่อม') return tailwind(' border border-red-500 rounded-lg ');
    if (type === 'ติดต่อ') return tailwind(' border border-blue-500 rounded-lg ');
    return tailwind(' border border-red-500 rounded-lg ');
  };
  const getStylebyTextType = (type = 'แจ้งซ่อม') => {
    if (type === 'แจ้งซ่อม') return tailwind('  text-red-500 px-2 py-1   text-sm ');
    if (type === 'ติดต่อ') return tailwind('  text-blue-500 px-2 py-1   text-sm ');
    return tailwind('  text-red-500 px-2 py-1   text-sm ');
  };

  return (
    <View style={tailwind(' flex-1 bg-white')}>
      <ScrollView style={{flex: 1}}>
        <View style={tailwind(' px-4 mt-4 ')}>
          <View style={tailwind('flex flex-row justify-between items-center')}>
            <Text style={tailwind('text-gray-700 font-bold text-lg ')}>
              เลขที่การแจ้ง 134
            </Text>
            <View style={tailwind('flex justify-center items-center ')}>
              <View style={getStylebyStatus(status)}>
                <Text style={tailwind(' text-white  font-semibold py-2 px-4')}>
                  {status}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={tailwind('flex flex-row justify-between items-center mt-4')}>
            <View style={tailwind('flex flex-row  items-center ')}>
              <Text style={tailwind('text-gray-700  text-sm pr-2 ')}>
                ประเภทงาน :
              </Text>
              <View style={getStylebyType(type)}>
                <Text style={getStylebyTextType(type)}>
                {type === "แจ้งซ่อม" ?"แจ้งซ่อม":subType} 
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.textColor}>18-06-2012 11:49</Text>
            </View>
          </View>
          <View
            style={tailwind('flex flex-row justify-between items-center mt-4')}>
            <View style={tailwind('flex flex-row  items-center ')}>
              <Text style={tailwind('text-gray-700  text-sm  ')}>
                Modle : 1234
              </Text>
            </View>

            <View>
              <Text style={tailwind('text-gray-700  text-sm  ')}>
                Serial # : 123456
              </Text>
            </View>
          </View>
          <View style={styles.BGBlue}>
            <Text style={tailwind('text-gray-700  text-sm  ')}>ตัวแทนขาย</Text>
            <View
              style={tailwind(
                'flex flex-row justify-between items-center mt-1',
              )}>
              <View style={tailwind('flex flex-row  items-center ')}>
                <Text style={tailwind('text-gray-700  text-sm font-bold  ')}>
                  Mr. Asiamed
                </Text>
              </View>

              <View>
                <Text style={tailwind('text-gray-700  text-sm font-bold  ')}>
                  0831288535
                </Text>
              </View>
            </View>
          </View>
          <Text style={tailwind('text-gray-700 text-base font-bold  mt-4 ')}>
            {type === "แจ้งซ่อม" ?"รายละเอียดการแจ้งซ่อม":"รายละเอียดติดต่อ"}
            
          </Text>
          <Text style={tailwind('text-gray-700 px-4  mt-4 ')}>
            เครื่อง Elisa 600 หน้าจอไม่สามารถใช้งานงาน (กดไม่ได้)
          </Text>
        </View>

        <Text style={tailwind('text-gray-700 font-bold text-base  p-4')}>
          Video
        </Text>
        <Video
          controls={true}
          style={tailwind('w-full h-60')}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
        />
        <View style={tailwind('mb-10')}>
          <Text style={tailwind('text-gray-700 font-bold text-base  p-4')}>
            รูปภาพ
          </Text>
          <Carousel
            layout={'default'}
            data={images}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            renderItem={_renderItem}
            autoplay={true}
            autoplayInterval={5000}
            loop={true}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            containerStyle={tailwind('-mt-12 -mb-4')}
            dotStyle={{
              width: 4,
              height: 4,
              borderRadius: 5,
              marginHorizontal: 6,
              marginVertical: 0,
              backgroundColor: 'rgba(0, 0, 255, 1.0)',
            }}
            inactiveDotStyle={{
              // Define styles for inactive dots here
              backgroundColor: 'rgba(0, 0, 0, 1.0)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={{backgroundColor: '#EFF6FF'}}>
          <Text style={tailwind('text-gray-700 font-bold  text-base  p-4')}>
            ติดตามงาน
          </Text>
          <TextInput
            multiline
            style={tailwind(
              'bg-white h-20 rounded-t-xl border border-gray-300 mx-4 p-2',
            )}></TextInput>
          <View
            style={tailwind('bg-white border-r border-l border-gray-300 mx-4')}>
            {commentImg.map((img, index) => {
              return (
                <View style={tailwind('p-1 m-1 bg-white')} key={index}>
                  <Image
                    style={{
                      width: sliderWidth,
                      height: (sliderWidth / 3) * 4,
                      borderRadius: 10,
                    }}
                    resizeMode="contain"
                    source={img}
                  />
                  <TouchableOpacity
                    onPress={() => onDeleteImage(index)}
                    style={{
                      backgroundColor: '#ff0000',
                      position: 'absolute',
                      top: 5,
                      right: 5,
                    }}>
                    <FastImage
                      style={tailwind('w-7 h-7')}
                      source={require('../../image/remove.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {commentFile != undefined && (
            <View
              style={tailwind(
                'bg-white border-r border-l border-gray-300 mx-4',
              )}>
              <Text style={tailwind('text-blue-500')}>{commentFile?.name}</Text>
            </View>
          )}
          <View
            style={tailwind(
              'bg-white h-10 border border-gray-300 rounded-b-xl mx-4 mb-4 flex flex-row justify-between',
            )}>
            <View
              style={tailwind(
                'flex flex-row justify-center items-center ml-4',
              )}>
              <TouchableOpacity onPress={onSelectDocument}>
                <FastImage
                  style={tailwind('w-5 h-5 mr-2')}
                  source={require('../../image/fileicon.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  launchImageLibrary(
                    {mediaType: 'photo', quality: 0.7},
                    onSelectImage,
                  )
                }>
                <FastImage
                  style={tailwind('w-5 h-5')}
                  source={require('../../image/imgicon.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                padding: 2,
                marginTop: 5,
                marginHorizontal: 8,
                marginBottom: 0,
                borderRadius: 20,
                backgroundColor: '#222655',
              }}>
              <Text
                style={tailwind(
                  'text-white w-full text-center text-base font-bold px-6 ',
                )}>
                ส่ง
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {historys.map((history, index) => {
          return (
            <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
              <HistoryCard
              user={history.user}
                comment={history.comment}
                date={history.date}
                index={index}
              />
            </View>
          );
        })}
        {/* {histories.map((item, key) => {
          return <HistoryCard key={key} />;
        })} */}
      </ScrollView >
      <TouchableOpacity
        style={{
          padding: 12,
          marginTop: 10,
          marginHorizontal: 20,
          marginBottom: 10,
          borderRadius: 30,
          backgroundColor: '#222655',
        }}>
        <Text
        onPress={() => navigation.goBack()}
          style={tailwind('text-white w-full text-center text-base font-bold ')}>
          อนุมัติงาน
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;
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
  BGBlue: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EFF6FF',
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
