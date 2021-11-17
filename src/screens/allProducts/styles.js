import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  search_input: {
    marginTop: 20,
    paddingLeft: 10,
    fontFamily: 'poppins',
  },
  card_container: {
    width: 300,
    height: 420,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
    marginLeft: 10,
  },
  img: {
    width: '90%',
    height: 300,
    borderRadius: 5,
    marginTop: 18,
    marginLeft: 15,
  },
  text_detail: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'poppins',
  },
  text_detail_price: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 25,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
  invisible: {
    width: 180,
    marginLeft: 12,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0, // Remove Border
    shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0, // Remove Shadow for Android
  },
});
