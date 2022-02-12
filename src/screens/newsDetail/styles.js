import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: '100%',
  },
  name: {
    fontSize: 25,
    fontFamily: 'poppins',
    color: '#001737',
    marginLeft: 10,
    marginTop: 5,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '800',
  },
  description: {
    fontSize: 16,
    fontFamily: 'poppins',
    marginLeft: 10,
    width: '92%',
    textAlign: 'justify',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
});
