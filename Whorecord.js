import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Whorecord = ({navigation}) => {
  var Father = 'abu';
  var mother = 'ami';
  var grandmother = 'dadi';
  return (
    <View style={styles.container}>
      <Text style={{color: 'green', fontSize: 30, fontWeight: 'bold'}}>
        Who is Recording?
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#dfe3ee',
          height: 100,
          width: 160,
          margin: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        onPress={() => navigation.navigate('VoiceOver', Father)}>
        <Text style={styles.txt}>I AM FATHER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#dfe3ee',
          height: 100,
          width: 160,
          margin: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        onPress={() => navigation.navigate('VoiceOver', mother)}>
        <Text style={styles.txt}>I AM MOTHER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#dfe3ee',
          height: 100,
          width: 160,
          margin: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        onPress={() => navigation.navigate('VoiceOver', grandmother)}>
        <Text style={styles.txt}>I AM GRANDMOTHER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Whorecord;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    flex: 1,
    padding: 10,
  },
  txt: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
});
