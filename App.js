import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./view/Loading"
import List from "./view/List"

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.childApp') 
let tableNm = "test1";
let musicList=[
  {id:1 , musicTitle : "개구리 앞다리" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:2 , musicTitle : "돼지삼형제" , replyTime:"00:25", musicFile : "abc.mp3",favYn:false},
  {id:3 , musicTitle : "꿈나라 별나라" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:4 , musicTitle : "로켓트" , replyTime:"01:30", musicFile : "abc.mp3",favYn:false},
  {id:5 , musicTitle : "아기돼지" , replyTime:"00:20", musicFile : "abc.mp3",favYn:false},
  {id:6 , musicTitle : "곰세마리" , replyTime:"01:30", musicFile : "abc.mp3",favYn:false},
  {id:7 , musicTitle : "엄마아빠" , replyTime:"02:12", musicFile : "abc.mp3",favYn:false},
  {id:8 , musicTitle : "할머니어디가" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:9 , musicTitle : "여드름" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:10 , musicTitle : "10music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:11 , musicTitle : "11music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:12 , musicTitle : "12music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:13 , musicTitle : "13music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:14 , musicTitle : "14music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:15 , musicTitle : "15music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:16 , musicTitle : "16music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:17 , musicTitle : "17music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:18 , musicTitle : "18music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:19 , musicTitle : "19music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:20 , musicTitle : "20music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:21 , musicTitle : "21music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:22 , musicTitle : "22music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:23 , musicTitle : "23music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:24 , musicTitle : "24music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:25 , musicTitle : "25music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:26 , musicTitle : "26music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:27 , musicTitle : "27music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:28 , musicTitle : "28music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
  {id:29 , musicTitle : "29music" , replyTime:"00:20", musicFile : "abc.mp3", favYn:false},
];

export default class extends React.Component {
  constructor (props){
    super(props)
  }
  state = {
    isLoading: true ,
    musicList:[]
  };
  componentWillUnmount(){
    this.createTable();
  }
  componentDidMount() {
    this.getMusicList();
  };

  createTable = async () =>{
    
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS '+tableNm+' (id INTEGER)'
      );
    })
  };
  async insertFav(id){
    db.transaction(tx => {tx.executeSql('INSERT INTO '+tableNm+' (ID) values (?)', [id]);},);
  };
  async deleteFav(id){
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
    /**
     * false -> 즐겨찾기 안함
     * true -> 즐겨찾기 함
    */
    !flag ? this.insertFav(id) : this.deleteFav(id);
    this.getMusicList();
  };
  getMusicList = async () => {
    const objectFav = await this.selectFav();
    let favList = [];
    for( var i=0 ; i <objectFav["_array"].length ; i++ ){
      favList.push( objectFav["_array"][i]["id"] )
    };
    musicList = musicList.map(function(music){
      if( favList.indexOf( music.id ) >= 0 ){
        music.favYn = true;
      }else{
        music.favYn = false;
      };
      return music;
    });

    this.setState({isLoading:false , musicList:musicList })
  };
  render() {
    
    let { isLoading } = this.state;
    
    return isLoading ? (
      <Loading />
    ) : (
      <List _musicList={musicList} _onMusicItemSelected={this.onMusicItemSelected}/>
    );
  }
}
