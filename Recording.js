import React, {Component} from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {Button, View, Text, Alert, BackHandler} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'BedtimeStrr.db'});
var path = '';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

export default class Recording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.route.params.text,
      sid: this.props.route.params.id,
      rasta: this.props.route.params.path,
      // isLoggingIn: false,
      // recordSecs: 0,
      recordTime: '00:00:00',
      // currentPositionSec: 0,
      // currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      // test: '00:00:00',
      paused: true,
      mute: false,
      controls: true,
      showrecop: true,
      repeat: false,
      disabled: true,
      pauseplay: true,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
  //

  onStartRecord = async () => {
    this.setState({
      paused: false,
      mute: true,
      controls: false,
    });
    var name = this.state.rasta + this.state.text + '.mp4';
    path = 'storage/emulated/0/Android/data/com.app12/files/Pictures/' + name;
    console.log('new path and voice recording name', path);
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    // console.log('audioSet', audioSet);
    // const result =
    await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener(e => {
      // this.setState({
      //   test: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      // });
      // if (this.state.recordTime >= '00:10:00') {
      //   console.log('condition true now');
      //   this.onStopRecord();
      // }
      // console.log(
      //   // this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      //   this.state.test,
      // );
      this.setState({
        // recordSecs: e.currentPosition,
        pauseplay: false,
        disabled: false,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
  };
  backAction = () => {
    if (this.state.disabled == true) {
      this.props.navigation.navigate('ChildLogin');
    } else {
      Alert.alert(
        'Hold on!',
        'Recording is not completed are you sure you want to go back ??',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => this.saverecording(),
          },
        ],
      );
    }

    return true;
  };

  onStopRecord = async () => {
    console.log('this is stop record');
    const result = await this.audioRecorderPlayer.stopRecorder();
    var sid = this.state.sid;
    this.audioRecorderPlayer.removeRecordBackListener();

    this.setState({
      recordSecs: 0,
      paused: true,
      showrecop: false,
    });
    if (this.state.rasta == 'ami') {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Strr set ami=? where sid=?',
          [path, sid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('ami  save sucess');
              this.props.navigation.navigate('ChildLogin');
            }
          },
        );
      });
    }
    if (this.state.rasta == 'abu') {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Strr set abu=? where sid=?',
          [path, sid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('abu  save sucess');
              this.props.navigation.navigate('ChildLogin');
            }
          },
        );
      });
    }
    if (this.state.rasta == 'dadi') {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Strr set dadi=? where sid=?',
          [path, sid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('dadi  save sucess');
              this.props.navigation.navigate('ChildLogin');
            }
          },
        );
      });
    }

    console.log(result);
  };
  saverecording() {
    this.onStopRecord();
    this.props.navigation.navigate('ChildLogin');
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onStartPlay = async () => {
    console.log('onStartPlay');
    this.setState({
      paused: false,
      mute: true,
    });
    var name = this.state.text + '.mp4';

    path = 'storage/emulated/0/Android/data/com.app12/files/Pictures/' + name;
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    console.log(msg);
    // this.audioRecorderPlayer.addPlayBackListener(e => {
    //   this.setState({
    //     currentPositionSec: e.currentPosition,
    //     currentDurationSec: e.duration,
    //     playTime: this.audioRecorderPlayer.mmssss(
    //       Math.floor(e.currentPosition),
    //     ),
    //     duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    //   });
    //   return;
    // });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };
  onPauseRecord = async () => {
    this.setState({
      paused: true,
    });
    await this.audioRecorderPlayer.pauseRecorder();
  };
  onResumeRecord = async () => {
    this.setState({
      paused: false,
    });
    await this.audioRecorderPlayer.resumeRecorder();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  render() {
    if (this.state.showrecop == true) {
      return (
        <View style={{backgroundColor: 'black', flex: 1}}>
          <View style={{height: 250, width: 360, backgroundColor: 'black'}}>
            <Video
              source={{uri: this.state.text}} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              style={{height: 250, width: 360}}
              resizeMode="cover"
              controls={this.state.controls}
              paused={this.state.paused}
              muted={this.state.mute}
            />
            {/* <VideoPlayer
        
          source={{uri: `${this.state.text}`}} // navigator={navigator}

        
            
          /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 2,
              padding: 3,
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{margin: 5, padding: 7}}>
              <Button
                title="RECORD"
                onPress={() => this.onStartRecord()}></Button>
            </View>

            <View style={{margin: 5, padding: 7}}>
              <Button
                disabled={this.state.pauseplay}
                title="Pause"
                onPress={() => this.onPauseRecord()}></Button>
            </View>
            <View style={{margin: 5, padding: 7}}>
              <Button
                disabled={this.state.pauseplay}
                title="Resume"
                onPress={() => this.onResumeRecord()}></Button>
            </View>
            <View style={{margin: 5, padding: 7}}>
              <View style={{margin: 5, padding: 7}}>
                <Button
                  disabled={this.state.disabled}
                  title="Save this Recording"
                  onPress={() => this.onStopRecord()}></Button>
              </View>
              {/* <View style={{margin: 5, padding: 7}}>
                <Button
                  disabled={this.state.disabled}
                  title="This is Ami voice"
                  onPress={() => this.onStopRecord()}></Button>
              </View>
              <View style={{margin: 5, padding: 7}}>
                <Button
                  disabled={this.state.disabled}
                  title=" This is Abu Voice"
                  onPress={() => this.onStopRecord()}></Button>
              </View>
              <View style={{margin: 5, padding: 7}}>
                <Button
                  disabled={this.state.disabled}
                  title=" This is dadi voice"
                  onPress={() => this.onStopRecord()}></Button>
              </View> */}
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text>
              {this.state.recordTime}
              {this.state.text}
              {this.state.rasta}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor: 'black', flex: 1}}>
          <View style={{height: 250, width: 360, backgroundColor: 'pink'}}>
            <Video
              source={{uri: this.state.text}} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              style={{height: 250, width: 360}}
              resizeMode="cover"
              controls={this.state.controls}
              paused={this.state.paused}
              muted={this.state.mute}
              repeat={this.state.repeat}
            />
            {/* <VideoPlayer

          source={{uri: `${this.state.text}`}} // navigator={navigator}

          /> */}
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 20}}>
              <Button title="Play" onPress={() => this.onStartPlay()}></Button>
            </View>
            <View style={{padding: 20}}>
              <Button title="pause" onPress={() => this.onPausePlay()}></Button>
            </View>
            <View style={{padding: 20}}>
              <Button title="stop" onPress={() => this.onStopPlay()}></Button>
            </View>
          </View>
          <Text style={{alignSelf: 'center'}}>
            {this.state.playTime} / {this.state.duration}
          </Text>
        </View>
      );
    }
  }
}
