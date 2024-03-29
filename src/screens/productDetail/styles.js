import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  img: {
    height: '55%',
    width: '100%',
  },
  detail: {
    left: '5%',
    position: 'absolute',
    top: '33%',
    width: '90%',
  },
  product_name: {
    fontFamily: 'poppins',
    fontSize: 25,
  },
  price: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontFamily: 'poppins',
    fontSize: 25,
    color: '#39D5D5',
  },
  status_in: {
    fontFamily: 'poppins',
    fontSize: 20,
    color: '#00A300',
  },
  status_out: {
    fontFamily: 'poppins',
    fontSize: 20,
    color: '#D10000',
  },
  quantity: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 40,
    fontFamily: 'poppins',
    fontSize: 20,
    color: '#39D5D5',
  },
  description: {
    fontFamily: 'poppins',
    fontSize: 18,
  },
  select_number: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 5,
    borderWidth: 1.25,
    padding: 10,
    borderColor: '#E5E5E5',
  },
  button_disable: {
    borderRadius: 5,
    borderWidth: 0,
    padding: 10,
  },
  icon_minus: {
    color: '#D10000',
    fontSize: 25,
  },
  number: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 35,
    marginLeft: 40,
    marginRight: 40,
    borderBottomWidth: 1,
  },
  icon_plus: {
    color: '#00A300',
    fontSize: 25,
  },
  add_to_order: {
    marginTop: 200,
  },
  add_text: {
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    fontSize: 25,
    alignItems: 'center',
    backgroundColor: '#39D5D5',
    color: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
});
