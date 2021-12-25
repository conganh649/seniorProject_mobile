import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {IconFill} from '@ant-design/icons-react-native';
import styles from './styles';
const CulturalFamily = navigation => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState(['ID Card', 'Name', 'Birthday']);
  const loadData = async () => {
    setPage(1);
    setLoading(true);
    let token = await AsyncStorage.getItem('token');
    await fetch('https://dutsenior.herokuapp.com/api/users/military', {
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
            <View key={index}>
              <TableWrapper style={styles.row}>
                <Cell data={rowData.idCard} textStyle={styles.text}></Cell>
                <Cell data={rowData.fullName} textStyle={styles.text}></Cell>
                <Cell
                  data={handleDateFormat(rowData.dateofbirth)}
                  textStyle={styles.text}></Cell>
              </TableWrapper>
            </View>
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
    </View>
  );
};

export default CulturalFamily;
