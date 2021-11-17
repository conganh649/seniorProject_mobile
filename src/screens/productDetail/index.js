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
import {_navigation} from '../../constants';
import Header from '../../components/header';
import styles from './styles';
const ProductDetail = props => {
  const [data, setData] = useState([
    {
      name: 'Combo 1',
      price: '300000',
      description: '1kg beef, 1kg pork, 0.5kg tomato, 0.5kg potato',
      quantity: '50',
      status: 'In stock',
      category: 'Food',
    },
  ]);
  const [number, setNumber] = useState('1');
  const [price, setPrice] = useState(
    (Number.parseInt(number) * data[0].price)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
  );
  const handlePriceFormat = price => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  const handleAddNumber = () => {
    let newNumber = Number.parseInt(number);
    ++newNumber;
    setNumber(`${newNumber}`);
    setPrice(
      (Number.parseInt(newNumber) * data[0].price)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
    );
  };
  const handleMinusNumber = () => {
    let newNumber = Number.parseInt(number);
    --newNumber;
    setNumber(`${newNumber}`);
    setPrice(
      (Number.parseInt(newNumber) * data[0].price)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.'),
    );
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../assets/images/bg.jpg')}></Image>
      <View style={styles.detail}>
        <Text style={styles.product_name}>{data[0].name}</Text>
        <Text style={styles.price}>{handlePriceFormat(data[0].price)}</Text>
        <Text
          style={
            data[0].status === 'In stock' ? styles.status_in : styles.status_out
          }>
          {data[0].status}
        </Text>
        <Text style={styles.quantity}>{data[0].quantity} left</Text>
        <Text style={styles.description}>
          {data[0].description.slice(0, 70)}
        </Text>
        <View style={styles.select_number}>
          <TouchableOpacity
            style={styles.button}
            disabled={number === '1'}
            onPress={handleMinusNumber}>
            <IconOutline name="minus" style={styles.icon_minus}></IconOutline>
          </TouchableOpacity>
          <Text style={styles.number}>{number}</Text>
          <TouchableOpacity style={styles.button} onPress={handleAddNumber}>
            <IconOutline name="plus" style={styles.icon_plus}></IconOutline>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.add_to_order}>
        <Text style={styles.add_text}>Add to order - {price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetail;
