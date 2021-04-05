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
import Icon from 'react-native-vector-icons/Fontisto';
import Menu from "../component/menu";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.childApp') 

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
    _musicList: PropTypes.array.isRequired,
    _onMusicFavSelected: PropTypes.func.isRequired,
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  create(){
    
  };

  onMenuClick = (event) =>{
    event.stopPropagation;
    let {tabNm} = this.state;
    tabNm == 'all' ? tabNm = 'fav' : tabNm = 'all';
    this.setState({tabNm});
  };

  render() {
    
    let {_musicList , _onMusicFavSelected , _onMusicTurn , _onStopMusic } = this.props;
    let {tabNm , isOpen } = this.state;
    
    if( tabNm == "fav" ){
      _musicList = _musicList.filter(music => music.favYn  == true );
    };

    return(
         <View style={styles.container}>
          
          <View style={styles.header}>
              {tabNm == 'all' ? <Text style={styles.title}>전체 목록</Text>:<Text style={styles.title}>즐겨 찾기</Text>}
          </View> 
          <View style={styles.content}>
            <ScrollView contentContainerStyle={styles.toDos}>
                {
                Object.values(_musicList).map(music=>
                  <Music key={music.id} _music={music} _onItemSelected={_onMusicFavSelected} _onMusicTurn={_onMusicTurn} />
                  )
                }
            </ScrollView>
            
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity  style={styles.menu} onPress={_onStopMusic} >
            <Icon name="pause" size={30} color="#FFFFFF" />
            </TouchableOpacity> 
             <TouchableOpacity style={styles.menu} onPress={this.onMenuClick} >
              <Icon name="bookmark-alt" size={30} color="#FFFFFF" />
             </TouchableOpacity>

             <TouchableOpacity style={styles.menu} onPress={this.onMenuClick} >
               <Icon name="bookmark" size={30} color="#FFFFFF" />
             </TouchableOpacity>

             <TouchableOpacity style={styles.menu}>
               <Icon name="search" size={30} color="#FFFFFF" />
             </TouchableOpacity>
             
          </View>
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
  header:{
    flex: 1,
    marginTop:30
  },
  content:{
    flex: 8,
  },
  footer:{
    flex: 1,
    flexDirection:"row"
  },
  title:{
    color:"#ffffff",
    fontSize:30,
    fontWeight:"200",
  },
  menu:{
    flex:1,
    alignItems:'center'
  }
});
