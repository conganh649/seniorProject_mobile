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
  toggleSwitch: {
    paddingBottom: 20,
  },
  view_detail: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'poppins',
  },
  switch: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  card_container: {
    width: 300,
    height: 530,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
    flex: 1,
    marginLeft: 20,
  },
  card_container_collapse: {
    width: 300,
    height: 300,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
    flex: 1,
    marginLeft: 20,
  },
  img: {
    width: '90%',
    height: 150,
    borderRadius: 5,
    marginTop: 18,
    marginLeft: 15,
  },
  img_collapse: {
    width: '90%',
    height: 150,
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
  description: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'poppins',
  },
  text_detail_price: {
    position: 'absolute',
    top: 400,
    left: 14,
    fontSize: 26,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
  text_detail_price_collapse: {
    position: 'absolute',
    top: 250,
    left: 14,
    fontSize: 26,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
  quantity: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 400,
    right: 15,
    fontSize: 26,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
  quantity_collapse: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 250,
    right: 15,
    fontSize: 26,
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
  category: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 175,
    right: 15,
    fontSize: 16,
    fontFamily: 'poppins',
    color: '#ffffff',
    backgroundColor: '#39D5D5',
    borderRadius: 5,
    padding: 3,
  },
  category_collapse: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 180,
    right: 15,
    fontSize: 16,
    fontFamily: 'poppins',
    color: '#ffffff',
    backgroundColor: '#39D5D5',
    borderRadius: 5,
    padding: 3,
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
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: 460,
    backgroundColor: '#39D5D5',
    borderRadius: 5,
    padding: 3,
  },
  add_to_cart: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 22,
    fontFamily: 'poppins',
    color: '#ffffff',
  },
  info_board: {
    position: 'absolute',
    top: 430,
    width: '90%',
    height: 280,
    left: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
  },
  header: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 18,
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  iconClose: {
    fontSize: 30,
    color: '#39D5D5',
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    left: 310,
  },
  buttonSeeMore: {
    position: 'absolute',
    top: 240,
    left: 200,
    flexDirection: 'row',
  },
  iconOrder: {
    fontSize: 30,
    color: '#39D5D5',
    marginTop: 1,
  },
  order: {
    fontSize: 20,
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
    paddingRight: 10,
  },
  boardDetail: {
    flexDirection: 'row',
  },
  info: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 18,
    fontFamily: 'poppins',
  },
});
