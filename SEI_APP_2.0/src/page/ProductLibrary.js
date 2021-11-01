import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListViewComponent,
  ScrollView,
  Button,
} from 'react-native';
import React, {memo, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import YouTube from 'react-native-youtube';
import tailwind from 'tailwind-rn';

const ProductLibrary = ({navigation}) => {
  const [blogs, setBlogs] = useState([
    'How to start ventilation with the ventilator prisma VENT50-C. ',
    'How to start ventilation with the ventilator prisma VENT60-C. ',
    'How to start ventilation with the ventilator prisma VENT70-C. ',
  ]);
  const [howtos, setHowtos] = useState([
    'การดูแลรักษาเครื่อง Elisa 300 ',
    'การดูแลรักษาเครื่อง Elisa 600 ',
    'การดูแลรักษาเครื่อง Elisa 800',
  ]);
  const [files, setFiles] = useState([
    {name:"Academic Journal of Community Public Health",date:"06/08/2021"},
    {name:"Academic Journal of Community Public Health",date:"06/08/2021"},
    {name:"Academic Journal of Community Public Health",date:"06/08/2021"},
    {name:"Academic Journal of Community Public Health",date:"06/08/2021"},
  ]);

  const Card = memo(({name = ''}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('ProductLibaryInfo')}
        style={tailwind(
          ' flex justify-center items-center  rounded-md w-80 relative  ',
        )}>
        <FastImage
          style={tailwind('h-48  w-80 rounded-md ')}
          source={require('../image/newsblog.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={tailwind(
            '  w-full  h-14 px-2  absolute bg-black bg-opacity-60  rounded-md rounded-t-none bottom-0 flex justify-center items-center    ',
          )}>
          <Text style={tailwind(' font-medium text-sm  text-white     ')}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
  const Youtube = memo(({name = ''}) => {
    return (
      <TouchableOpacity
        style={tailwind(
          ' flex justify-center items-start  rounded-md w-80 relative  ',
        )}>
        <View style={tailwind(' w-80')}>
          <YouTube
            videoId="RXKU7HbsxcM" // The YouTube video ID
            play = {false} // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            style={{alignSelf: 'stretch', height: 200}}
            
          />
        </View>
        
          <Text style={tailwind(' font-medium text-sm  text-gray-700 mt-1  h-10   ')}>
            {name}
          </Text>
        
      </TouchableOpacity>
    );
  });
  const PDFRow = memo(({name = '',date='',index}) => {
    return (
        <TouchableOpacity onPress={()=> navigation.navigate("ProductLibaryPdf")}>
        <View
          style={tailwind((index %2 == 0 ?' bg-gray-100 ':'bg-white') + ' px-4  flex flex-row justify-between py-1 ')}>
          <Text style={tailwind(' font-light   w-60 h-10  text-gray-700 ')}>
            {name}
          </Text>
          <Text style={tailwind(' font-light text-xs  text-gray-500 ')}>
            {date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
  return <View></View>

  return (
    <ScrollView style={tailwind(' bg-white flex-1 py-4 ')}>
      <View style={tailwind(' px-4')}>
        <Text style={tailwind(' font-medium text-xl mb-2 text-gray-700 ')}>
          Asiamed news
        </Text>
        <ScrollView horizontal={true} style={tailwind('flex flex-row pb-6')}>
          {blogs.map((blog, index) => {
            return (
              <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                <Card name={blog} />
                {/* <Card img='../image/Product.png' name="Elisa 300" /> */}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={tailwind(' px-4')}>
        <Text style={tailwind(' font-medium text-xl mb-2 text-gray-700 ')}>
          การใช้งานเครื่องแต่ละ Model
        </Text>
        <ScrollView horizontal={true} style={tailwind('flex flex-row pb-6')}>
          {howtos.map((howto, index) => {
            return (
              <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                <Youtube name={howto} />
                {/* <Card img='../image/Product.png' name="Elisa 300" /> */}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={tailwind(' px-4')}>
        <Text style={tailwind(' font-medium text-xl mb-2 text-gray-700 ')}>
          การดูแลรักษาเครื่องแต่ละ Model
        </Text>
        <ScrollView horizontal={true} style={tailwind('flex flex-row pb-6')}>
          {howtos.map((howto, index) => {
            return (
              <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                <Youtube name={howto} />
                {/* <Card img='../image/Product.png' name="Elisa 300" /> */}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={tailwind(' px-4')}>
        <Text style={tailwind(' font-medium text-xl mb-2 text-gray-700 ')}>
          ปัญหาและแนวทางแก้ไข
        </Text>
        <ScrollView horizontal={true} style={tailwind('flex flex-row pb-6')}>
          {howtos.map((howto, index) => {
            return (
              <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                <Youtube name={howto} />
                {/* <Card img='../image/Product.png' name="Elisa 300" /> */}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View >
        <Text style={tailwind(' px-4 font-medium text-xl mb-2 text-gray-700 ')}>
          Knowledge
        </Text>
        {files.map((file, index) => {
            return (
              <View key={index} style={tailwind('mr-2 flex-shrink-0')}>
                <PDFRow name={file.name} date={file.date} index={index}/>
                {/* <Youtube name={howto} /> */}
                
              </View>
            );
          })}
      </View>

      {/* <View>
          <Button
            title="Tap"
            onPress={() => navigation.push('ProductLibaryInfo')}></Button>
        </View> */}
    </ScrollView>
  );
};
export default ProductLibrary;
