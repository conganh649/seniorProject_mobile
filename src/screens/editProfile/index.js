import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import {_navigation} from '../../constants';
import styles from './styles';
const EditProfile = ({navigation}) => {
  const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  let dateString =
    date.getUTCDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getUTCFullYear();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.input_component}>
        <Text style={styles.input_label}>ID Card</Text>
        <View style={styles.input_container}>
          <IconOutline name="idcard" style={styles.icon} />
          <TextInput
            placeholder="Type your ID Card"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Phone number</Text>
        <View style={styles.input_container}>
          <IconOutline name="phone" style={styles.icon} />
          <TextInput
            placeholder="Type your phone number"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Fullname</Text>
        <View style={styles.input_container}>
          <IconOutline name="user" style={styles.icon} />
          <TextInput
            placeholder="Type your fullname"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Address</Text>
        <View style={styles.input_container}>
          <IconOutline name="compass" style={styles.icon} />
          <TextInput
            placeholder="Type your address"
            style={styles.input}
            autoCapitalize="none"></TextInput>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Gender</Text>
        <View style={styles.input_container}>
          <IconOutline name="user" style={styles.icon} />
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            style={styles.input}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      <View style={styles.input_component}>
        <Text style={styles.input_label}>Date of birth</Text>
        <View style={styles.input_container}>
          <IconOutline name="calendar" style={styles.icon} />
          <TextInput style={styles.input} editable={false}>
            {dateString}
          </TextInput>
          <TouchableOpacity onPress={showDatepicker} style={styles.date_button}>
            <Text style={styles.date_text}>Change</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.submit_button}>
        <Text style={styles.submit_text}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
