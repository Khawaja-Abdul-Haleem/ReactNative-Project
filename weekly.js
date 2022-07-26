import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image, Alert} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'BedtimeStrr.db'});

const weekly = ({navigation, route}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  var ecid = route.params;
  const renderLabel = (label, style) => {
    return (
      <View>
        <Image
          resizeMode="contain"
          style={{
            width: 150,
            height: 90,
            resizeMode: 'contain',
            marginTop: -10,
          }}
          source={{uri: 'a' + label}}
        />
      </View>
    );
  };
  const onSelectionsChange = selectedThumbnails => {
    setSelectedThumbnails(selectedThumbnails);
    console.log(selectedThumbnails);
  };
  useEffect(() => {
    let d = new Date();
    console.log('day=', d.getDay(), 'this is ecid ', ecid);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Strr', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).sid.toString());
        }
        setFlatListItems(temp);
      });
    });
  }, []);
  let funfub = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Manage_Weekly(childid INTEGER NOT NULL,storyid INTEGER NOT NULL,day INTEGER NOT NULL)',
        [],
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'Delete FROM Manage_Weekly WHERE childid=?',
        [ecid],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('weekly previous Deleted success');
          }
        },
      );
    });
    db.transaction(tx => {
      console.log('comecomecome');
      tx.executeSql('SELECT * FROM Manage_Weekly', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
        }
        //   setFlatListItems(temp);
        console.log('this is temp', temp);
      });
    });
    db.transaction(txn => {
      for (let index = 0; index < selectedThumbnails.length; index++) {
        const Storyid = parseInt(selectedThumbnails[index].value);

        console.log(ecid, Storyid, index + 1);
        txn.executeSql(
          'INSERT INTO Manage_Weekly(childid,storyid,day) VALUES (?,?,?)',
          [ecid, Storyid, index + 1],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Weekly Added success',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('ChildLogin'),
                  },
                ],
                {cancelable: false},
              );
            } else alert('Registration Failed');
          },
        );
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}>
      <SelectMultiple
        checkboxStyle={{
          width: 15,
          height: 15,
          marginRight: -20,
          marginTop: 120,
        }}
        flatListProps={{numColumns: 2, key: flatListItems ? 'h' : 'v'}}
        rowStyle={{
          width: 200,
          height: 140,
          margin: 5,
        }}
        items={flatListItems}
        // labelStyle={{fontSize: 20, height: 30}}
        renderLabel={renderLabel}
        selectedItems={selectedThumbnails}
        checkboxSource={require('../assets/images/x.png')}
        selectedCheckboxSource={require('../assets/images/success.png')}
        onSelectionsChange={onSelectionsChange}
        maxSelect={7}
      />
      <Button title="Done" onPress={() => funfub()} />
    </View>
  );
};

export default weekly;

const styles = StyleSheet.create({});
