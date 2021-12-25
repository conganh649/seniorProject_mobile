import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
const CulturalForm = props => {
  const [data, setData] = useState([]);
  const [valid, setValid] = useState(false);
  const [total, setTotal] = useState(0);
  const handleInputChange = async (index, validation, val) => {
    let newData = [...data];
    if (val >= 0 && val <= validation) {
      newData[index] = val;
      setData(newData);
      setValid(true);
      setTotal(
        newData.reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0),
      );
    } else {
      setValid(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.info_view}>
        <Text style={styles.title_header}>
          You are rating cultural family for {new Date().getFullYear()}
        </Text>
      </View>
      <View style={styles.info_view}>
        <Text style={styles.title}>1. Obey laws and rules</Text>
      </View>

      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>a. No law violation</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(0, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>b. No community rule violation</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(1, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>c. Hang national flag correctly</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(2, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>d. Participate in cultural events</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(3, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>e. Behave politely in events</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(4, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>f. Conserve cultural heritage </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(5, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>g. Keep environment clean </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(6, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>h. Join social activities </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(7, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>i. No food safe violation </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(8, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>j. No fire protection violation </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(9, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>k. No traffic law violation </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(10, 2, val)}></TextInput>
        <Text style={styles.sub_title_point}>/2</Text>
      </View>

      {/* ============ */}

      <View style={styles.info_view}>
        <Text style={styles.title}>2. Be happy and be helpful</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>a. Caring family members </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(11, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>b. Modern & loyal marriage </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(12, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>c. Population & gender equality </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(13, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>d. Join health insurance </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(14, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>e. Members behave politely </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(15, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>e. Support others </Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(16, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>

      {/* ============ */}

      <View style={styles.info_view}>
        <Text style={styles.title}>3. Effective study and work</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>a. Stable & legal finance</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(17, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>b. Join social programs</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(18, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>c. Workforce has stable job</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(19, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>d. Students can go to school</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(20, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>e. Fresh water usage</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(21, 5, val)}></TextInput>
        <Text style={styles.sub_title_point}>/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>f. Hygiene lifestyle</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(22, 3, val)}></TextInput>
        <Text style={styles.sub_title_point}>/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>g. Social news accessibility</Text>
        <TextInput
          style={styles.sub_title_point_input}
          keyboardType="numeric"
          onChangeText={val => handleInputChange(23, 2, val)}></TextInput>
        <Text style={styles.sub_title_point}>/2</Text>
      </View>

      <View style={styles.info_view_total}>
        <Text style={styles.title}>TOTAL:</Text>
        <Text style={styles.detail}>{total}/100:</Text>
      </View>

      {/* ========== */}

      <View style={styles.modal_button_container}>
        <TouchableOpacity
          onPress={props.toggleCultural}
          style={styles.modal_button_cancel}>
          <Text style={styles.button_text}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modal_button}
          onPress={() => props.handleSubmit(total, valid)}>
          <Text style={styles.button_text}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CulturalForm;
