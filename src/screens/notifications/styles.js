import {Dimensions, StyleSheet} from 'react-native';
const W = Dimensions.get('window').width / 4;
export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('screen').height,
    flex: 1,
    maxHeight: '110%',
  },
  header: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 22,
    fontFamily: 'poppins',
    color: '#001737',
    marginTop: 10,
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
  button: {
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    top: 650,
    left: 280,
    backgroundColor: '#39D5D5',
    width: 80,
    height: 80,
    padding: 10,
    borderRadius: 50,
  },
  button_text_send: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  top: {
    flexDirection: 'row',
  },
  modal: {
    backgroundColor: '#ffffff',
    height: '100%',
    borderRadius: 5,
    flex: 1,
  },
  modal_text: {
    marginTop: 20,
    fontSize: 22,
    color: '#39D5D5',
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  modal_button_container: {
    marginTop: 25,
    flexDirection: 'row',
    position: 'absolute',
    top: 620,
    right: 15,
  },
  modal_button_cancel: {
    backgroundColor: '#FF2E2E',
    borderRadius: 5,
    marginLeft: 20,
    width: 100,
  },
  modal_button: {
    backgroundColor: '#39D5D5',
    borderRadius: 5,
    marginLeft: 20,
    width: 100,
  },
  button_text: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '700',
    color: '#ffffff',
    padding: 10,
  },
  input_component: {
    marginTop: 20,
    marginLeft: 5,
  },

  input_component_modal: {
    marginTop: 20,
    marginLeft: 5,
  },
  input_component_to: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 18,
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
    marginLeft: 15,
  },
  text_input: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'poppins',
    fontSize: 18,
    padding: 5,
  },
  text_input_box: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'poppins',
    fontSize: 18,
    padding: 5,
    textAlignVertical: 'top',
  },
  text_input_box_contacts: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    height: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'poppins',
    fontSize: 18,
    padding: 5,
    textAlignVertical: 'top',
  },
  checkbox: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: '700',
    marginRight: 30,
    width: 250,
    marginTop: 3,
  },
  flat: {},
  search: {
    position: 'absolute',
    flexDirection: 'row',
    top: 12,
    left: 17,
    zIndex: 3,
  },
  text_input_search: {
    marginTop: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'poppins',
    fontSize: 18,
    padding: 5,
    paddingLeft: 15,
  },
  check: {
    marginLeft: 50,
  },
  check_inside: {
    marginLeft: 5,
  },
  check_title: {
    fontFamily: 'poppins',
    fontSize: 22,
  },
});
