import {Dimensions, StyleSheet} from 'react-native';
const W = Dimensions.get('window').width / 4;
export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 8,
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    fontFamily: 'poppins',
    textAlign: 'center',
    width: '60%',
  },
  info_view: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  info_view_member: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
  },
  info_view_total: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 20,
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  title_header: {
    fontSize: 22,
    color: '#39D5D5',
    fontFamily: 'poppins',
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    fontFamily: 'poppins',
    marginLeft: 5,
  },
  sub_title: {
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  sub_title_point: {
    position: 'absolute',
    left: 295,
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: '700',
  },
  sub_title_point_input: {
    position: 'absolute',
    top: -13,
    paddingBottom: -5,
    left: 272,
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: '700',
    borderBottomWidth: 1,
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
});
