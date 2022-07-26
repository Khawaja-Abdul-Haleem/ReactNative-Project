import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'BedtimeStrr.db'});

export default function VoiceOver({navigation, route}) {
  let [flatListItems, setFlatListItems] = useState([]);
  var gardian = route.params;
  useEffect(() => {
    console.log(gardian);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Strr', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
        // console.log('this is temp', temp);
      });
    });
  }, []);
  let listItemView = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
        }}>
        <View
          key={item.cid}
          style={{
            margin: 15,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={{height: 100, width: 150}}
            onPress={() =>
              navigation.navigate('Recording', {
                text: item.video,
                id: item.sid,
                path: gardian,
              })
            }>
            <Image
              style={{height: 100, width: 150}}
              source={{uri: item.thumbnail}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#4267B2'}}>
        <View
          style={{
            height: 40,
            width: 360,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Pick Story to voice Over
          </Text>
        </View>
        <FlatList
          key={flatListItems ? 'h' : 'v'}
          data={flatListItems}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
