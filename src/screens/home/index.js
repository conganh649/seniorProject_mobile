import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../../components/home/ProductCard';
import {_navigation} from '../../constants';
import categories from '../../constants/categories.json';
import styles from './styles';
const Home = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.list_container}>
        <Image style={styles.image} source={{uri: item.image}}></Image>
        <Text style={styles.category_text}>{item.name}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
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
          onPress={() => navigation.navigate(_navigation.AllProducts)}>
          <Text style={styles.view_all}>View all</Text>
        </TouchableOpacity>
      </View>

      <ProductCard
        click={_navigation.ProductDetail}
        navigation={navigation}></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </ScrollView>
  );
};

export default Home;
