import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import styles from './styles';
const FamilyManage = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [tableHead, setTableHead] = useState(['Owner', 'Members', 'Address']);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const nextPage = () => {
    let newPage = page + 1;
    setPage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    setPage(newPage);
  };
  const loadData = async () => {
    setPage(1);
    let token = await AsyncStorage.getItem('token');
    await fetch('https://dutsenior.herokuapp.com/api/family', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.data);
        setTableData(responseJson.data);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTableData([]);
      loadData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.text_header}
        />
        {tableData.slice((page - 1) * 8, page * 8).map((rowData, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate(_navigation.FamilyDetail, {id: rowData._id})
            }>
            <TableWrapper style={styles.row}>
              <Cell
                data={rowData.familyOwnerName}
                textStyle={styles.text}></Cell>
              <Cell
                data={rowData.members.length}
                textStyle={styles.text_done}></Cell>
              <Cell
                data={rowData.address == null ? 'N/A' : rowData.address}
                textStyle={styles.text}></Cell>
            </TableWrapper>
          </TouchableOpacity>
        ))}
      </Table>
      <View style={styles.pagination}>
        <Text style={styles.total}>{tableData.length} results found</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          disabled={page === 1}
          onPress={() => prevPage()}>
          <IconFill name="caret-left" style={styles.arrow}></IconFill>
        </TouchableOpacity>
        <Text style={styles.page}>{page}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          disabled={page >= tableData.length / 8}
          onPress={() => nextPage()}>
          <IconFill name="caret-right" style={styles.arrow}></IconFill>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FamilyManage;
