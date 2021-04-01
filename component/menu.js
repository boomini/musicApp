import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');



export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Text
        onPress={() => onItemSelected('all')}
        style={styles.item}
      >
        전체 목록
      </Text>

      <Text
        onPress={() => onItemSelected('fav')}
        style={styles.item}
      >
        즐겨 찾기
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};



const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: 150,
    height: 200,
    backgroundColor: 'white',
    padding: 20,
    borderRadius : 20,
    flexDirection:'row'
  },
  item: {
    flex:1,
    fontSize: 20,
    color:"black",
    fontWeight: '400',
    paddingTop: 5,
  },
});