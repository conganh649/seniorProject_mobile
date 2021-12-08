import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {IconOutline, IconFill} from '@ant-design/icons-react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import styles from './styles';
const OrderManage = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [tableHead, setTableHead] = useState([
    'Owner',
    <TouchableOpacity
      style={styles.head_button}
      onPress={() => toggleStatusModal()}>
      <Text style={styles.text_header}>Status</Text>
      <IconFill name="filter" style={styles.icon_header}></IconFill>
    </TouchableOpacity>,
    'Action',
  ]);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [update, setUpdate] = useState();
  const [status, setStatus] = useState();
  const [statusFilter, setStatusFilter] = useState('All');
  const toggleStatusModal = () => {
    setStatusModal(!statusModal);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
    await fetch('https://dutsenior.herokuapp.com/api/orders', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setData(
          responseJson.data.sort((a, b) => {
            return a.createdAt - b.createdAt;
          }),
        );
        if (statusFilter === 'All') {
          setTableData(
            responseJson.data.sort((a, b) => {
              return a.createdAt - b.createdAt;
            }),
          );
        } else {
          setTableData(
            responseJson.data
              .filter(order => {
                return order.status === statusFilter;
              })
              .sort((a, b) => {
                return a.createdAt - b.createdAt;
              }),
          );
        }
      });
  };
  const handleConfirmButton = async id => {
    console.log(status);
    let token = await AsyncStorage.getItem('token');
    try {
      await fetch('https://dutsenior.herokuapp.com/api/orders/' + update, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          alert("Update order's status successfully");
        });
    } catch (err) {}
    loadData();
    toggleModal();
  };

  const handleChangeFilter = () => {
    if (statusFilter === 'All') {
      setTableData(data);
    } else {
      setTableData(
        data.filter(order => {
          return order.status === statusFilter;
        }),
      );
    }

    toggleStatusModal();
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
              navigation.navigate(_navigation.OrderDetail, {id: rowData._id})
            }>
            <TableWrapper style={styles.row}>
              <Cell data={rowData.name} textStyle={styles.text}></Cell>
              <Cell
                data={rowData.status}
                textStyle={
                  rowData.status === 'New'
                    ? styles.text_pending
                    : rowData.status === 'Processing'
                    ? styles.text_resolving
                    : rowData.status === 'Shipping'
                    ? styles.text_completed
                    : styles.text_done
                }></Cell>
              <Cell
                data={
                  <TouchableOpacity
                    style={styles.action_button}
                    onPress={() => {
                      setUpdate(rowData._id);
                      toggleModal();
                    }}>
                    <IconOutline
                      name="edit"
                      style={styles.edit_icon}></IconOutline>
                  </TouchableOpacity>
                }></Cell>
            </TableWrapper>
            <Modal isVisible={isModalVisible} backdropOpacity={0.2}>
              <View style={styles.modal}>
                <Text style={styles.modal_text}>
                  You can change the Status of the order
                </Text>
                <Picker
                  selectedValue={status}
                  onValueChange={(itemValue, itemIndex) =>
                    setStatus(itemValue)
                  }>
                  <Picker.Item
                    label="New"
                    value="New"
                    style={styles.picker_text}
                  />
                  <Picker.Item
                    label="Processing"
                    value="Processing"
                    style={styles.picker_text}
                  />
                  <Picker.Item
                    label="Shipping"
                    value="Shipping"
                    style={styles.picker_text}
                  />
                  <Picker.Item
                    label="Complete"
                    value="Complete"
                    style={styles.picker_text}
                  />
                </Picker>
                <View style={styles.modal_button_container}>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.modal_button_cancel}>
                    <Text style={styles.button_text}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleConfirmButton(rowData._id)}
                    style={styles.modal_button}>
                    <Text style={styles.button_text}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        ))}
      </Table>
      <Modal isVisible={statusModal}>
        <View style={styles.modal_status}>
          <Text style={styles.modal_text}>Filter orders by</Text>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(itemValue, itemIndex) =>
              setStatusFilter(itemValue)
            }>
            <Picker.Item label="All" value="All" style={styles.picker_text} />
            <Picker.Item label="New" value="New" style={styles.picker_text} />
            <Picker.Item
              label="Processing"
              value="Processing"
              style={styles.picker_text}
            />
            <Picker.Item
              label="Shipping"
              value="Shipping"
              style={styles.picker_text}
            />
            <Picker.Item
              label="Complete"
              value="Complete"
              style={styles.picker_text}
            />
          </Picker>
          <View style={styles.modal_button_container_status}>
            <TouchableOpacity
              onPress={toggleStatusModal}
              style={styles.modal_button_cancel}>
              <Text style={styles.button_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChangeFilter()}
              style={styles.modal_button}>
              <Text style={styles.button_text}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

export default OrderManage;
