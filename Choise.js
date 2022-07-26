import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const Choise = ({navigation, route}) => {
  var {video, ami, abu, dadi, sid} = route.params;
  const [amiView, setAmiView] = useState();
  const [abuView, setAbuView] = useState();
  const [dadiView, setDadiView] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      if (ami == 'null') {
        setAmiView(false);
      } else {
        setAmiView(true);
      }
      if (abu == 'null') {
        setAbuView(false);
      } else {
        setAbuView(true);
      }

      if (dadi == 'null') {
        setDadiView(false);
      } else {
        setDadiView(true);
      }
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#4267B2',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        style={{
          height: 40,
          width: 200,
          backgroundColor: '#f7f7f7',
          borderRadius: 10,
          justifyContent: 'center',
          elevation: 10,
          shadowColor: 'black',
        }}
        onPress={() => navigation.navigate('player2', video)}>
        <Text
          style={{color: '#3b5998', alignSelf: 'center', fontWeight: 'bold'}}>
          PLAY IN ORIGINAL VOICE
        </Text>
      </TouchableOpacity>
      <View>
        {/*Here we will return the view when state is true 
        // and will return false if state is false*/}
        {abuView ? (
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              backgroundColor: '#f7f7f7',
              marginTop: 5,
              borderRadius: 10,
              justifyContent: 'center',
              elevation: 10,
              shadowColor: 'black',
            }}
            onPress={() =>
              navigation.navigate('Player', {audio: abu, text: video})
            }>
            <Text
              style={{
                color: '#3b5998',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Listen in Father Voice
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View>
        {/*Here we will return the view when state is true 
        // and will return false if state is false*/}
        {amiView ? (
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              backgroundColor: '#f7f7f7',
              marginTop: 5,
              borderRadius: 10,
              justifyContent: 'center',
              elevation: 10,
              shadowColor: 'black',
            }}
            onPress={() =>
              navigation.navigate('Player', {audio: ami, text: video})
            }>
            <Text
              style={{
                color: '#3b5998',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Listen in Mother Voice
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View>
        {/*Here we will return the view when state is true 
        // and will return false if state is false*/}
        {dadiView ? (
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              backgroundColor: '#f7f7f7',
              marginTop: 5,
              borderRadius: 10,
              justifyContent: 'center',
              elevation: 10,
              shadowColor: 'black',
            }}
            onPress={() =>
              navigation.navigate('Player', {audio: dadi, text: video})
            }>
            <Text
              style={{
                color: '#3b5998',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Listen in GrandMother Voice
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Choise;
