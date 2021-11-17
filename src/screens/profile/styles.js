import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 10,
  },
  user_info_section: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  ava_info: {
    flexDirection: 'row',
    marginTop: 15,
  },
  title: {
    marginTop: '15%',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'poppins',
  },
  caption: {
    fontSize: 15,
    lineHeight: 30,
    fontWeight: '500',
    fontFamily: 'poppins',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    fontSize: 25,
    color: '#777777',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'poppins',
    marginLeft: '5%',
    color: '#777777',
  },
  info_box_wrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    borderTopColor: '#dddddd',
    borderTopWidth: 2,
    flexDirection: 'row',
    height: 120,
  },
  info_box: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box_title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'poppins',
    color: '#39D5D5',
  },
  menu_wrapper: {
    marginTop: 10,
  },
  menu_icon: {
    fontSize: 25,
  },
  menu_item: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  menu_item_text: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontFamily: 'poppins',
    fontSize: 16,
    lineHeight: 26,
  },
});
