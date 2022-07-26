import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import Card from '../../Components/Card';
import {ip} from '../../Components//ip';
import MyRecievableStyle from '../MyRecievable/MyRecievableStyle';
import PushNotification from 'react-native-push-notification';

const Recievables = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');
  const [total, settotal] = useState([]);
  let v = 0;
  const {passData} = route.params;
  const Userid = passData.uid;
  // const TotalRecievable = data.map(item => {
  //   return (v = v + item.amount);
  // });
  // settotal(v);
  // console.warn(total);
  // const signin = async () => {
  //   var Ipv4Data = await fetch(ip + '/flm/api/Users/Recievables?id=' + Userid);
  //   const resjson = await Ipv4Data.json();
  //   setData(resjson);
  //   //alert(JSON.stringify(data));
  // };
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const ad = ip + '/flm/api/Users/Recieveables2?id=' + Userid;
      const response = await fetch(ad);
      const resJson = await response.json();
      if (resJson != null) {
        setData(resJson);
        setmasterData(resJson);
      } else {
        alert('Incorrect Name');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Done = tid => {
    Alert.alert('Delete Item', 'Your Friend Paid the amount ' + tid, [
      {
        text: 'Cancel',
        onPress: () => {
          getList();
        },
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => remove(tid)},
    ]);
  };
  const remove = async tid => {
    try {
      const del = ip + '/flm/api/Users/MarkTransactionPaid?tid=' + tid;
      fetch(del, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tid: tid}),
      })
        .then(response => {
          response.json();
          getList();
        })
        .catch(error => {
          console.error(error);
        });
      console.log('Item Removed');
      getList();
    } catch (error) {
      console.log(error);
    }
  };
  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You have not payed the Amount ' + item.amount,
      message: 'You have not payed the Amount ' + item.amount,
    });
  };
  function onchangeHandle(text) {
    if (text) {
      const SearchResult = data.filter(
        item =>
          item.fromuser.toLowerCase().startsWith(text.toLowerCase()) ||
          item.eventName.toLowerCase().startsWith(text.toLowerCase()) ||
          item.tdate.toLowerCase().startsWith(text.toLowerCase()) ||
          item.amount.toString().startsWith(text.toLowerCase()),
      );
      setData(SearchResult);
      setsearch(text);
    } else {
      setData(masterData);
      setsearch(text);
    }
  }
  // const searchfilter = text => {
  //   if (text) {
  //     const newData = masterData.filter(item => {
  //       const itemData = item.uname
  //         ? item.uname.toLowerCase()
  //         : ''.toLowerCase();
  //       const textData = text.toLowerCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setData(newData);
  //     setsearch(text);
  //   } else {
  //     setData(masterData);
  //     setsearch(text);
  //   }
  // };
  return (
    <View style={MyRecievableStyle.container}>
      <TextInput
        style={MyRecievableStyle.inputBox1}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder="Search here"
        placeholderTextColor="#ffffff"
        selectionColor="#fff"
        keyboardType="default"
        //onSubmitEditing={() => password.focus()}
        onChangeText={text => onchangeHandle(text)}
        value={search}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Card>
              <View>
                <Text style={{color: '#ffffff', fontSize: 20}}>
                  Event Name :{item.eventName}
                </Text>
                <Text style={{color: '#ffffff', fontSize: 20}}>
                  From :{item.fromuser}
                </Text>
                <Text style={{color: '#ffffff', fontSize: 20}}>
                  Amount :{item.amount}
                </Text>
                <Text style={{color: '#ffffff', fontSize: 20}}>
                  Event Data :{item.tdate}
                </Text>
              </View>
              <View style={MyRecievableStyle.buttonview}>
                <TouchableOpacity
                  onPress={() => Done(item.tid)}
                  style={MyRecievableStyle.button2}>
                  <Text style={MyRecievableStyle.buttonText2}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNotification(item)}
                  style={MyRecievableStyle.button1}>
                  <Text style={MyRecievableStyle.buttonText2}>Notify</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
};
export default Recievables;

// import React, {Component, useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Alert,
//   View,
//   Text,
//   StatusBar,
//   ImageBackground,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// const Flat = ({navigation, route}) => {
//   const [data, setData] = useState([]);
//   //const {passData} = route.params;
//   //const Userid = passData.uid;

//   useEffect(() => {
//     getList();
//   }, []);

//   const getList = async () => {
//     try {
//       const ad = ip + '/flm/api/Users/Recievables?id=' + Userid;
//       const response = await fetch(ad);
//       const resJson = await response.json();
//       if (resJson != null) {
//         setData(resJson);
//       } else {
//         alert('Incorrect Name');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const Done = tid => {
//     Alert.alert(
//       'Delete Item',
//       'Are you Sure you want to Delete this Item ' + id,
//       [
//         {
//           text: 'Cancel',
//           onPress: () => {
//             getList();
//           },
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => remove(tid)},
//       ],
//     );
//   };
//   const remove = async tid => {
//     try {
//       const del = ip + '/flm/api/Users/Recievables?id=' + tid;
//       fetch(del, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({tid: tid}),
//       })
//         .then(response => {
//           response.json();
//           getList();
//         })
//         .catch(error => {
//           console.error(error);
//         });
//       console.log('Item Removed');
//       getList();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={item => item.id}
//       renderItem={({item}) => (
//         <>
//           <View style={{flexDirection: 'row'}}>
//             <Text
//               style={{
//                 color: 'black',
//                 fontSize: 20,
//                 margin: 20,
//                 fontStyle: 'bold',
//               }}>
//               {item.id}
//             </Text>
//             <Text
//               style={{
//                 color: 'black',
//                 fontSize: 20,
//                 margin: 20,
//                 fontStyle: 'bold',
//               }}>
//               {item.name}
//             </Text>
//             <TouchableOpacity onPress={() => Done(item.tid)}>
//               <Text style={{color: 'black', fontStyle: 'bold'}}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     />
//   );
// };
// export default Flat;
