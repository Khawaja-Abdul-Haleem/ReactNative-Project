import React, {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';
import SelectBox from 'react-native-multi-selectbox';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Button,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import {openDatabase} from 'react-native-sqlite-storage';
var childGender = '';
var db = openDatabase({name: 'BedtimeStrr.db'});
const staticImage = require('../assets/images/background1.jpg');

const AddChild = ({navigation, route}) => {
  const [filePathh, setFilePathh] = useState('');
  let [childName, setChildName] = useState('');
  let [childAge, setChildAge] = useState('');
  // let [sGender, setChildGender] = useState('');
  let [Path, setPath] = useState('childbackgroundimage2');
  const [sGender, setSelectedTeam] = useState({});

  var ecid = route.params;
  let filepath = '';
  const K_OPTIONS = [
    {
      item: 'baby boy',
      id: '1',
    },
    {
      item: 'baby girl',
      id: '2',
    },
  ];
  useEffect(() => {
    if (!ecid) {
      console.log('ecid is null');
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Child_Tat where cid = ?',
          [ecid],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              setChildName(res.c_name);
              setChildAge(res.c_age.toString());
              setSelectedTeam(res.c_gender);
              setPath(res.c_pic);
              console.log(res.c_pic);
            }
          },
        );
      });
    }
  }, []);
  function onChange() {
    return val => setSelectedTeam(val);
  }

  let register_user = () => {
    console.log('datta datta ', childName, childAge, sGender.item, filePathh);

    if (!childName) {
      alert('Please Enter Child Name');
      return;
    }
    if (!childAge) {
      alert('Please Enter Child Age');
      return;
    }
    if (!sGender.item) {
      alert('Please Enter child Gender');
      return;
    }
    if (!Path) {
      alert('Please upload picture');
      return;
    }
    if (!ecid) {
      console.log('here', sGender.item);
      childGender = sGender.item;
      navigation.navigate('selectStories', {
        Path,
        childName,
        childAge,
        childGender,
        ecid,
      });
    } else {
      console.log('here update', childName, childAge, sGender.item, Path, ecid);
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Child_Tat set c_name=?, c_age=? , c_gender=? ,c_pic=? where cid=?',
          [childName, childAge, sGender.item, Path, ecid],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('child update succes');
              navigation.navigate('ChildLogin');
            }
          },
        );
      });
    }
  };

  //   db.transaction(function (tx) {
  //     txn.executeSql(
  //       'CREATE TABLE IF NOT EXISTS Child_t(cid INTEGER PRIMARY KEY AUTOINCREMENT, c_name VARCHAR(20), c_age INT(10), c_gender VARCHAR(10),c_pic VARCHAR(150))',
  //       [],
  //     );
  //     tx.executeSql(
  //       'INSERT INTO Child_t (c_name, c_age, c_gender,c_pic) VALUES (?,?,?,?)',
  //       [childName, childAge, sGender,filePathh],
  //       (tx, results) => {
  //         console.log('Results', results.rowsAffected);
  //         if (results.rowsAffected > 0) {
  //           Alert.alert(
  //             'Success',
  //             'child added Successfully',
  //             [
  //               {
  //                 text: 'Ok',
  //                 onPress: () => navigation.navigate('selectStories'),

  //               },
  //             ],
  //             {cancelable: false},
  //           );
  //         } else alert('Registration Failed');
  //       },
  //     );
  //   });
  // };

  const selectImage = () => {
    try {
      ImageCropPicker.openPicker({
        includeBase64: true,
        cropping: true,
        width: 1000,
        height: 800,
        compressImageQuality: 1, // compressImageMaxHeight: 1, // compressImageMaxWidth: 1, compressImageMaxWidth: 1500, compressImageMaxHeight: 1000,
      }).then(image => {
        setFilePathh({uri: image?.path});
        filepath = image.path;
        console.log(filepath);
        // setData(image.data);
        // let splittedArray = image.path.split('/');
        // let filepath = splittedArray[splittedArray.length - 1];
        // console.log(filepath);
        setPath(filepath);
        // const folderPath = 'file:///storage/emulated/0';
        // const datapath = folderPath + '/' + fileName;
        // setnewfilePath(datapath);
      });
    } catch (error) {
      console.log('image picker error');
    }
  };
  // const Save = async () => {
  //   // var data = RNFS.readFile(
  //   //   filePathh,
  //   //   // 'file:///storage/emulated/0/Android/data/com.stories/files/Pictures/496fc49d-9a8b-4122-8dab-c829c2510d65.jpg',
  //   //   'base64',
  //   // ).then(res => {
  //   //   console.log(res);
  //   // });
  //   // console.log(data);
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  //   RNFS.writeFile(
  //     newfilePath,
  //     data,
  //     // 'file:///storage/emulated/0/Android/data/com.stories/files/Pictures/Stories/ '+' 496fc49d-9a8b-4122-8dab-c829c2510d65.jpg',
  //     'base64',
  //   ).then(res => {
  //     console.log(res);
  //   });
  //   const myAlbumPath = RNFS.PicturesDirectoryPath + '/My Album';

  //   RNFS.mkdir(
  //     myAlbumPath,
  //   ).then(/* write/copy/download your image file into myAlbumPath here */);
  // };

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={{
          alignSelf: 'center',
          backgroundColor: '#833471',
          marginTop: 40,
          marginBottom: 40,
          elevation: 10,
          shadowColor: 'black',
        }}
        source={{uri: Path}}
        rounded
        size="xlarge"
        title=" Add"
        onPress={() => selectImage()}
        // activeOpacity={0.2}
      />
      <TextInput
        style={styles.input}
        // underlineColorAndroid="transparent"
        placeholder="Name.."
        placeholderTextColor="#8b9dc3"
        autoCapitalize="none"
        onChangeText={childName => setChildName(childName)}
        value={childName}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Age.."
        placeholderTextColor="#8b9dc3"
        // maxLength={10}
        keyboardType="numeric"
        onChangeText={childAge => setChildAge(childAge)}
        value={childAge}
        maxLength={1}
      />
      <View>
        <SelectBox
          label="Gender"
          labelStyle={{
            color: '#f7f7f7',
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}
          optionsLabelStyle={{color: '#f7f7f7', fontWeight: 'bold'}}
          listEmptyLabelStyle={{color: '#f7f7f7', alignSelf: 'center'}}
          selectedItemStyle={{color: '#f7f7f7'}}
          optionContainerStyle={{alignSelf: 'center', width: 300}}
          options={K_OPTIONS}
          value={sGender}
          onChange={onChange()}
          hideInputFilter={false}
          toggleIconColor="white"
          containerStyle={{width: 300, alignSelf: 'center'}}
          inputFilterStyle={{alignSelf: 'center'}}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => register_user()}>
        <Text style={styles.submitButtonText}> Next </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4267B2',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#dfe3ee',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    elevation: 25,
    shadowColor: 'black',
    color: '#8b9dc3',
  },
  submitButton: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 10,
    elevation: 25,
    shadowColor: 'black',
  },
  submitButtonText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
// import React, {useState, useEffect} from 'react';
// import ImageCropPicker from 'react-native-image-crop-picker';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';

// const AddChild = () => {
// const [filePath, setFilePath] = useState(filePath);

// const selectImage = () => {
//   ImageCropPicker.openPicker({
//     includeBase64: true,
//     width: 150,
//     height: 150,
//     cropping: true,
//   }).then(image => {
//     const splittedArray = image.path.split('/');
//     console.log(image.data);
//     const fileName = splittedArray[splittedArray.length - 1];
//     console.log(fileName);
//     const folderPath = '/storage/emulated/0/Stories';
//     const filePath = folderPath + '/' + fileName;
//     console.log(filePath);
//   });
// };

//   return (
//     <View style={styles.container}>
// <Avatar
//   containerStyle={{
//     alignSelf: 'center',
//     backgroundColor: 'red',
//     marginTop: 40,
//     marginBottom: 40,
//   }}
//   rounded
//   size="xlarge"
//   title="MA"
//   onPress={() => selectImage()}
//   // activeOpacity={0.2}
//   source={filePath}
// />
//       <TextInput
//         style={styles.input}
//         underlineColorAndroid="transparent"
//         placeholder="Name.."
//         placeholderTextColor="#9a73ef"
//         autoCapitalize="none"
//         // onChangeText={handleinput}
//       />

//       <TextInput
//         style={styles.input}
//         underlineColorAndroid="transparent"
//         placeholder="Age.."
//         placeholderTextColor="#9a73ef"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         underlineColorAndroid="transparent"
//         placeholder="Gender.."
//         placeholderTextColor="#9a73ef"
//         autoCapitalize="none"
//       />

//       <TouchableOpacity style={styles.submitButton}>
//         onPress={() => saveimage()}
//         <Text style={styles.submitButtonText}> Next </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default AddChild;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 23,
//     backgroundColor: 'black',
//     flex: 1,
//   },
//   input: {
//     margin: 15,
//     height: 40,
//     borderColor: '#7a42f4',
//     borderWidth: 1,
//   },
//   submitButton: {
//     backgroundColor: '#7a42f4',
//     padding: 10,
//     margin: 15,
//     height: 40,
//   },
//   submitButtonText: {
//     color: 'white',
//     alignSelf: 'center',
//   },
// });
