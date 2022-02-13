import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation, apiUrl} from '../../constants';
import styles from './styles';
const Cart = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData([]);
      _retrieveData();
    });
    return unsubscribe;
  }, [navigation]);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      if (value !== null) {
        const cart = JSON.parse(value);
        setData(cart);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const handleOrderButton = async () => {
    let id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    let productDetail = [];
    const cart = data;
    for (var i = 0; i < cart.length; i++) {
      let detail = {
        product: cart[i].id_product,
        quantity: cart[i].quantity,
        price: cart[i].price,
        productThumbnail: cart[i].image,
        name: cart[i].name,
      };
      productDetail.push(detail);
    }
    const money = await calculateTotal();
    try {
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
          if (responseJson) {
            if (responseJson.fullName) {
              if (cart !== null && productDetail.length !== 0) {
                fetch(`${apiUrl}api/orders`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    user: id,
                    name: responseJson.fullName,
                    address: responseJson.address,
                    orderDetail: productDetail,
                    totalPrice: money,
                  }),
                }).then(async response => {
                  let data = await response.json();
                  if (response.status === 200) {
                    console.log(data);
                    await AsyncStorage.removeItem('cart');
                    alert('Order successfully');
                    navigation.goBack();
                  } else {
                    alert('Something went wrong. Please try again');
                  }
                });
              } else {
                alert('Your cart is empty!');
              }
            } else {
              alert('Please update your profile first');
              navigation.navigate(_navigation.Profile);
            }
          }
        });
    } catch (error) {
      // Error checkout data
    }
  };

  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };

  const handleRemove = async i => {
    try {
      data.splice(i, 1);
      await AsyncStorage.setItem('cart', JSON.stringify(data));
      _retrieveData();
    } catch (error) {
      // Error deleting data
    }
  };

  const calculateTotal = () => {
    var total = 0;
    const cart = data;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total;
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          {data.map((item, i) => {
            return (
              <View style={styles.productCard} key={i}>
                <Image style={styles.image} source={{uri: item?.image}} />
                <View style={styles.info_container}>
                  <View style={styles.name_container}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <View style={styles.miniButton}>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemove(i)}>
                        <Text style={styles.remove}>X</Text>
                      </TouchableOpacity>
                    </View>
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
          <View style={styles.total_container}>
            <Text style={styles.total_text}>Total</Text>
            <View style={styles.miniButton}>
              <Text style={styles.total_price}>
                {handlePriceFormat(calculateTotal())}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.order_button}
            onPress={() => handleOrderButton()}>
            <Text style={styles.order_text}>Order</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Cart;
