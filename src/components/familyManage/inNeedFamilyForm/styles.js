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
    marginLeft: 30,
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
    left: 270,
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: '700',
  },
});
