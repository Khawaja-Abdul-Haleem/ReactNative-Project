import React from 'react';
import {Pressable, StyleSheet, Text, View, Image, Switch} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {Avatar} from 'react-native-elements';
import {useState, useEffect} from 'react';

var db = openDatabase({name: 'BedtimeStrr.db'});

const Edit = ({route, navigation}) => {
  const [switchVal, setSwitchVal] = useState();
  var {ecid, name, age, pic, gender} = route.params;
  var Path = pic;
  var childName = name;
  var childAge = age;
  var childGender = gender;
  useEffect(() => {
    console.log('inuseeffect');
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Child_Tat WHERE cid=' + ecid,
          [],
          (tx, results) => {
            console.log('status', results.rows.item(0).c_weekly);
            if (results.rows.item(0).c_weekly == 'f') {
              setSwitchVal(false);
            } else {
              setSwitchVal(true);
            }
          },
        );
      });
    });
    return unsubscribe;
  }, [navigation]);
  const DeleteChild = () => {
    db.transaction(tx => {
      tx.executeSql(
        'Delete FROM Manage_Tat Where cid=' + ecid,
        [],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('child Deleted success');
            navigation.navigate('ChildLogin');
          }
        },
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        'Delete FROM Child_Tat Where cid=' + ecid,
        [],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('child Deleted success');
            navigation.navigate('ChildLogin');
          }
        },
      );
    });
  };
  let handleWEEK = () => {
    setSwitchVal(prevVal => !prevVal);
    if (switchVal == true) {
      console.log('fasle');
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Child_Tat set c_weekly=? WHERE cid=?',
          ['f', ecid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('weekly status updated');
            }
          },
        );
      });
    }
    if (switchVal == false) {
      console.log('true');

      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Child_Tat set c_weekly=? WHERE cid=?',
          ['t', ecid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('weekly status updated');
            }
          },
        );
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, width: '100%'}}>
        <Avatar
          containerStyle={{
            alignSelf: 'center',
            marginTop: 80,
          }}
          source={{uri: pic}}
          rounded
          size="xlarge"
          title=" Add"
        />
        <View>
          <Text
            style={{
              color: '#f7f7f7',
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 25,
              paddingTop: 10,
              alignSelf: 'center',
            }}>
            {name}
            {/* {age}
            {gender} */}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#3b5998',
          flex: 1,
          alignSelf: 'center',
        }}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AddChild', ecid)}>
          <Text style={styles.txt}>Edit Profile</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate('selectStories', {
              Path,
              childName,
              childAge,
              childGender,
              ecid,
            })
          }>
          <Text style={styles.txt}>Add New Stories</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => DeleteChild()}>
          <Text style={styles.txt}>Delete Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  example: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  txt: {
    fontSize: 20,
    color: '#4d648d',
    alignSelf: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#3b5998',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 200,
    backgroundColor: '#dfe3ee',
    margin: 5,
    padding: 5,
    borderRadius: 20,
    elevation: 15,
    shadowColor: 'black',
  },
});
