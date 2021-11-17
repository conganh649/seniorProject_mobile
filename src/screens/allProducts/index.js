import React, {useState} from 'react';
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
import Header from '../../components/header';
import {_navigation} from '../../constants';
import styles from './styles';
const AllProducts = ({navigation}) => {
  const [data, setData] = useState([
    {
      name: 'Combo 1',
      price: '300.000 D',
    },
    {
      name: 'Combo 2',
      price: '400.000 D',
    },
    {
      name: 'Combo 3',
      price: '500.000 D',
    },
    {
      name: 'Combo 4',
      price: '123.000 D',
    },
    {
      name: 'Combo 5',
      price: '240.000 D',
    },
    {
      name: 'Combo 6',
      price: '270.000 D',
    },
    {
      name: 'Combo 7',
      price: '80.000 D',
    },
  ]);
  const formatData = (data, numColumns) => {
    let newData = data;
    const totalRows = Math.floor(data.length / numColumns);
    let totalLastRow = data.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      newData.push({name: 'Blank', empty: true});
      totalLastRow++;
    }
    return newData;
  };
  const renderItem = ({item}) => {
    if (item.empty === true) {
      return <View containerStyle={styles.invisible}></View>;
    }
    return (
      <View style={styles.card_container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(_navigation.ProductDetail, {
              back: _navigation.AllProducts,
            })
          }>
          <Image
            style={styles.img}
            source={require('../../assets/images/bg.jpg')}
            PlaceholderContent={
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="red"></ActivityIndicator>
              </View>
            }></Image>
          <Text style={styles.text_detail} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.text_detail_price} numberOfLines={1}>
            {item.price}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Input placeholder="Search" style={styles.search_input} />
      <FlatList data={data} renderItem={renderItem} horizontal></FlatList>
    </View>
  );
};

export default AllProducts;
