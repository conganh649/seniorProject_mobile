import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_navigation} from '../../constants';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {IconFill} from '@ant-design/icons-react-native';
import styles from './styles';
const CulturalFamily = props => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState(['Owner', 'Members', 'Rating']);
  const loadData = async () => {
    setPage(1);
    setLoading(true);
    let token = await AsyncStorage.getItem('token');
    await fetch('https://dutsenior.herokuapp.com/api/family/cultural', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        year: props.route.params.status,
      }),
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
              onPress={() =>
                props.navigation.navigate(_navigation.FamilyDetail, {
                  id: rowData._id,
                })
              }>
              <TableWrapper style={styles.row}>
                <Cell
                  data={rowData.familyOwnerName}
                  textStyle={styles.text}></Cell>
                <Cell
                  data={rowData.members.length}
                  textStyle={styles.text}></Cell>
                <Cell
                  data={
                    rowData.culturalFamilyRating.find(
                      ({year}) => year === props.route.params.status,
                    ).rating
                  }
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
    </View>
  );
};

export default CulturalFamily;
