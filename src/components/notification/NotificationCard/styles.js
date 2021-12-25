import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    width: 370,
    height: 100,
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
  name: {
    fontSize: 20,
    fontFamily: 'poppins',
    color: '#001737',
    marginLeft: 10,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: 'poppins',
    marginLeft: 10,
  },
  quantity: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: 14,
    top: 75,
    paddingRight: 10,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
});
