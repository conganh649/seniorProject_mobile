import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input_component: {
    marginTop: '5%',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  date_button: {
    backgroundColor: '#39D5D5',
    width: '20%',
    borderRadius: 5,
  },
  date_text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'poppins',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  submit_button: {
    marginTop: '10%',
    backgroundColor: '#39D5D5',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    fontWeight: '600',
  },
  submit_text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'poppins',
    textAlign: 'center',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  error: {
    color: '#FF0000',
    fontSize: 15,
  },
  error_msg: {
    marginTop: 10,
  },
});
