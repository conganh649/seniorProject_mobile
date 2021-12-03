import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {Input, Text, Image} from 'react-native-elements';
import {IconOutline} from '@ant-design/icons-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import styles from './styles';
const AllProducts = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const handleClick = id => {
    if (!clicked.includes(id)) {
      let newClick = clicked;
      newClick.push(id);
      setRefresh(!refresh);
      setClicked(newClick);
    } else {
      let newClick = clicked;
      newClick.splice(newClick.indexOf(id), 1);
      setClicked(newClick);
      setRefresh(!refresh);
    }
    console.log(clicked);
  };
  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
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
        if (route.params.category !== '') {
          console.log('Vao ne mn');
          console.log(route.params.category);
          console.log(dataShow);
          let newShow = responseJson.filter(product =>
            product.category
              .toLowerCase()
              .includes(route.params.category.toLowerCase()),
          );
          setDataShow(newShow);
        } else {
          setDataShow(
            responseJson.sort((a, b) =>
              a.category > b.category ? -1 : b.category > a.category ? 1 : 0,
            ),
          );
        }

        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);

    const unsubscribe = navigation.addListener('focus', () => {
      setData([]);
      loadProduct();
    });

    return unsubscribe;
  }, [navigation]);
  const handleSearch = val => {
    let product = data;
    let newShow = product.filter(
      product =>
        product.productName.toLowerCase().includes(val) ||
        product.category.toLowerCase().includes(val),
    );
    setDataShow(newShow);
  };
  const renderItem = ({item}) => {
    if (item.empty === true) {
      return <View containerStyle={styles.invisible}></View>;
    }
    return (
      <View
        style={
          clicked.includes(item._id)
            ? styles.card_container
            : styles.card_container_collapse
        }>
        <TouchableOpacity onPress={() => handleClick(item._id)}>
          <Image
            style={
              clicked.includes(item._id) ? styles.img : styles.img_collapse
            }
            source={{uri: item.productThumbnail}}
            PlaceholderContent={
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="red"></ActivityIndicator>
              </View>
            }></Image>
          <Text style={styles.text_detail}>{item.productName}</Text>
          <Text
            style={
              clicked.includes(item._id)
                ? styles.category
                : styles.category_collapse
            }>
            {item.category}
          </Text>
          {clicked.includes(item._id) ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
          <Text
            style={
              clicked.includes(item._id)
                ? styles.text_detail_price
                : styles.text_detail_price_collapse
            }>
            {handlePriceFormat(item.price)}
          </Text>
          <Text
            style={
              clicked.includes(item._id)
                ? styles.quantity
                : styles.quantity_collapse
            }>
            {item.quantity}
          </Text>
          {clicked.includes(item._id) ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate(_navigation.ProductDetail, {
                  id: item._id,
                  navigation: navigation,
                })
              }>
              <Text style={styles.add_to_cart}> Detail</Text>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        style={styles.search_input}
        onChangeText={val => handleSearch(val)}
      />
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="red"></ActivityIndicator>
        </View>
      ) : (
        <FlatList
          data={dataShow}
          renderItem={renderItem}
          horizontal
          extraData={refresh}></FlatList>
      )}
    </View>
  );
};

export default AllProducts;
