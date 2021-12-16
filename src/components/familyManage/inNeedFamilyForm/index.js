import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './styles';
const NeedForm = props => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.info_view}>
        <Text style={styles.title}>1. Obey laws and rules</Text>
      </View>

      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>a. No law violation</Text>
        <Text style={styles.sub_title_point}>5/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>b. No community rule violation</Text>
        <Text style={styles.sub_title_point}>5/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>c. Hang national flag correctly</Text>
        <Text style={styles.sub_title_point}>5/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>d. Participate in cultural events</Text>
        <Text style={styles.sub_title_point}>5/5</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>e. Behave politely in events</Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>f. Conserve cultural heritage </Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>g. Keep environment clean </Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>h. Join social activities </Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>i. No food safe violation </Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>j. No fire protection violation </Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
      <View style={styles.info_view_member}>
        <Text style={styles.sub_title}>k. No traffic law violation </Text>
        <Text style={styles.sub_title_point}>3/3</Text>
      </View>
    </ScrollView>
  );
};

export default NeedForm;
