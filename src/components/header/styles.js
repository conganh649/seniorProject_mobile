import {Dimensions, StyleSheet} from 'react-native';
const W = Dimensions.get('window').width / 4;
export default StyleSheet.create({
  container: {
    backgroundColor: '#39D5D5',
    padding: 8,
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    fontFamily: 'poppins',
    color: '#ffffff',
    textAlign: 'center',
    width: '60%',
  },
  back: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 5,
  },
});
