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
    getCart();
  }, []);

  const getCart = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    const getCart = await AsyncStorage.getItem('cart');
    let fetchData = [];
    await fetch('https://dutsenior.herokuapp.com/api/users?id=' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        fetchData = responseJson.cartDetail;
      });

    if (fetchData.length != 0) {
      if (getCart) {
        const cart = JSON.parse(getCart);
        fetchData.map(async (item, key) => {
          const index = cart.findIndex(
            item => item.id_product === item.id_product,
          );
          if (index === -1) {
            const productAdd = [
              ...cart,
              {
                id_product: item.product,
                price: item.price,
                quantity: item.quantity,
                image: item.productThumbnail,
                name: item.name,
              },
            ];
            await AsyncStorage.setItem('cart', JSON.stringify(productAdd));
          } else {
            cart &&
              (cart[index].quantity = `${
                Number.parseInt(cart[index].quantity) +
                Number.parseInt(item.quantity)
              }`);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
          }
        });
      } else {
        let productCart = [];
        fetchData.map((item, key) => {
          productCart.push({
            id_product: item.product,
            price: item.price,
            quantity: item.quantity,
            image: item.productThumbnail,
            name: item.name,
          });
        });
        await AsyncStorage.setItem('cart', JSON.stringify(productCart));
      }
    }
  };
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
