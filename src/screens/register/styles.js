import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  form: {
    backgroundColor: '#ffffff',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
    height: '70%',
    borderRadius: 5,
  },
  text_header: {
    marginTop: '2%',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'poppins',
    color: '#001737',
  },
  wrap_input: {
    width: '90%',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input_component: {
    marginTop: '5%',
  },
  input_label: {
    fontSize: 14,
    fontFamily: 'poppins',
    color: '#001737',
  },
  input_container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  icon: {fontSize: 25, marginTop: 'auto', marginBottom: 'auto'},
  input: {
    flex: 1,
    fontSize: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: 10,
    paddingBottom: 6,
    fontFamily: 'poppins',
  },
  button: {
    marginTop: '10%',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button_container: {
    justifyContent: 'center',
    height: 40,
    borderRadius: 50,
  },
  button_text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  signup_div: {
    marginTop: '8%',
    width: '100%',
  },
  normal_text: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  signup_text: {
    marginTop: '2%',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'poppins',
    color: '#4253FF',
    fontWeight: '700',
  },
});
