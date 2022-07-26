import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'BedtimeStr.db'});

const Temp = () => {
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  let [flatListItems, setFlatListItems] = useState([]);
  let temp = ['1'];

  const renderLabel = (label, style) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{width: 300, height: 200}}
          source={{uri: 'a' + label}}
        />
      </View>
    );
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Child_Tat', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
        }
        setFlatListItems(temp);
        console.log('this is temp', temp);
      });
    });
  }, []);

  onSelectionsChange = selectedThumbnails => {
    // selectedFruits is array of { label, value }
    setSelectedThumbnails(selectedThumbnails);
    console.log(selectedThumbnails);
    // for (let index = 0; index < selectedThumbnails.length; index++) {
    //   const element = selectedThumbnails[index].value;
    //   console.log(element);
    // }
  };

  return (
    <View>
      <SelectMultiple
        rowStyle={{backgroundColor: '#663399'}}
        checkboxStyle={{width: 24, height: 24, marginRight: 5}}
        items={temp}
        // labelStyle={{fontSize: 20, height: 30}}
        renderLabel={renderLabel}
        selectedItems={selectedThumbnails}
        // checkboxSource={{uri: 'a1'}}
        // selectedCheckboxSource={{uri: 'a2'}}
        onSelectionsChange={() => onSelectionsChange()}
      />
    </View>
  );
};
export default Temp;
