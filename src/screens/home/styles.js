import {Dimensions, StyleSheet} from 'react-native';
const W = Dimensions.get('window').width / 4;
export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('screen').height,
    maxHeight: '100%',
  },
  header: {
    marginLeft: '3%',
    fontSize: 20,
    fontFamily: 'poppins',
    color: '#001737',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  image: {
    width: W * 2,
    height: (W * 9 * 2) / 16,
    borderRadius: 5,
  },
  category_text: {
    fontSize: 18,
    fontFamily: 'poppins',
    textAlign: 'center',
    paddingTop: '2%',
  },
  list_container: {
    padding: 5,
  },
  list: {
    marginLeft: '2%',
  },
  product_container: {
    flex: 1,
    flexDirection: 'row',
  },
  view_all: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 15,
    fontFamily: 'poppins',
    color: '#001737',
    marginLeft: '60%',
  },
});
