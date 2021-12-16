import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CulturalForm from '../../components/familyManage/culturalFamilyForm';
import {_navigation} from '../../constants';
import {IconFill} from '@ant-design/icons-react-native';
import Modal from 'react-native-modal';
import styles from './styles';
const FamilyDetail = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [culturalModal, setCulturalModal] = useState(false);
  const [list, setList] = useState(true);
  const [cultural, setCultural] = useState(true);
  const toggleCultural = () => {
    setCulturalModal(!culturalModal);
  };
  const toggleList = () => {
    setList(!list);
  };
  const toggleCulturalList = () => {
    setCultural(!cultural);
  };
  const handleSubmit = async (total, valid) => {
    let token = await AsyncStorage.getItem('token');

    if (valid) {
      let token = await AsyncStorage.getItem('token');
      let newRating = data.culturalFamilyRating;
      let year = new Date().getFullYear().toString();
      console.log(year);
      if (newRating.filter(e => e.year === year).length > 0) {
        console.log('Vao day co cung year');
        newRating.map((item, index) => {
          if (item.year === year.toString()) {
            item.rating = total;
          }
        });
      } else {
        newRating.push({
          year: new Date().getFullYear.toString(),
          rating: total,
        });
      }
      console.log(newRating);
      console.log('====');
      console.log(data.culturalFamilyRating);
      try {
        await fetch(
          'https://dutsenior.herokuapp.com/api/family/' + props.route.params.id,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              culturalFamilyRating: newRating,
            }),
          },
        )
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson) {
              toggleCultural();
              loadData();
            }
          });
      } catch (err) {}
    } else {
      alert('Please check your info again');
    }
  };
  const loadData = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('token');
    await fetch(
      'https://dutsenior.herokuapp.com/api/family?id=' + props.route.params.id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setData(responseJson.data);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.card_container}>
        <View style={styles.info_view}>
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.detail}>{item.memberName}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>ID Card:</Text>
          <Text style={styles.detail}>{item.memberIdCard}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Origin:</Text>
          <Text style={styles.detail}>{item.origin}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Ethnic:</Text>
          <Text style={styles.detail}>{item.ethnic}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Religion:</Text>
          <Text style={styles.detail}>{item.religion}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Occupation:</Text>
          <Text style={styles.detail}>{item.occupation}</Text>
        </View>
      </View>
    );
  };

  const renderCultural = ({item}) => {
    return (
      <View style={styles.card_container_cultural}>
        <View style={styles.info_view}>
          <Text style={styles.title}>Year:</Text>
          <Text style={styles.detail}>{item.year}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Rating:</Text>
          <Text style={styles.detail}>{item.rating}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Cultural family:</Text>
          <Text
            style={item.rating < 90 ? styles.detail_red : styles.detail_green}>
            {item.rating < 90 ? 'No' : 'Yes'}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
      ) : (
        <View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Host name:</Text>
            <Text style={styles.detail}>{data.familyOwnerName}</Text>
          </View>

          <View style={styles.info_view}>
            <Text style={styles.title}>Address:</Text>
            <Text style={styles.detail}>
              {data.address == null ? 'N/A' : data.address}
            </Text>
          </View>

          <TouchableOpacity onPress={() => toggleList()}>
            <View style={styles.info_view}>
              <Text style={styles.title}>Members:</Text>
              <Text style={styles.detail}>{data.members.length}</Text>
              <IconFill
                name={list ? 'caret-up' : 'caret-down'}
                style={styles.icon}></IconFill>
            </View>
          </TouchableOpacity>
          {list ? (
            <FlatList
              data={data.members}
              renderItem={renderItem}
              horizontal></FlatList>
          ) : null}

          <TouchableOpacity onPress={() => toggleCulturalList()}>
            <View style={styles.info_view}>
              <Text style={styles.title}>Cultural family rating:</Text>
              <Text style={styles.detail}>
                {data.culturalFamilyRating.length}
              </Text>
              <IconFill
                name={cultural ? 'caret-up' : 'caret-down'}
                style={styles.icon}></IconFill>
            </View>
          </TouchableOpacity>
          {cultural ? (
            <FlatList
              data={data.culturalFamilyRating.sort((a, b) =>
                a.year > b.year ? -1 : b.year > a.year ? 1 : 0,
              )}
              renderItem={renderCultural}
              horizontal></FlatList>
          ) : null}

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button_cultural}
              onPress={toggleCultural}>
              <Text style={styles.button_text}>Rate cultural family</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal isVisible={culturalModal} backdropOpacity={0.2}>
        <ScrollView style={styles.modal}>
          <CulturalForm
            handleSubmit={handleSubmit}
            id={props.route.params.id}
            toggleCultural={toggleCultural}
          />
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default FamilyDetail;
