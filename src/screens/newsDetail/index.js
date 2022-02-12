import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import {Card, Input, Text, Image} from 'react-native-elements';
import {IconOutline} from '@ant-design/icons-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation, apiUrl} from '../../constants';
import styles from './styles';
const NewsDetail = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    let token = await AsyncStorage.getItem('token');
    await fetch(
      `https://dutsenior.herokuapp.com/api/news?id=` + props.route.params.id,
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
        console.log(responseJson.data);
        setData(responseJson.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadNews();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
      ) : (
        <ScrollView>
          <Image style={styles.image} source={{uri: data.image}}></Image>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.description}>{data.description} </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default NewsDetail;
