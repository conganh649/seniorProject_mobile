import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes,
  TextInput,
} from 'react-native';
import {Card, Input, Text, Image} from 'react-native-elements';
import {IconOutline} from '@ant-design/icons-react-native';
import Header from '../../components/header';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation, apiUrl} from '../../constants';
import styles from './styles';
const ProductDetail = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState('1');
  const [price, setPrice] = useState();
  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  const loadProduct = async () => {
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/products/` + props.route.params.id, {
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
        setPrice(
          (Number.parseInt(number) * responseJson.price)
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
        );
        setLoading(false);
      });
  };

  const handleAddNumber = () => {
    let newNumber = Number.parseInt(number);
    ++newNumber;
    setNumber(`${newNumber}`);
    setPrice(
      (Number.parseInt(newNumber) * data.price)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
    );
  };
  const handleMinusNumber = () => {
    let newNumber = Number.parseInt(number);
    --newNumber;
    setNumber(`${newNumber}`);
    setPrice(
      (Number.parseInt(newNumber) * data.price)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
    );
  };
  const handleAddPress = async () => {
    console.log(Number.parseInt(number));
    console.log(data.quantity);
    if (Number.parseInt(number) > Number.parseInt(data.quantity)) {
      alert('Invalid number of product');
    } else {
      const getCart = await AsyncStorage.getItem('cart');
      if (getCart) {
        const cart = JSON.parse(getCart);
        const index = await cart.findIndex(
          item => item.id_product === data._id,
        );
        if (index === -1) {
          const productAdd = [
            ...cart,
            {
              id_product: data._id,
              price: data.price,
              quantity: number,
              image: data.productThumbnail,
              name: data.productName,
            },
          ];
          await AsyncStorage.setItem('cart', JSON.stringify(productAdd));
        } else {
          cart &&
            (cart[index].quantity = `${
              Number.parseInt(cart[index].quantity) + Number.parseInt(number)
            }`);
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
        }
      } else {
        await AsyncStorage.setItem(
          'cart',
          JSON.stringify([
            {
              id_product: data._id,
              price: data.price,
              quantity: number,
              image: data.productThumbnail,
              name: data.productName,
            },
          ]),
        );
      }
      alert('Add to cart successfully');
      props.navigation.goBack();
    }
  };

  useEffect(() => {
    setLoading(true);
    loadProduct();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        headerName="Product detail"
        navigation={props.navigation}></Header>
      {loading ? (
        <ActivityIndicator size="large" color="red"></ActivityIndicator>
      ) : (
        <View>
          <Image
            style={styles.img}
            source={{uri: data.productThumbnail}}></Image>
          <View style={styles.detail}>
            <Text style={styles.product_name}>{data.productName}</Text>
            <Text style={styles.price}>{handlePriceFormat(data.price)}</Text>
            <Text
              style={
                data.quantity === 0 ? styles.status_out : styles.status_in
              }>
              {data.quantity === 0 ? 'Out of stock' : 'In stock'}
            </Text>
            <Text style={styles.quantity}>{data.quantity} left</Text>
            <Text style={styles.description}>{data.description}</Text>
            <View style={styles.select_number}>
              <TouchableOpacity
                style={number === '1' ? styles.button_disable : styles.button}
                disabled={number === '1'}
                onPress={handleMinusNumber}>
                <IconOutline
                  name="minus"
                  style={styles.icon_minus}></IconOutline>
              </TouchableOpacity>
              <TextInput
                keyboardType="number-pad"
                style={styles.number}
                onChangeText={val => {
                  setNumber(val);
                  setPrice(
                    (Number.parseInt(val) * data.price)
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
                  );
                }}>
                {number}
              </TextInput>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAddNumber}
                disabled={number >= data.quantity}>
                <IconOutline name="plus" style={styles.icon_plus}></IconOutline>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.add_to_order}
            onPress={() => handleAddPress()}>
            <Text style={styles.add_text}>Add to cart - {price} VND</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductDetail;
