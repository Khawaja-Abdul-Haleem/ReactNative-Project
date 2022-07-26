import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LottieView from 'lottie-react-native';

import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import ChildHeader from '../components/ChildHeader';
import {openDatabase} from 'react-native-sqlite-storage';
var cid;
var index;
var day;
var length;
var db = openDatabase({name: 'BedtimeStrr.db'});

function Home({navigation}) {
  let [flatListItems, setFlatListItems] = useState([]);
  const [isweekly, setIsweekly] = useState();
  var [indexx, setIndexx] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Child_Tat WHERE cid=' + cid,
          [],
          (tx, results) => {
            console.log('status', results.rows.item(0).c_weekly);
            if (results.rows.item(0).c_weekly == 'f') {
              setIsweekly(false);
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT * from Child_Tat JOIN Manage_Tat JOIN Strr where Child_Tat.cid=Manage_Tat.cid and Strr.sid=Manage_Tat.sid and Child_Tat.cid=' +
                    cid,
                  [],
                  (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      temp.push(results.rows.item(i));
                      // if (i == 3) {
                      //   console.log('break');
                      //   break;
                      // }
                    }
                    setFlatListItems(temp);
                    // console.log('this is temp', temp);
                  },
                );
              });
            } else {
              setIsweekly(true);
              ////////FIrst step

              db.transaction(tx => {
                tx.executeSql(
                  'SELECT * from Child_Tat JOIN Manage_Tat JOIN Strr where Child_Tat.cid=Manage_Tat.cid and Strr.sid=Manage_Tat.sid and Child_Tat.cid=' +
                    cid,
                  [],
                  (tx, results) => {
                    length = results.rows.length;
                    console.log('length process getting length ', length);
                  },
                );
              });
              db.transaction(tx => {
                tx.executeSql(
                  'UPDATE Child_Weeklyy set c_len=? WHERE id=?',
                  [length, cid],
                  (tx, results) => {
                    if (results.rowsAffected > 0) {
                      console.log('update length process done');
                    }
                  },
                );
              });
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT * from Child_Weeklyy WHERE id=' + cid,
                  [],
                  (tx, results) => {
                    var ind = results.rows.item(0).c_ind;
                    console.log(
                      'index is this now this index is got ',
                      results.rows.item(0).c_ind,
                    );
                    index = ind;
                    setIndexx(ind);
                    console.log('after updating react side index=', index);
                  },
                );
              });
              db.transaction(tx => {
                tx.executeSql(
                  'SELECT * from Child_Weeklyy WHERE id=' + cid,
                  [],
                  (tx, results) => {
                    console.log('day is ', results.rows.item(0).c_day);
                    var d = new Date();
                    day = results.rows.item(0).c_day;

                    console.log(
                      'comparing this current day ',
                      d.getDay(),
                      'and this database day',
                      day,
                    );
                    if (d.getDay() == day) {
                      console.log('remains same');
                      console.log('index======', index);
                    } else {
                      db.transaction(tx => {
                        tx.executeSql(
                          'UPDATE Child_Weeklyy set c_day=? WHERE id=?',
                          [d.getDay(), cid],
                          (tx, results) => {
                            if (index == length) {
                              index = 1;
                              console.log('index assign 1');
                            } else {
                              console.log('index + 1');

                              index = index + 1;
                            }
                            db.transaction(tx => {
                              tx.executeSql(
                                'UPDATE Child_Weeklyy set c_ind=? WHERE id=?',
                                [index, cid],
                                (tx, results) => {
                                  if (results.rowsAffected > 0) {
                                    console.log('index updated ');
                                  }
                                },
                              );
                            });
                          },
                        );
                      });
                    }
                  },
                );
              });

              // db.transaction(tx => {
              //   tx.executeSql(
              //     'SELECT * from Child_Weekly WHERE' + cid,
              //     [],
              //     (tx, results) => {
              //       console.log('ind is ', results.rows.item(0).c_ind);

              //       // if (results.rows.item(0).c_ind == length) {
              //       //     index=1
              //       // }
              //       // else{
              //       //   index=index+1
              //       // }
              //     },
              //   );
              // });
              // db.transaction(tx => {
              //   tx.executeSql(
              //     'SELECT * from Child_Weekly WHERE' + cid,
              //     [],
              //     (tx, results) => {
              //       console.log('day is ', results.rows.item(0).c_day);
              //       var d = new Date();
              //       var curday
              //       console.log('current day is ', d.getDay());
              //       curday=d.getDay();
              //       if (results.rows.item(0).c_day == curday) {

              //       }
              //     },
              //   );
              // });
            }
          },
        );
      });
    });
    return unsubscribe;
  }, [navigation]);
  let handleVideo = item => {
    var video = item.video;
    var ami = item.ami;
    var dadi = item.dadi;
    var abu = item.abu;
    var sid = item.sid;
    console.log('ami path=', ami, 'abu path=', abu, 'dadi path=', dadi);

    if (ami == 'null' && abu == 'null' && dadi == 'null') {
      // navigation.navigate('Player', {text: item.video, audio: 'null'});
      navigation.navigate('player2', video);
    } else {
      navigation.navigate('Choise', {video, ami, abu, dadi, sid});
    }
  };

  let listItemView = item => {
    return (
      <View style={{backgroundColor: '#4267B2', flex: 1}}>
        <TouchableOpacity style={styles.card} onPress={() => handleVideo(item)}>
          <Image
            style={{width: 170, height: 120}}
            resizeMode="contain"
            source={{uri: item.thumbnail}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  if (isweekly == false) {
    return (
      <View style={{flex: 1}}>
        <ChildHeader />
        <View style={{backgroundColor: '#4267B2', flex: 1}}>
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
  } else {
    return (
      <View style={{flex: 1}}>
        <ChildHeader />
        <View style={{backgroundColor: '#4267B2', flex: 1}}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleVideo(item)}>
            <Image
              style={{width: 170, height: 120}}
              resizeMode="contain"
              source={{uri: 'a' + indexx}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Drawer = createDrawerNavigator();

export default function Main({route, navigation}) {
  cid = route.params;
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      // drawerContent={() => {
      //   return (
      //     <SafeAreaView style={{flex: 1}}>
      //       <View
      //         style={{
      //           height: 100,
      //           alignItems: 'center',
      //           justifyContent: 'center',
      //           backgroundColor: 'black',
      //         }}>
      //         <Image
      //           source={require('../assets/images/back.png')}
      //           style={{height: 200, width: 200}}
      //           resizeMode="contain"
      //         />
      //       </View>
      //     </SafeAreaView>
      //   );
      // }}
      screenOptions={{
        drawerIcon: ({focused, size}) => (
          <Image
            source={require('../assets/images/back.png')}
            style={[
              focused ? styles.drawerActive : styles.drawerInActive,
              {height: 20, width: 20},
            ]}
          />
        ),
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 230,
        },
        headerStyle: {
          // backgroundColor: 'rgba(52, 52, 52, alpha)',
          height: 290,
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerBackground: () => (
          <Image
            resizeMode="cover"
            style={{height: 290, width: 360}}
            source={require('../assets/images/childbackgroundimage3.jpg')}
          />
          // <LottieView
          //   colorFilters={[
          //     {
          //       keypath: 'button',
          //       color: '#F00000',
          //     },
          //     {
          //       keypath: 'Sending Loader',
          //       color: '#F00000',
          //     },
          //   ]}
          //   style={styles.lottie}
          //   source={require('../assets/16277-night-animation.json')}
          //   autoPlay
          //   loop></LottieView>
        ),
      }}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 70,
    height: 130,
  },

  card: {
    width: 170,
    height: 110,
    // opacity: 0.9,
    margin: 5,
    // overflow: 'hidden',
  },
});
