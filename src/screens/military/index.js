import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation, apiUrl} from '../../constants';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import Modal from 'react-native-modal';
import {IconFill} from '@ant-design/icons-react-native';
import styles from './styles';
const Military = navigation => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState(['ID Card', 'Name', 'Birthday']);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState();
  let year = new Date().getFullYear().toString();
  const toggleModal = () => {
    setModal(!modal);
  };
  const loadData = async () => {
    setPage(1);
    setLoading(true);
    let token = await AsyncStorage.getItem('token');
    await fetch(`${apiUrl}api/users/military?year=2021`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setData(responseJson.data);
          setLoading(false);
        }
      });
  };

  const nextPage = () => {
    let newPage = page + 1;
    setPage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    setPage(newPage);
  };

  const handleSend = async () => {
    let token = await AsyncStorage.getItem('token');
    let notification = {
      title: 'Military Service Medical Test Call',
      body: 'You are qualified for Military Service. Please join the Medical Test when getting the official registration form!',
    };
    await fetch(`${apiUrl}api/notification/sendToDevice`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        notification: notification,
        listUser: [show._id],
      }),
    });
    toggleModal();
  };

  const handleDateFormat = date => {
    let currentDate = new Date(date);
    let dob =
      currentDate.getDate() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear();
    return dob;
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.card_container_cultural}>
        <View style={styles.info_view_list}>
          <Text style={styles.title}>Year:</Text>
          <Text style={styles.detail}>{item.year}</Text>
        </View>
        <View style={styles.info_view}>
          <Text style={styles.title}>Certification:</Text>
          <Text
            style={
              item.certification === false
                ? styles.detail_red
                : styles.detail_green
            }>
            {item.certification === false ? 'No' : 'Yes'}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    setLoading(true);
    setData([]);
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="red"></ActivityIndicator>
        </View>
      ) : (
        <Table>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.text_header}
          />
          {data.slice((page - 1) * 8, page * 8).map((rowData, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setShow(rowData);
                toggleModal();
              }}>
              <TableWrapper style={styles.row}>
                <Cell data={rowData.idCard} textStyle={styles.text}></Cell>
                <Cell data={rowData.fullName} textStyle={styles.text}></Cell>
                <Cell
                  data={handleDateFormat(rowData.dateofbirth)}
                  textStyle={styles.text}></Cell>
              </TableWrapper>
            </TouchableOpacity>
          ))}
        </Table>
      )}
      <View style={styles.pagination}>
        <Text style={styles.total}>{data.length} results found</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          disabled={page === 1}
          onPress={() => prevPage()}>
          <IconFill name="caret-left" style={styles.arrow}></IconFill>
        </TouchableOpacity>
        <Text style={styles.page}>{page}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          disabled={page >= data.length / 8}
          onPress={() => nextPage()}>
          <IconFill name="caret-right" style={styles.arrow}></IconFill>
        </TouchableOpacity>
      </View>
      {modal ? (
        <Modal isVisible={modal} backdropOpacity={0.2}>
          <View style={styles.modal}>
            <View style={styles.info_view}>
              <Text style={styles.title}>ID Card:</Text>
              <Text style={styles.detail}>{show.idCard}</Text>
            </View>

            <View style={styles.info_view}>
              <Text style={styles.title}>Full name:</Text>
              <Text style={styles.detail}>{show.fullName}</Text>
            </View>

            <View style={styles.info_view}>
              <Text style={styles.title}>Address:</Text>
              <Text style={styles.detail}>{show.address}</Text>
            </View>

            <View style={styles.info_view}>
              <Text style={styles.title}>Date of birth:</Text>
              <Text style={styles.detail}>
                {handleDateFormat(show.dateofbirth)}
              </Text>
            </View>

            <View style={styles.info_view}>
              <Text style={styles.title}>Army join:</Text>
              <Text style={styles.detail}>
                {show.army === true ? 'Yes' : 'No'}
              </Text>
            </View>

            <View style={styles.info_view}>
              <Text style={styles.title}>Delay call certification:</Text>
            </View>

            <FlatList
              data={show.delayCallCertification.sort((a, b) =>
                a.year > b.year ? -1 : b.year > a.year ? 1 : 0,
              )}
              renderItem={renderItem}
              horizontal></FlatList>
            <View style={styles.modal_button_container}>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.modal_button_cancel}>
                <Text style={styles.button_text}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSend()}
                style={styles.modal_button}>
                <Text style={styles.button_text}>Send call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default Military;
