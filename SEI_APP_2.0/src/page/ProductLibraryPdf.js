import { View ,Dimensions, SafeAreaView,StyleSheet} from "react-native"
import React,{useEffect} from "react"
import Pdf from 'react-native-pdf';

const ProductLibraryPdf = ()=> {
    //const source = ;
   

    return (
        <View style={styles.container}>
        <Pdf
            source={{uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true}}
            onLoadComplete={(numberOfPages,filePath)=>{
                console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
                console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
                console.log(error);
            }}
            onPressLink={(uri)=>{
                console.log(`Link presse: ${uri}`)
            }}
            style={styles.pdf}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
export default ProductLibraryPdf
