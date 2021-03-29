import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./view/Loading"
import List from "./view/List"

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.childApp') 
const tableNm = "test1";
var musicList=[
  {id:1 , musicTitle : "개구리 앞다리" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:2 , musicTitle : "돼지삼형제" , replyTime:"00:25", musicFile : "abc.mp3",favYn:false},
  {id:3 , musicTitle : "꿈나라 별나라" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:4 , musicTitle : "로켓트" , replyTime:"01:30", musicFile : "abc.mp3",favYn:false},
  {id:5 , musicTitle : "아기돼지" , replyTime:"00:20", musicFile : "abc.mp3",favYn:false},
  {id:6 , musicTitle : "곰세마리" , replyTime:"01:30", musicFile : "abc.mp3",favYn:false},
  {id:7 , musicTitle : "엄마아빠" , replyTime:"02:12", musicFile : "abc.mp3",favYn:false},
  {id:8 , musicTitle : "할머니어디가" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:9 , musicTitle : "여드름" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false}
];

export default class extends React.Component {
  constructor (props){
    super(props)
  }
  state = {
    isLoading: true ,
    favList : []
  };
  componentWillUnmount(){
    this.createTable();
  }
  componentDidMount() {
    this.getMusicList();
  }

  createTable = async () =>{
    
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS '+tableNm+' (id INTEGER)'
      );
    })
  };
  insertFav(id){
    db.transaction(tx => {tx.executeSql('INSERT INTO '+tableNm+' (ID) values (?)', [id]);},);
  };
  deleteFav(id){
    db.transaction(tx => {tx.executeSql('DELETE FROM '+tableNm+' WHERE ID = ? ', [id]);},);
  };
  selectFav(){
    return new Promise((resolve=>{
      db.transaction(
        tx => {
          tx.executeSql('SELECT ID FROM '+tableNm+'', [], (trans, result) => {
            let row = result.rows;
            resolve(row)
            return row
          });
        }
      );
    }))
  }
  onMusicItemSelected = (flag , id ) => {
    !flag ? this.insertFav(id) : this.deleteFav(id);
    this.getMusicList();
  };
  getMusicList = async () => {
    var objectFav = await this.selectFav();
    console.log( "objectFav  " + objectFav.length )
    
    console.log("!!!!!!!!")
    /*
    console.log(  Object.values(objectFav)["objectFav"] )
    var favlist = Object.values(objectFav).map(fav=>{
      console.log( fav )
      console.log( Object.values(fav)["id"] )
      return fav.id
    })
    console.log("!!!")
    console.log( favlist )
    */
    this.setState({isLoading:false})
  };
  render() {
    var { favList , isLoading } = this.state;
    favList = favList || [];
    /*
    musicList = musicList.map(function(music){
      if( favList.indexOf( music.id ) >= 0 ){
        music.favYn = true;
      };
      return music;
    });
     */
    
    return isLoading ? (
      <Loading />
    ) : (
      <List _musicList={musicList} _onMusicItemSelected={this.onMusicItemSelected}/>
    );
  }
}
