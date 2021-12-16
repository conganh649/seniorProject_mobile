import {Dimensions, StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    marginTop: 25,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
    marginLeft: 30,
    alignItems: 'center',
  },
  header: {
    marginLeft: '3%',
    fontSize: 20,
    fontFamily: 'poppins',
    color: '#39D5D5',
    marginTop: 10,
    fontWeight: '700',
  },
  detail: {
    marginLeft: '3%',
    fontSize: 16,
    fontFamily: 'poppins',
    color: '#39D5D5',
    marginTop: 15,
    lineHeight: 25,
    textAlign: 'center',
  },
  icon: {
    fontSize: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
});
