import {SafeAreaView} from 'react-navigation';
import tailwind from 'tailwind-rn';
import React, {memo, useState, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import RenderHtml from 'react-native-render-html';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListViewComponent,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useEffect} from 'react/cjs/react.development';
import {API} from '../api';
import {getPathUrl} from '../functions';

const ProductInfo = ({navigation, route}) => {
  // const [titles, setTitles] = useState([
  //   'Instant View Technology ',
  //   'Easy Access Bar ',
  //   'A Clean Affair',
  //   'PEEPfinder®',
  //   'Volatile sedation meets intensive care ventilation',
  // ]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState('');

  const {width} = useWindowDimensions();

  useEffect(() => {
    LoadProduct();
  }, []);

  const LoadProduct = async () => {
    try {
      setLoading(true);
      const {data} = await API().get(`/products/${route.params.id}`);
      if (data.product) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log('ERROR_LOAD_PRODUCT : ', error.response);
    } finally {
      setLoading(false);
    }
  };

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

  // const Bullet = memo(({name = ''}) => {
  //   return (
  //     <View>
  //       {titles.map((title, index) => {
  //         return (
  //           <Text
  //             key={index}
  //             style={tailwind('  text-sm  font-light text-gray-700 mt-2')}>
  //             {' '}
  //             {'\u2022'}
  //             {title}
  //           </Text>
  //         );
  //       })}
  //     </View>
  //   );
  // });
  const source = {
    html: product.description,
  };

  return (
    <SafeAreaView style={tailwind('bg-white flex-1 ')}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          <View style={tailwind(' px-4')}>
            <Text style={tailwind('  text-base font-medium  text-gray-500')}>
              {/* {product.category.label} */}
            </Text>
            <Text style={tailwind('  text-2xl  font-bold text-gray-700 mt-2')}>
              {product.name}
            </Text>
            <Text
              style={tailwind('  text-base  font-semibold text-gray-700 mt-2')}>
              {product.title}
            </Text>
          </View>
          <Carousel
            layout={'default'}
            // data={images}
            data={
              product.multiImage.length > 0 &&
              product.multiImage.map(row => {
                return getPathUrl(row);
              })
            }
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            renderItem={_renderItem}
            autoplay={true}
            autoplayInterval={5000}
            loop={true}
            onSnapToItem={index => setActiveSlide(index)}
          />

          <Pagination
            // data={images.length}
            dotsLength={product.multiImage.length}
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
          <View style={tailwind(' px-4')}>
            <View style={tailwind('  text-sm  font-light text-gray-700 mt-2')}>
              <RenderHtml
                contentWidth={width}
                source={source}
                enableExperimentalMarginCollapsing={true}
              />
            </View>
            {/* <Bullet /> */}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductInfo;
