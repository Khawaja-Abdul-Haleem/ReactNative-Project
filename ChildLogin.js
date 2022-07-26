import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Modal,
  Animated,
  Pressable,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';

var db = openDatabase({name: 'BedtimeStrr.db'});
var len = 0;
var RandomNumber1 = Math.floor(Math.random() * 5) + 1;
var RandomNumber2 = Math.floor(Math.random() * 5) + 1;
var result;

// const ing = 'thumbnail1.jpg';
// const staticImage = require(`../assets/images/${ing}`);
// const staticImage = require('../assets/images/background1.jpg');

const ChildLogin = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [above, setAbove] = React.useState("Who's Watching?");
  const [edittxt, setEdittxt] = React.useState('Settings');
  const [Voice, setvoice] = React.useState('');
  const [Addc, setAddc] = React.useState('');
  const [results, setResults] = React.useState();

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Strr'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            // txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS Strr(sid INTEGER PRIMARY KEY AUTOINCREMENT,thumbnail VARCHAR(5), video VARCHAR(5),duration VARCHAR(15),ami VARCHAR(150),abu VARCHAR(150),dadi VARCHAR(150),title VARCHAR(30))',
              [],
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a1','v1','00:02:42','null','null','null','The Old Hound')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a2','v2','00:03:27','null','null','null','The Tree and Axe')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a3','v3','00:03:26','null','null','null','The Thief and Dog')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a4','v4','00:02:51','null','null','null','The Weaver Bird')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a5','v5','00:03:26','null','null','null','The Two Frogs')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a6','v6','00:02:34','null','null','null','Wolf and The Horse')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a7','v7','00:03:08','null','null','null','Never Give Up')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a8','v8','00:01:52','null','null','null','Dove and Ant')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a9','v9','00:03:00','null','null','null','Fox and grapes')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a10','v10','00:03:47','null','null','null','The Wise Cock & Fox')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a11','v11','00:04:55','null','null','null','The Princes & The Pia')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a12','v12','00:05:14','null','null','null','The Ugly Duck')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a13','v13','00:01:11','null','null','null','The two pots')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a14','v14','00:04:26','null','null','null','The Clever Monkey')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a15','v15','00:04:02','null','null','null','The Frog Prince')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a16','v16','00:03:30','null','null','null','Goldilocks & The 3 Bears')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a17','v17','00:03:18','null','null','null','The Three Little pigs')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a18','v18','00:05:00','null','null','null','Chicken Licken')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a19','v19','00:05:20','null','null','null','Jack & The Bean Stalk')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a20','v20','00:05:29','null','null','null','Little Red Riding Hoods')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a21','v21','00:05:09','null','null','null','Plans Of Animal')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a22','v22','00:05:25','null','null','null','William and the Octopus')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a23','v23','00:04:11','null','null','null','Animal camauflag')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a24','v24','00:02:13','null','null','null','Ant and Sparrow')",
            );
            tx.executeSql(
              "INSERT INTO Strr(thumbnail,video,duration,ami,abu,dadi,title) VALUES ('a25','v25','00:03:11','null','null','null','Horse & The Snail')",
            );
          }
        },
      );
    });

    const unsubscribe = navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Child_Tat', [], (tx, results) => {
          var temp = [];
          len = results.rows.length;
          console.log('lengt', len);
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));

          setFlatListItems(temp);
          console.log('here');
        });
      });
    });
    return unsubscribe;
  }, [navigation]);
  const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
  let listItemView = item => {
    var pic = item.c_pic;
    var ecid = item.cid;
    var name = item.c_name;
    var age = item.c_age;
    var gender = item.c_gender;
    // console.log('ind', item.cid, len);
    if (edit === false) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Main', item.cid)}
          style={{
            marginLeft: 45,
            marginTop: 55,

            // backgroundColor: 'white',
            height: 110,
            width: 110,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: 'black',
          }}>
          <Image
            style={{height: 90, width: 90, alignSelf: 'center'}}
            source={{uri: pic}}
          />
          <Text style={styles.child}>
            {item.cid}-{item.c_name}
          </Text>
        </TouchableOpacity>
      );
      // if (4 === 5) {
      //   return (
      //     <View
      //       style={{
      //         backgroundColor: 'gray',
      //         flexDirection: 'row',
      //         position: 'relative',
      //       }}>
      //       <View
      //         key={item.cid}
      //         style={{
      //           marginLeft: 48,
      //           marginVertical: 20,
      //           backgroundColor: 'red',
      //         }}>
      //         <TouchableOpacity
      //           style={{height: 110, width: 110}}
      //           onPress={() => navigation.navigate('Main', item.cid)}>
      //           <Image style={{height: 110, width: 110}} source={{uri: pic}} />
      //         </TouchableOpacity>
      //         <Text style={styles.child}>
      //           {item.cid}-{item.c_name}
      //         </Text>
      //       </View>
      //     </View>
      //   );
      // } else {
      //   console.log('else');
      //   return (
      //     <View
      //       key={item.cid}
      //       style={{
      //         marginLeft: 48,
      //         marginVertical: 20,
      //         // backgroundColor: 'red',
      //       }}>
      //       <TouchableOpacity
      //         style={{height: 110, width: 110}}
      //         onPress={() => navigation.navigate('Main', item.cid)}>
      //         <Image style={{height: 110, width: 110}} source={{uri: pic}} />
      //       </TouchableOpacity>
      //       <Text style={styles.child}>
      //         {item.cid}-{item.c_name}
      //       </Text>
      //     </View>
      //   );
      // }
    } else {
      return (
        <View
          key={item.cid}
          style={{
            marginLeft: 45,
            marginTop: 55,

            // backgroundColor: 'white',
            height: 110,
            width: 110,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            // borderRadius: 10,
            elevation: 5,
            shadowColor: 'black',
          }}>
          <Pressable
            style={{height: 90, width: 90, opacity: 0.5}}
            onPress={() =>
              navigation.navigate('Edit', {ecid, name, age, pic, gender})
            }>
            <View>
              <Image style={{height: 90, width: 90}} source={{uri: pic}} />
              <Image
                style={{
                  height: 90,
                  width: 90,
                  marginBottom: 50,
                  position: 'absolute',
                }}
                source={require('../assets/images/edit.png')}
              />
            </View>
          </Pressable>
          <Text style={styles.child}>
            {item.cid}-{item.c_name}
          </Text>
        </View>
      );
    }
  };
  // const Delete = () => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'Delete FROM Manage_Table Where cid=5',
  //       [],
  //       (tx, results) => {},
  //     );
  //   });
  // };
  const Seteditthings = () => {
    if (edit === false) {
      setEdit(true);
      setAbove('Edit Profiles?');
      setEdittxt('Done');
      setvoice('Voice Over?');
      setAddc('+');
    } else {
      setEdit(false);
      setAbove("Who's Watching?");
      setEdittxt('Settings');
      setvoice('');
      setAddc('');
    }
  };
  const handleModal = () => {
    RandomNumber1 = Math.floor(Math.random() * 20) + 3;
    RandomNumber2 = Math.floor(Math.random() * 10) + 1;
    if (edit === false) {
      setVisible(true);
    } else {
      setEdit(false);
      setAbove("Who's Watching?");
      setEdittxt('Settings');
      setvoice('');
      setAddc('');
    }
  };
  const check = result => {
    var val = RandomNumber1 + RandomNumber2;

    if (results == val) {
      console.log('right', val, RandomNumber1, RandomNumber2, results);
      setVisible(false);
      setEdit(true);
      setAbove('Edit Profiles?');
      setEdittxt('Done');
      setvoice('Voice Over?');
      setAddc('+');

      // Seteditthings();
    } else {
      console.log('wrong answer', val, RandomNumber1, RandomNumber2, results);
    }
  };
  const check1 = results => {
    var val = RandomNumber1 + RandomNumber2;

    if (results == val) {
      console.log('right', val, RandomNumber1, RandomNumber2, results);
      setVisible(false);
      setEdit(true);
      setAbove('Edit Profiles?');
      setEdittxt('Done');
      setvoice('Voice Over?');
      setAddc('+');

      // Seteditthings();
    } else {
      console.log('wrong answer', val, RandomNumber1, RandomNumber2, results);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f7f7f7'}}>
      <View
        style={{
          width: '100%',
          height: 40,
          // backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 7,
          borderBottomWidth: 1,
          borderBottomColor: '#3b5998',
        }}>
        <View>
          {edit ? (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddChild')}
                style={{
                  width: 50,
                  height: 30,
                  // backgroundColor: '#3b5998',
                  borderRadius: 20,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#3b5998',
                  }}>
                  {Addc}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View>
          {edit ? (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Whorecord')}
                style={{
                  width: 90,
                  height: '100%',
                  // backgroundColor: 'white',

                  color: '#3b5998',
                  justifyContent: 'center',
                }}>
                <Text style={styles.AddChildButtonText}>{Voice}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => handleModal()}
            // onPress={() => Seteditthings()}
            style={{width: 60, height: 40, justifyContent: 'center'}}>
            <Text style={styles.AddChildButtonText}>{edittxt}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text letterSpacing={2} style={styles.headerText}>
        {above}
      </Text>

      <View style={{flex: 9, backgroundColor: '#f7f7f7'}}>
        <FlatList
          key={flatListItems ? 'h' : 'v'}
          numColumns={2}
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        />
      </View>

      {/* modal */}
      <View>
        <ModalPoup visible={visible}>
          <View style={{flexDirection: 'column', height: 250}}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../assets/images/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                marginTop: 30,
                fontSize: 22,
              }}>
              Answer To Enable Settings
            </Text>

            <Text
              style={{
                color: 'green',
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              {RandomNumber1}+{RandomNumber2}=?
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 199,
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 20,
                marginTop: 10,
                color: 'green',
              }}
              placeholder="Answer"
              placeholderTextColor="#8b9dc3"
              // maxLength={10}
              keyboardType="numeric"
              onChangeText={result => check1(result)}
              value={result}
              maxLength={5}
            />
            {/* <TouchableOpacity
              style={{
                height: 40,
                width: 60,
                backgroundColor: '#f7f7f7',
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 20,
                justifyContent: 'center',
              }}
              onPress={() => check1(results)}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'green',
                  fontWeight: 'bold',
                }}>
                Ok
              </Text>
            </TouchableOpacity> */}
          </View>
        </ModalPoup>
      </View>
    </SafeAreaView>
  );
};

export default ChildLogin;

const styles = StyleSheet.create({
  child: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#6a1d4c',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  header: {
    height: 55,
    width: '100%',
    backgroundColor: '#663399',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b5998',
    letterSpacing: 2,
    fontStyle: 'italic',
    alignSelf: 'center',
    margin: 10,
    marginTop: 10,
  },
  profilesView: {
    height: 650,
    width: 360,
  },
  card: {
    // backgroundColor: `#eee8aa`,
    backgroundColor: `white`,

    margin: 30,
    height: 120,
    width: 120,
    borderRadius: 15,
    opacity: 0.9,
  },
  edit: {
    backgroundColor: 'red',
    height: 20,
    width: 70,
    marginTop: 130,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#000080',
    borderRadius: 12,
  },
  editText: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  AddChildButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'column',
  },
  AddChildButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  /////////////////////////////modal
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#3b5998',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 40,
    shadowColor: 'black',
  },
  mheader: {
    width: 250,
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
