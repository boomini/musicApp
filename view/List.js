import React , {Component } from "react";
import { View, 
  Text, 
  StyleSheet, 
  SafeAreaView ,
  TouchableOpacity ,
  Image, 
  ScrollView } from "react-native";
import PropTypes from "prop-types";
import Music from "./Music"

import SideMenu from 'react-native-side-menu-updated'
import Menu from "../component/menu";

const image = require('../assets/menu.png');

export default class extends Component  {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      tabNm : "ALL",
      isOpen: false,
      selectedItem: 'About'
    };
  }
  static propTypes = {
    _musicList: PropTypes.array.isRequired
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  onMenuItemSelected(item){
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  };

  render() {
    
    const {_musicList } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return(
      <SafeAreaView>
        <SideMenu 
          isOpen={this.state.isOpen}
            menu={menu}
            onChange={isOpen => this.updateMenuState(isOpen)}
          >
          <View style={styles.container}>
            <Text style={styles.title}>전체 리스트</Text>
            <ScrollView contentContainerStyle={styles.toDos}>
                {
                Object.values(_musicList).map(function(data,index){
                return <Music key={data.id} _music={data} _cnt={index+1}/>
                })
                }
            </ScrollView>
          </View>


          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Image
              source={image}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>  
        </SideMenu>
      </SafeAreaView>
      )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title:{
    color:"#FFFFFF",
    fontSize:30,
    marginTop:50,
    fontWeight:"200",
    marginBottom:30
  },
  toItems:{
    alignItems:"center"
  },


});
