import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    width: 370,
    height: 150,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    resizeMode: 'cover',
    aspectRatio: 1,
    height: '100%',
    borderRadius: 5,
  },
  info: {
    position: 'absolute',
    top: '4%',
    left: 160,
    height: '90%',
    width: 200,
  },
  name: {
    fontSize: 20,
    fontFamily: 'poppins',
    color: '#001737',
  },
  description: {
    fontSize: 13,
    fontFamily: 'poppins',
    width: 185,
  },
  price: {
    position: 'absolute',
    top: 115,
    fontSize: 20,
    fontFamily: 'poppins',
    fontWeight: '800',
  },

  quantity: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 115,
    fontSize: 20,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
});
