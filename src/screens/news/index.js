import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {_navigation, apiUrl} from '../../constants';
import NewsCard from '../../components/news/NewsCard';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
const News = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadNews = async () => {
    let token = await AsyncStorage.getItem('token');
    await fetch('https://dutsenior.herokuapp.com/api/news', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = navigation.addListener('focus', () => {
      loadNews();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {loading
          ? null
          : data.map((news, index) => (
              <NewsCard key={index} data={news} navigation={navigation} />
            ))}
      </ScrollView>
    </View>
  );
};

export default News;
