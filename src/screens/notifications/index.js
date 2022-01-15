import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import NotificationCard from '../../components/notification/NotificationCard';
import {_navigation, apiUrl} from '../../constants';
import CheckBox from '@react-native-community/checkbox';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import styles from './styles';
const Notification = ({navigation}) => {
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState([]);
  const [role, setRole] = useState();
  const [modal, setModal] = useState(false);
  const [all, setAll] = useState(true);
  const [specific, setSpecific] = useState(false);
  const [chosen, setChosen] = useState([]);
  const [to, setTo] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [show, setShow] = useState('');
  const handleTo = (newValue, item, index) => {
    let newArr = to;
    let newChosen = [...chosen];
    newChosen[index] = newValue;
    if (newValue === true) {
      newArr.push(item._id);
    } else {
      const index = newArr.indexOf(item._id);
      if (index > -1) {
        newArr.splice(index, 1);
      }
    }
    setTo(newArr);
    setChosen(newChosen);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const getRole = async () => {
    let role = await AsyncStorage.getItem('role');
    setRole(role);
    if (role === 'Manager') {
      loadContacts();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotifications();
      getRole();
      let newChosen = [];
      for (let i = 0; i < contacts.length; i++) {
        newChosen.push(false);
      }
      setChosen(newChosen);
    });

    return unsubscribe;
  }, [navigation]);

  const loadNotifications = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/users?id=` + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(
          responseJson.notification.sort((a, b) =>
            a.createdDate > b.createdDate
              ? -1
              : b.createdDate > a.createdDate
              ? -1
              : 0,
          ),
        );
      });
  };

  const loadContacts = async () => {
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setShowContacts(responseJson);
        setContacts(responseJson);
        setShow(responseJson);
        let newArr = [];
        for (let i = 0; i < responseJson.length; i++) {
          newArr.push(false);
        }
        setChosen(newArr);
      });
  };

  const renderContact = ({item, index}) => {
    return (
      <View style={styles.checkbox}>
        <CheckBox
          style={styles.check_inside}
          disabled={false}
          value={chosen[index]}
          onValueChange={newValue => {
            handleTo(newValue, item, index);
          }}
        />
        <Text style={styles.name}>{item.fullName}</Text>
      </View>
    );
  };

  const handleSend = async () => {
    let token = await AsyncStorage.getItem('token');
    if (title === '' && content === '') {
      alert('Please type something before sending');
    } else {
      if (all === true) {
        await fetch(`${apiUrl}api/notification/sendToAll`, {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title,
            body: content,
          }),
        });
        toggleModal();
        navigation.navigate(_navigation.Home);
      } else {
        let notification = {
          title: title,
          body: content,
        };
        if (to.length === 0) {
          alert('Please choose at least 1 receiver');
        } else {
          await fetch(`${apiUrl}api/notification/sendToDevice`, {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              notification: notification,
              listUser: to,
            }),
          });
          toggleModal();
          navigation.navigate(_navigation.Home);
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotifications();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>Notifications</Text>
        </View>
        {data.map((noti, index) => (
          <NotificationCard key={index} data={noti} />
        ))}
        <Modal isVisible={modal} backdropOpacity={0.2}>
          <ScrollView style={styles.modal}>
            <Text style={styles.modal_text}>Send Notification</Text>
            <View style={styles.input_component}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Type your title"
                onChangeText={val => setTitle(val)}></TextInput>
            </View>
            <View style={styles.input_component}>
              <Text style={styles.label}>Content:</Text>
              <TextInput
                style={styles.text_input_box}
                placeholder="Type your content"
                onChangeText={val => setContent(val)}
                multiline={true}></TextInput>
            </View>
            <View style={styles.input_component}>
              <Text style={styles.label}>To:</Text>
              <View style={styles.input_component_to}>
                <CheckBox
                  style={styles.check}
                  disabled={false}
                  value={all}
                  onValueChange={newValue => {
                    if (newValue === true) {
                      setAll(newValue);
                      setSpecific(false);
                    } else {
                      setAll(newValue);
                      setSpecific(true);
                    }
                  }}
                />
                <Text style={styles.check_title}>All</Text>

                <CheckBox
                  style={styles.check}
                  disabled={false}
                  value={specific}
                  onValueChange={newValue => {
                    if (newValue === true) {
                      setSpecific(newValue);
                      setAll(false);
                    } else {
                      setSpecific(newValue);
                      setAll(true);
                    }
                  }}
                />
                <Text style={styles.check_title}>Specific</Text>
              </View>
              {all ? null : (
                <View>
                  <ScrollView
                    style={styles.text_input_box_contacts}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: 20}}>
                    <FlatList
                      style={styles.flat}
                      scrollEnabled={false}
                      contentContainerStyle={{
                        alignSelf: 'flex-start',
                      }}
                      numColumns={Math.ceil(contacts.length / 3)}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={show}
                      renderItem={renderContact}
                    />
                  </ScrollView>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.modal_button_container}>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.modal_button_cancel}>
              <Text style={styles.button_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSend()}
              style={styles.modal_button}>
              <Text style={styles.button_text}>Send</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
      {role === 'Manager' ? (
        <TouchableOpacity style={styles.button} onPress={() => toggleModal()}>
          <Text style={styles.button_text_send}>+</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Notification;
