import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation, apiUrl} from '../../constants';
import styles from './styles';
const OrderDetail = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [orderDate, setOrderDate] = useState();
  const loadData = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/orders?id=` + props.route.params.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
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
  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  const handleDateFormat = input => {
    let order =
      input.getDate() +
      '/' +
      (input.getMonth() + 1) +
      '/' +
      input.getFullYear();
    return order;
  };
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
      ) : (
        <View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Order owner:</Text>
            <Text style={styles.detail}>{data.name}</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Address:</Text>
            <Text style={styles.detail}>{data.address}</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Order date:</Text>
            <Text style={styles.detail}>
              {handleDateFormat(new Date(data.createdAt))}
            </Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Status:</Text>
            <Text style={styles.detail}>{data.status}</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Total price:</Text>
            <Text style={styles.detail}>
              {handlePriceFormat(data.totalPrice)}
            </Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.title}>Order detail:</Text>
          </View>
          {data.orderDetail.map((item, i) => {
            return (
              <View style={styles.productCard} key={i}>
                <Image
                  style={styles.image}
                  source={{uri: item?.productThumbnail}}
                />
                <View style={styles.info_container}>
                  <View style={styles.name_container}>
                    <Text style={styles.name}>{item?.name}</Text>
                  </View>
                  <View style={styles.name_container}>
                    <Text style={styles.price}>
                      {handlePriceFormat(item.price * item.quantity)}
                    </Text>
                    <Text style={styles.price}>{item.quantity}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default OrderDetail;
