import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./view/Loading"
import List from "./view/List"
import { Audio } from 'expo-av';

import * as SQLite from 'expo-sqlite';

let playObject = new Audio.Sound();
const db = SQLite.openDatabase('db.childApp') 
let tableNm = "test1";
let musicList=[
  {id:1 , musicTitle : "개구리 앞다리" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:2 , musicTitle : "돼지삼형제" , replyTime:"00:25", musicFile : "abc.mp3",favYn:false},
  {id:3 , musicTitle : "꿈나라 별나라" , replyTime:"00:30", musicFile : "abc.mp3",favYn:false},
  {id:4 , musicTitle : "로켓트" , replyTime:"01:30", musicFile : "abc.mp3",favYn:false}
];
const sound = new Audio.Sound();
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
  // 테이블 생성
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
  _onMusicFavSelected = (flag , id ) => {
    /**
     * false -> 즐겨찾기 안함
     * true -> 즐겨찾기 함
    */
    !flag ? this.insertFav(id) : this.deleteFav(id);
    this.getMusicList();
  };
  
  onMusicTurn = async (id)=>{
    await sound.unloadAsync();
    await sound.loadAsync(  { uri: `http://192.168.0.107:3000/public/she.mp3` } );
    await sound.playAsync();
  };
  onStopMusic = async()=> {
    console.log("!!!!!!!!!!!!")
    await sound.unloadAsync();
  }
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
      <List _musicList={musicList} _onMusicFavSelected={this._onMusicFavSelected} _onMusicTurn={this.onMusicTurn} _onStopMusic={this.onStopMusic} />
    );
  }
}
