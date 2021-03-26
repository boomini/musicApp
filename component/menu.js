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
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    padding: 20,
    borderRadius : 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    color:"white",
    fontWeight: '300',
    paddingTop: 5,
  },
});