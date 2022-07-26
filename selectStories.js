import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, Alert} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {openDatabase} from 'react-native-sqlite-storage';
import {Avatar} from 'react-native-elements';
import SelectBox from 'react-native-multi-selectbox';

var db = openDatabase({name: 'BedtimeStrr.db'});
var cid;

const selectStories = ({route, navigation}) => {
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  let [flatListItems, setFlatListItems] = useState([]);
  // let [monday, setMonday] = useState(false);

  // const [Days, setDays] = useState({});

  let {Path, childName, childAge, childGender, ecid} = route.params;
  let pathh = Path;
  // const K_OPTIONS = [
  //   {
  //     item: 'Monday',
  //     id: '1',
  //   },
  //   {
  //     item: 'Tuesday',
  //     id: '2',
  //   },
  //   {
  //     item: 'Wednesday',
  //     id: '3',
  //   },
  //   {
  //     item: 'Thursday',
  //     id: '4',
  //   },
  //   {
  //     item: 'Friday',
  //     id: '5',
  //   },
  //   {
  //     item: 'Saturday',
  //     id: '6',
  //   },
  //   {
  //     item: 'Sunday',
  //     id: '7',
  //   },
  // ];
  // function onChange() {
  //   return val => setSelectedTeam(val);
  // }
  const renderLabel = (label, style) => {
    return (
      <View>
        <Image
          resizeMode="contain"
          style={{width: 130, height: 130, resizeMode: 'contain'}}
          source={{uri: 'a' + label}}
        />
        {/* <Button
          disabled={monday}
          title="monday"
          onPress={() => setMonday(true)}></Button>
        <Button title="tuesday"></Button>
        <Button title="wed"></Button>
        <Button title="thu"></Button>
        <Button title="fri"></Button>
        <Button title="sat"></Button>
        <Button title="sun"></Button> */}
      </View>
    );
  };

  useEffect(() => {
    console.log(
      'this is all data =====>',
      pathh,
      childName,
      childAge,
      childGender,
      ecid,
    );
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Strr', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).sid.toString());
        }
        console.log('this is what ', results.rows.length);
        setFlatListItems(temp);
      });
    });
    if (!ecid) {
      console.log('ecid is null in selectstories sccreen');
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * from Child_Tat JOIN Manage_Tat JOIN Strr where Child_Tat.cid=Manage_Tat.cid and Strr.sid=Manage_Tat.sid and Child_Tat.cid=' +
            ecid,
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i).sid.toString());

            setSelectedThumbnails(temp);
            console.log('this is selected thumbnials', temp);
          },
        );
      });
    }
  }, []);

  const onSelectionsChange = selectedThumbnails => {
    // selectedFruits is array of { label, value }
    setSelectedThumbnails(selectedThumbnails);
    console.log(selectedThumbnails);
    // for (let index = 0; index < selectedThumbnails.length; index++) {
    //   const element = selectedThumbnails[index].value;
    //   console.log(element);
    // }
  };

  let funfub = () => {
    if (!ecid) {
      fun();
      fub();
    } else {
      cid = ecid;
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Manage_Tat WHERE cid=' + ecid,
          (tx, results) => {
            if (results.rows.length > 0) {
              console.log('Manage delete succes');
            }
          },
        );
      });
      // db.transaction(tx => {
      //   tx.executeSql(
      //     'UPDATE Child_Table set c_name=?, c_age=? , c_gender=? ,c_pic=? where cid=?',
      //     [childName, childAge, childGender, pathh, ecid],
      //     (tx, results) => {
      //       if (results.rows.length > 0) {
      //         console.log('child update succes');
      //       }
      //     },
      //   );
      // });
      fub();
    }
  };
  let fun = () => {
    console.log('in fun');
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Child_Tat(cid INTEGER PRIMARY KEY , c_name VARCHAR(20), c_age INT(10), c_gender VARCHAR(10),c_pic VARCHAR(150),c_weekly VARCHAR(1))',
        [],
      );
    });
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Child_Weeklyy(id INTEGER PRIMARY KEY,c_day INTEGER NOT NULL,c_ind INTEGER NOT NULL,c_len INTEGER NOT NULL)',
        [],
      );
    });

    db.transaction(txn => {
      txn.executeSql('SELECT * FROM Child_Tat', [], (tx, results) => {
        var p = 0;

        cid = results.rows.length;
        cid = cid + 1;

        console.log('thhis is new cid', cid);
      });
    });
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO Child_Weeklyy(id,c_day,c_ind,c_len) VALUES (?,?,?,?)',
        [cid, 2, 2, 2],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'child weekly Successfully',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
    db.transaction(txn => {
      var p = 0;
      txn.executeSql(
        'INSERT INTO Child_Tat(cid,c_name, c_age, c_gender,c_pic,c_weekly) VALUES (?,?,?,?,?,?)',
        [cid, childName, childAge, childGender, pathh, 'f'],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            p = 1;
          }
        },
      );
      if ((p = 1)) {
        Alert.alert(
          'Success',
          'child added Successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('ChildLogin'),
            },
          ],
          {cancelable: false},
        );
      } else alert('Registration Failed');
    });
  };
  let fub = () => {
    console.log('in fub');

    db.transaction(txn => {
      txn.executeSql(
        // 'CREATE TABLE IF NOT EXISTS Manage_Tat(day INTEGER NOT NULL,cid INTEGER NOT NULL,sid INTEGER NOT NULL ,FOREIGN KEY (cid) REFERENCES Child (cid),FOREIGN KEY (sid) REFERENCES Stories (sid))',
        'CREATE TABLE IF NOT EXISTS Manage_Tat(cid INTEGER NOT NULL,sid INTEGER NOT NULL ,FOREIGN KEY (cid) REFERENCES Child (cid),FOREIGN KEY (sid) REFERENCES Stories (sid))',

        [],
      );
    });

    db.transaction(txn => {
      var p = 0;
      for (let index = 0; index < selectedThumbnails.length; index++) {
        const element = parseInt(selectedThumbnails[index].value);
        // day = day + 1;

        console.log(cid, element);
        txn.executeSql(
          'INSERT INTO Manage_Tat(cid,sid) VALUES (?,?)',
          [cid, element],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              p = 1;
            }
          },
        );
        // if (day == 7) {
        //   day = 0;
        // }
      }
      if ((p = 1)) {
        Alert.alert(
          'Success',
          'child added Successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('ChildLogin'),
            },
          ],
          {cancelable: false},
        );
      } else {
        alert('Registration Failed');
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#4267B2'}}>
      <Avatar
        containerStyle={{
          alignSelf: 'center',
          marginTop: 5,
        }}
        source={{uri: pathh}}
        rounded
        size="large"
        title=" Add"
      />
      <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
        select videos for {childName}
      </Text>
      <SelectMultiple
        // style={{width: 360}}
        checkboxStyle={{width: 17, height: 17, marginLeft: -8}}
        flatListProps={{numColumns: 2, key: flatListItems ? 'h' : 'v'}}
        rowStyle={{
          margin: 2,
          // backgroundColor: '#e3e3e3',
          // paddingBottom: 140,
          // paddingLeft: 50,
          height: 100,
          // width: 120,
        }}
        items={flatListItems}
        // labelStyle={{fontSize: 20, height: 30}}
        renderLabel={renderLabel}
        selectedItems={selectedThumbnails}
        checkboxSource={require('../assets/images/x.png')}
        selectedCheckboxSource={require('../assets/images/success.png')}
        onSelectionsChange={onSelectionsChange}
      />
      <Button title="Done" onPress={() => funfub()} />
    </View>
  );
};
export default selectStories;
