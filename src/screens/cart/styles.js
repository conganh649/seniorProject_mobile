import {StyleSheet, Dimensions} from 'react-native';
var {width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productCard: {
    width: (width * 9) / 10,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'silver',
    paddingBottom: 10,
  },
  image: {
    resizeMode: 'cover',
    width: (width * 3) / 10,
    height: '100%',
    borderRadius: 5,
  },
  info_container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
    justifyContent: 'space-between',
  },
  name_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  miniButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    backgroundColor: '#39D5D5',
  },
  remove: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  total_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  total_text: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 20,
  },
  total_price: {
    fontWeight: 'bold',
    color: '#33c37d',
    fontSize: 20,
  },
  price: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  order_button: {
    backgroundColor: '#39D5D5',
    width: width - 40,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  order_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
