import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ProductCard from '../../components/home/ProductCard';
import {_navigation} from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import categories from '../../constants/categories.json';
import styles from './styles';
const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const renderItem = ({item}) => {
    return (
      <View style={styles.list_container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(_navigation.AllProducts, {
              category: item.name,
              navigation: navigation,
            });
          }}>
          <Image style={styles.image} source={{uri: item.image}}></Image>
          <Text style={styles.category_text}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const loadProduct = async () => {
    let token = await AsyncStorage.getItem('token');
    await fetch('https://dutsenior.herokuapp.com/api/products', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson);
        setLoading(false);
      });
  };

  const onRefresh = async () => {
    setLoading(true);
    await loadProduct();
  };

  useEffect(() => {
    setLoading(true);
    loadProduct();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        style={styles.list}
        horizontal
        keyExtractor={item => item.id}
        data={categories}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}></FlatList>
      <View style={styles.product_container}>
        <Text style={styles.header}>Top products</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(_navigation.AllProducts, {category: ''})
          }>
          <Text style={styles.view_all}>View all</Text>
        </TouchableOpacity>
      </View>
      <View>
        {data
          .sort((a, b) =>
            a.quantity > b.quantity ? 1 : b.quantity > a.quantity ? -1 : 0,
          )
          .slice(0, 10)
          .map(product => (
            <ProductCard
              key={product._id}
              click={_navigation.ProductDetail}
              navigation={navigation}
              product={product}></ProductCard>
          ))}
      </View>
    </ScrollView>
  );
};

export default Home;
