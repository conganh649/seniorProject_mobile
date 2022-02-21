import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {_navigation} from '../../constants';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
const Utils = ({navigation}) => {
  const [culturalModal, setCulturalModal] = useState(false);
  const [status, setStatus] = useState();
  const toggleCultural = () => {
    setCulturalModal(!culturalModal);
  };

  const handleConfirm = () => {
    console.log(status);
    navigation.navigate(_navigation.CulturalFamily, {
      status: status,
      navigation: navigation,
    });
    toggleCultural();
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate(_navigation.Military)}>
          <IconOutline name="user" style={styles.icon}></IconOutline>
          <Text style={styles.detail}>
            {new Date().getFullYear().toString()} Military Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => toggleCultural()}>
          <IconOutline name="home" style={styles.icon}></IconOutline>
          <Text style={styles.detail}>Cultural Families</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={culturalModal} backdropOpacity={0.2}>
        <View style={styles.modal}>
          <Text style={styles.modal_text}>Pick a year</Text>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
            <Picker.Item label="2018" value="2018" style={styles.picker_text} />
            <Picker.Item label="2019" value="2019" style={styles.picker_text} />
            <Picker.Item label="2020" value="2020" style={styles.picker_text} />
            <Picker.Item label="2021" value="2021" style={styles.picker_text} />
            <Picker.Item label="2022" value="2022" style={styles.picker_text} />
          </Picker>
          <View style={styles.modal_button_container}>
            <TouchableOpacity
              onPress={toggleCultural}
              style={styles.modal_button_cancel}>
              <Text style={styles.button_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleConfirm()}
              style={styles.modal_button}>
              <Text style={styles.button_text}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Utils;
