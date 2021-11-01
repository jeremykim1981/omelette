import {SafeAreaView} from 'react-navigation';
import tailwind from 'tailwind-rn';
import React, {memo, useState, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListViewComponent,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const ProductLibraryInfo = () => {
  const [titles, setTitles] = useState([
    'Instant View Technology ',
    'Easy Access Bar ',
    'A Clean Affair',
    'PEEPfinder®',
    'Volatile sedation meets intensive care ventilation',
  ]);
  const [images] = useState([
    'https://hospital.loewensteinmedical.com/fileadmin/_processed_/7/b/xcsm_elisa-range-dark_7a64576960.jpg.pagespeed.ic.qJMFEcKMPI.jpg',
    'https://img.medicalexpo.com/images_me/photo-mg/69904-10716691.webp',
    'data:image/jpeg;base64,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',
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = ({item, index}) => {
    return (
      <FastImage
        style={{
          backgroundColor: '#fff',
          resizeMode: 'contain',
          borderRadius: 0,
          width: Dimensions.get('window').width,
          height: 200,
          marginTop: 0,
        }}
        source={{
          uri: item,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  };

  return (
    <SafeAreaView style={tailwind('bg-white flex-1 pb-10 ')}>
      <ScrollView>
        <View style={tailwind(' px-4')}>
          <View style={tailwind('flex flex-row justify-between items-center')}>
            <Text style={tailwind('  text-base font-medium  text-blue-500')}>
              Asiamed news
            </Text>
            <Text style={tailwind('  text-xs font-light  text-gray-500')}>
            25-06-2564
            </Text>
          </View>
          <Text
            style={tailwind('  text-lg  font-bold text-gray-700 mt-2 mb-6')}>
            Asiamed ผู้จำหน่ายอุปกรณ์ทางการแพทย์ คุณภาพเยี่ยม หนึ่งเดียวในไทย
          </Text>
        </View>
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
        <View style={tailwind(' px-4 mt-6')}>
          <Text style={tailwind('  text-sm  font-light text-gray-700 ')}>
            elisa 300 combines compact-class advantages with the performance
            characteristics of a modern universal ventilator for invasive and
            non-invasive ventilation therapy. With a peak flow of up to 300
            litres per minute, the high-performance, noise-optimised turbine
            guarantees sufficient flow capacities for mask ventilation.
          </Text>
          <Text style={tailwind('  text-sm  font-light text-gray-700 mt-4')}>
            elisa 300 combines compact-class advantages with the performance
            characteristics of a modern universal ventilator for invasive and
            non-invasive ventilation therapy. With a peak flow of up to 300
            litres per minute, the high-performance, noise-optimised turbine
            guarantees sufficient flow capacities for mask ventilation.
          </Text>
          <Text style={tailwind('  text-sm  font-light text-gray-700 mt-4')}>
            elisa 300 combines compact-class advantages with the performance
            characteristics of a modern universal ventilator for invasive and
            non-invasive ventilation therapy. With a peak flow of up to 300
            litres per minute, the high-performance, noise-optimised turbine
            guarantees sufficient flow capacities for mask ventilation.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductLibraryInfo;
