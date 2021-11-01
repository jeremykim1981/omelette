import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListViewComponent,
  ScrollView,
} from 'react-native';
import tailwind from 'tailwind-rn';
import React, {memo, useState, useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {linear} from 'react-native/Libraries/Animated/Easing';
import FastImage from 'react-native-fast-image';
import YouTube from 'react-native-youtube';
import {DefaultTheme} from '@react-navigation/native';
import {Linking} from 'react-native';
import {API} from '../api';
import {getPathUrl, YouTubeGetID} from '../functions';

const COMPANY_NAME = 'ASIAMED'; // Product เปลี่ยนแค่ ชื่อ บริษัท ก็ Loop ทั้งหมดให้แล้ว รวมทุกอย้่งเลย

const Card = memo(({img = '', name = '', navigation, id}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductInfo', {id: id})}
      style={tailwind(
        ' flex justify-center items-center border border-gray-200 rounded-md p-2 w-32 h-44 ',
      )}>
      <FastImage
        style={tailwind('h-32 w-32')}
        // source={require('../image/Product.png')}
        source={img ? {uri: img} : require('../image/Product.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={tailwind(' font-medium text-base mb-2 text-gray-500 ')}>
        {name}
      </Text>
    </TouchableOpacity>
  );
});

const LoadAllProduct = ({category, index, navigation}) => {
  useEffect(() => {
    LoadProduct();
  }, []);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const LoadProduct = async () => {
    try {
      const {data} = await API().get(`/products?category.label=${category}`);

      setProducts(data.products);
    } catch (error) {
      console.log(`ERROR_LOAD_PRODUCT_NAME : ${category} : `, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      key={index}
      style={
        index > 0 ? tailwind('bg-white p-4 mt-2') : tailwind('bg-white p-4')
      }>
      <Text style={tailwind(' font-medium text-2xl mb-2 text-gray-700 ')}>
        {category}
      </Text>
      {loading ? (
        <Text key={index}>Loading....</Text>
      ) : (
        <ScrollView horizontal={true} style={tailwind('flex flex-row pb-6')}>
          {products.length > 0 &&
            products.map((product, index) => {
              return (
                <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                  <Card
                    key={index}
                    id={product._id}
                    navigation={navigation}
                    img={getPathUrl(product.image)}
                    name={product.name}
                  />
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

const Home = ({navigation, updateAuthState, route}) => {
  const [playing, setPlaying] = useState(false);
  const [elisas, setElisas] = useState([]);
  const [prismas, setPrismas] = useState([
    'Prisma VENT50-C ',
    'Prisma VENT50-C ',
    'Prisma VENT50-C ',
  ]);
  const [accessories, setAccessories] = useState([
    'Accessories 1 ',
    'Accessories 2 ',
    'Accessories 3 ',
  ]);
  const [others, setOthers] = useState(['others1 ', 'others2 ', 'others3 ']);

  const [video, setVideo] = useState('');

  const [category, setCategory] = useState([]);

  useEffect(() => {
    LoadSettings();
    LoadCategory();
  }, []);

  const LoadCategory = async () => {
    try {
      const {data} = await API().get(
        `/products?select=category&company.label=${COMPANY_NAME}`,
      );
      if (data.products.length > 0) {
        setCategory(
          data.products.map(row => {
            return row.category.label;
          }),
        );
      }
    } catch (error) {
      console.log('ERROR TO LOAD CATEGORY : ', error);
    }
  };

  const LoadSettings = async () => {
    try {
      const {data} = await API().get(
        `/settings?company.value=${COMPANY_NAME}&limit=1`,
      );
      setVideo(YouTubeGetID(data?.settings[0]?.link));
    } catch (error) {
      console.log('ERROR_LOAD_YOUTUBE : ', error);
    }
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const Navbar = memo(() => {
    return (
      <View
        style={(tailwind('items-center flex-1'), {backgroundColor: '#222655'})}>
        <SafeAreaView
          style={tailwind('flex justify-center items-center relative')}>
          <FastImage
            style={tailwind('w-10 h-10')}
            source={require('../image/logo.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <FastImage
            style={tailwind('w-10 h-10 absolute rounded-full top-14 right-4')}
            source={require('../image/user.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </SafeAreaView>
      </View>
    );
  });

  const phoneNumber = '+66819278409';
  const Contact = memo(() => {
    return (
      <View
        style={tailwind(
          ' bg-white py-6 px-4 flex flex-row justify-between items-center',
        )}>
        <View style={tailwind('flex flex-row justify-between items-center')}>
          <FastImage
            style={tailwind('w-14 h-14 rounded-full mr-4')}
            source={require('../image/user.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View>
            <Text style={tailwind(' font-bold text-2xl text-gray-700 ')}>
              Mr.Asiamed
            </Text>

            <Text
              style={tailwind(' font-bold  text-gray-400 ', {
                color: '#222655',
              })}>
              ตัวแทนขายของคุณ
            </Text>
          </View>
        </View>
        <View style={tailwind(' flex  flex-row ')}>
          <TouchableOpacity
            onPress={() => navigation.navigate('แจ้งปัญหา')}
            style={tailwind(
              'w-10 h-10   border-2 border-red-500 rounded-full  flex justify-center items-center mr-4   ',
            )}>
            <FastImage
              style={tailwind('w-6 h-6       ')}
              source={require('../image/help.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            style={tailwind(
              'w-10 h-10   border-2 border-green-500 rounded-full  flex justify-center items-center mr-4   ',
            )}>
            <FastImage
              style={tailwind('w-6 h-6       ')}
              source={require('../image/phone.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });
  const Youtube = memo(() => {
    return (
      <View style={tailwind(' bg-white ')}>
        <View style={tailwind(' rounded-xl  ')}>
          {/* <YouTube
            videoId={video} // The YouTube video ID
            play // control playback of video with true/false
            // fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            style={{alignSelf: 'stretch', height: 300}}
            apiKey="AIzaSyAAtM8vncBjbHn2x0xOc_93MBl15UyMqCc"
          /> */}
          <YouTube
            // ref={youtube_ref}
            videoId={video} // The YouTube video ID
            play // control playback of video with true/false
            // fullscreen // control whether the video should play in fullscreen or inline
            loop={false} // control whether the video should loop when ended
            resumePlayAndroid={false}
            style={{alignSelf: 'stretch', height: 300}}
            apiKey={'AIzaSyAAtM8vncBjbHn2x0xOc_93MBl15UyMqCc'}
          />

          <View
            style={
              (tailwind('items-center w-full h-60 '),
              {backgroundColor: '#222655'})
            }></View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductLibary')}>
          <Text
            style={tailwind(
              'text-white text-lg font-semibold text-center py-2   ',
            )}>
            ดูเพิ่มเติม
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
  const Card = memo(({img = '', name = ''}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo')}
        style={tailwind(
          ' flex justify-center items-center border border-gray-200 rounded-md p-2 w-32 h-44 ',
        )}>
        <FastImage
          style={tailwind('h-32 w-32')}
          source={require('../image/Product.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={tailwind(' font-medium text-base mb-2 text-gray-500 ')}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  });

  const News = memo(({}) => {
    return (
      <View
        onPress={() => navigation.navigate('ProductInfo')}
        style={tailwind(' bg-white my-2 p-4  ')}>
        <View style={tailwind('  flex flex-row items-center mb-2 ')}>
          <FastImage
            style={tailwind('h-6 w-6 mr-2')}
            source={require('../image/news.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={
              (tailwind(' font-light text-xs '),
              {
                color: '#222655',
              })
            }>
            Asiamed ผู้จำหน่ายอุปกรณ์ทางการแพทย์คุณภาพเยี่ยม
          </Text>
        </View>
        <TouchableOpacity>
          <FastImage
            style={tailwind('h-32 w-full  rounded-md  ')}
            source={require('../image/newsblog.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <Text style={tailwind(' mt-2   font-light text-xs  text-center ')}>
          หาสินค้าไม่เจอ หรือ สอบถามเพิ่มเติม
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ติดต่อ')}>
          <Text
            style={tailwind(
              'underline  mt-2  font-light text-xs text-center text-blue-500',
            )}>
            ติดต่อเรา
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={{flex: 1}}>
      {/* <Navbar /> */}
      <View style={{backgroundColor: '#222655'}}>
        <SafeAreaView
          style={tailwind(
            'flex flex-row justify-between items-center px-4   pb-2  ',
          )}>
          <View style={tailwind('w-10 h-10    ')}></View>
          <FastImage
            style={tailwind('w-10 h-10    ')}
            source={require('../image/logo.png')}
            resizeMode={FastImage.resizeMode.contain}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditProfile', {isLogOut: true})
            }>
            <FastImage
              style={tailwind('w-8 h-8 ')}
              source={require('../image/user.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View style={styles.shadow}>
        <Contact />
      </View>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#eee'}}>
          <Youtube />
          {category.length > 0 &&
            category.map((name, index) => {
              return (
                <LoadAllProduct
                  key={index}
                  category={name}
                  index={index}
                  navigation={navigation}
                />
              );
            })}

          <News />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  // ...

  container: {
    flex: 1,

    width: '100%',
    backgroundColor: '#222655',
  },

  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    backgroundColor: '#2CADE6',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  decorate: {
    backgroundColor: '#2CADE6',
    borderRadius: 20,
    height: 100,
    width: '100%',
  },
});
