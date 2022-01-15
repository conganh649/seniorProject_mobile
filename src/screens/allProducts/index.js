import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Input, Text, Image} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {IconFill} from '@ant-design/icons-react-native';
import * as Animatable from 'react-native-animatable';
import {_navigation, apiUrl} from '../../constants';
import styles from './styles';
const AllProducts = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [board, setBoard] = useState();
  const handleClick = item => {
    setBoard(item);
  };
  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  const loadProduct = async () => {
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/products`, {
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
          let newShow = responseJson.filter(product =>
            product.category
              .toLowerCase()
              .includes(route.params.category.toLowerCase()),
          );
          setDataShow(newShow);
          setBoard(newShow[0]);
        } else {
          setDataShow(
            responseJson.sort((a, b) =>
              a.category > b.category ? -1 : b.category > a.category ? 1 : 0,
            ),
          );
          setBoard(responseJson[0]);
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
        product.productName.toLowerCase().includes(val.toLowerCase()) ||
        product.category.toLowerCase().includes(val.toLowerCase()),
    );
    setDataShow(newShow);
  };
  const renderItem = ({item}) => {
    if (item.empty === true) {
      return <View containerStyle={styles.invisible}></View>;
    }
    return (
      <View style={styles.card_container_collapse}>
        <TouchableOpacity onPress={() => handleClick(item)}>
          <Image
            style={styles.img_collapse}
            source={{uri: item.productThumbnail}}
            PlaceholderContent={
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="red"></ActivityIndicator>
              </View>
            }></Image>
          <Text style={styles.text_detail}>{item.productName}</Text>
          <Text style={styles.category_collapse}>{item.category}</Text>

          <Text style={styles.text_detail_price_collapse}>
            {handlePriceFormat(item.price)}
          </Text>
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
      {loading ? null : (
        <Animatable.View animation="zoomInUp" style={styles.info_board}>
          <View style={styles.boardDetail}>
            <Text style={styles.header}>Product name:</Text>
            <Text style={styles.info}>{board.productName}</Text>
          </View>
          <View style={styles.boardDetail}>
            <Text style={styles.header}>Quantity:</Text>
            <Text style={styles.info}>
              {board.quantity !== 0 ? board.quantity : 'Out of stock'}
            </Text>
          </View>
          <Text style={styles.header}>Product detail:</Text>
          <Text style={styles.description}>{board.description}</Text>
          <TouchableOpacity
            style={styles.buttonSeeMore}
            onPress={() =>
              navigation.navigate(_navigation.ProductDetail, {id: board._id})
            }>
            <Text style={styles.order}>Order here</Text>
            <IconFill name="forward" style={styles.iconOrder} />
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

export default AllProducts;
