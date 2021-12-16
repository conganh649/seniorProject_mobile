import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  head_button: {
    height: 50,
    backgroundColor: '#39D5D5',
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 20,
  },
  head: {height: 50, backgroundColor: '#39D5D5'},
  text_header: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'poppins',
    color: '#ffffff',
    fontWeight: '700',
  },
  icon_header: {
    fontSize: 22,
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: 15,
    marginTop: 5,
  },
  row: {
    width: '95%',
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  text_pending: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#FF2E2E',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  text_resolving: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#00A300',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  text_completed: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  text_done: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#696969',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  pagination: {
    position: 'absolute',
    top: 680,
    flexDirection: 'row',
  },
  paginationButton: {
    backgroundColor: '#39D5D5',
    borderRadius: 5,
    padding: 5,
  },
  arrow: {
    fontSize: 30,
    color: '#ffffff',
  },
  page: {
    fontSize: 30,
    color: '#39D5D5',
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '700',
    marginLeft: 30,
    marginRight: 30,
  },
  action_button: {
    padding: 5,
    alignItems: 'center',
  },
  edit_icon: {
    fontSize: 24,
    color: '#39D5D5',
  },
  modal: {
    backgroundColor: '#ffffff',
    height: '35%',
    borderRadius: 5,
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
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modal_button_cancel: {
    backgroundColor: '#FF2E2E',
    borderRadius: 5,
    marginLeft: 20,
  },
  modal_button: {
    backgroundColor: '#39D5D5',
    borderRadius: 5,
    marginLeft: 20,
  },
  button_text: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '700',
    color: '#ffffff',
    padding: 10,
  },
  picker_text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  modal_status: {
    backgroundColor: '#ffffff',
    height: '30%',
    borderRadius: 5,
  },
  modal_button_container_status: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  total: {
    fontSize: 18,
    textAlign: 'center',
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
    marginLeft: 20,
    marginRight: 50,
    marginTop: 5,
  },
});
