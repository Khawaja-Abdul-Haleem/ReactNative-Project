import React, {Component, useRef} from 'react';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import {View, Text, BackHandler, Alert} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {NavigationRouteContext} from '@react-navigation/native';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vid: this.props.route.params.text,
      aud: this.props.route.params.audio,
      paused: true,
      muted: false,
      controls: true,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.onStopPlay()},
    ]);
    return true;
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onStopPlay,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  onStartPlay = async () => {
    console.log('onStartPlay');
    // this.setState({
    //   constrols: false,
    //   mute: true,
    // }); because of this maximum limets are reaching
    try {
      const msg = await this.audioRecorderPlayer.startPlayer(this.state.aud);
      this.audioRecorderPlayer.seekToPlayer(1000);
    } catch (error) {
      console.log('eroor in start player');
    }
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    this.props.navigation.goBack(null);
  };
  onEnd() {
    console.log('onload');
    // setPaused(true); // if using class component,
    // this.setState({
    //   paused: true,
    // });
    // this.player.seekTo(0); // if using class component, this.playerRef.seekTo(0)
  }
  // onProgress() {
  //   console.log('here');
  // }
  // onseek() {
  //   this.player.seek(200);
  // }
  render() {
    if (this.state.aud == 'null') {
      return (
        <View style={{backgroundColor: 'darkgrey', flex: 1}}>
          <View style={{height: 250, width: 360}}>
            {/* <Text>
              {this.state.aud}
              {this.state.vid}
            </Text> */}
            <Video
              // onProgress={this.onProgress()}
              // onEnd={this.onEnd()}
              // onLoad={this.onEnd}
              // seek={this.onseek}
              source={{uri: this.state.vid}} // Can be a URL or a local file.
              // ref={ref => (videoPlayer.current = ref)}
              // Store reference
              style={{height: 250, width: 360}}
              resizeMode="cover"
              controls={this.state.controls}
              paused={this.state.paused}
              muted={this.state.muted}
            />
          </View>
        </View>
      );
    } else {
      this.onStartPlay();
      return (
        <View style={{backgroundColor: 'darkgrey', flex: 1}}>
          <View style={{height: 250, width: 360}}>
            {/* <Text>
                    {this.state.aud}
                    {this.state.vid}
                  </Text> */}
            <Video
              source={{uri: this.state.vid}} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              style={{height: 250, width: 360}}
              resizeMode="cover"
              controls={false}
              paused={false}
              muted={true}
            />
          </View>
        </View>
      );
    }
  }
}
// // method
// onEnd = () => {
//   if (this.player) {
//     this.player.seek(0);
//   }
// };

// // JSX
// <View style={styles.container}>
//    <Video
//        ref={ref => (this.player = ref)}
//        ...other props
//     />
//    ...other logic
// </Video>
