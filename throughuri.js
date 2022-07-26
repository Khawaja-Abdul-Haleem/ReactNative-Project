import React from 'react';
import {View, Image, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Video from 'react-native-video';
// import exampleImage from './assets/Thumbnails/1.jpg';

export default function Throughuri({data}) {
  //   async function getImage() {
  //     const {default: exampleImage} = await import('./assets/Thumbnails/1.jpg');
  //     const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
  //     return exampleImageUri;
  //   }

  // for (let i = 1; i < 7; i++) {
  //   const image = '../assets/Thumbnails/' + i + '.jpg';
  //   // console.log(image);
  //   // setstate(image);

  //   // console.log(state);
  // }
  // const num = 2;
  // const i = './assets/Thumbnails/' + data?.thumbnail + '.jpg';
  // console.log(i);
  // let image = '1.jpg';
  return (
    <View>
      {/* <FlatList
        data={['v1', 'v1', 'v1']}
        renderItem={({item}) => (
          <Video
            resizeMode="contain"
            controls={true}
            source={{uri: item}} // the video file
            paused={true} // make it start
            style={{height: 150, width: 150}} // any style you want
            repeat={false} // make it a loop
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <Video
        resizeMode="contain"
        controls={true}
        source={{uri: 'v1'}} // the video file
        paused={true} // make it start
        style={{height: 150, width: 150}} // any style you want
        repeat={false} // make it a loop
      />
    </View>
  );
}
