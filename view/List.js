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
import Icon from 'react-native-vector-icons/AntDesign';
import Menu from "../component/menu";


export default class extends Component  {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      tabNm : "all",
      isOpen:false
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
  create(){
    
  }

  onMenuItemSelected= item =>
  this.setState({tabNm:item , isOpen: !this.state.isOpen });
  
  render() {
    
    var {_musicList } = this.props;
    const {tabNm , isOpen } = this.state;
    
    if( tabNm == "fav" ){
      _musicList = _musicList.filter(music => music.favYn  == true );
    }
    return(
         <View style={styles.container}>
          <TouchableOpacity onPress={this.toggle} style={styles.menu} >
            {isOpen ? 
            <Menu onItemSelected={this.onMenuItemSelected} />
            :
            <Icon name="bars" size={30} color="#ffffff" style={styles.menuBtn} />}
          </TouchableOpacity>
          
          <View style={styles.header}>
              {tabNm == 'all' ? <Text style={styles.title}>전체 목록</Text>:<Text style={styles.title}>즐겨 찾기</Text>}
          </View> 
          <ScrollView contentContainerStyle={styles.toDos}>
              {
              Object.values(_musicList).map(function(data,index){
                return <Music key={data.id} _music={data} _cnt={index+1}/>
              })
              }
          </ScrollView>
       </View>
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
  menu:{
     position:"absolute",
     marginTop:50,
     left:10
  },
  content:{
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title:{
    marginTop:50,
    color:"#ffffff",
    fontSize:30,
    fontWeight:"200",
    marginBottom:25
  },
  toItems:{
    alignItems:"center"
  },


});
