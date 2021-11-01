'use strict';

import { View ,Text,TouchableOpacity, Dimensions} from "react-native"
import React, {memo, useState, useCallback} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import tailwind from "tailwind-rn";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';

const QR = ({navigation})=>  {
    const [img,setImg] = useState()
    const onSuccess = e => {
        alert("OH WOW")
      };

    const onSelectImage = res=> {
      alert("selected",res.uri)
      if (res.uri != undefined) {
        setImg(res.uri)
        navigation.navigate("Instrument")
      }
    }
  
    
    return <View style={tailwind("bg-black flex-1")}>
    <QRCodeScanner
    style={{flex:1}}
    onRead={onSuccess}
    flashMode={RNCamera.Constants.FlashMode.torch}
    showMarker={true}
    cameraStyle={{ height: Dimensions.get('window').height * 0.50}}
    markerStyle ={styles.border}
    topContent={
      <Text style={{ height: 0,padding:0,margin:0,color:"#fff"}}>
          ค้นหาอุปกรณ์
      </Text>
    }

    bottomContent={
      <View style={tailwind("px-2 w-full  ")}>
       <TouchableOpacity onPress={()=>launchImageLibrary({mediaType:'photo' ,quality:0.7,}, onSelectImage)} style={styles.roundButtonBlue} >
        <Text  style={tailwind("text-white font-medium")}>เปิดคลังรูปภาพ</Text>
       </TouchableOpacity>
      </View>
    }
  /></View>
}

export default QR
const styles = StyleSheet.create({
  textColor: {
    color: '#222655',
    fontWeight: '500',
  },
  border:{
    borderWidth: 4,
    borderColor: "#222655",
    borderRadius: 6,
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