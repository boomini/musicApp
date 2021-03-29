import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./view/Loading"
import List from "./view/List"

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
var favList = [
  1,3,5,7,9
];

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getMusicList = async () => {
    musicList = musicList.map(function(music){
      
      if( favList.indexOf( music.id ) >= 0 ){
        music.favYn = true;
      };
      return music;
    });
    
    this.setState({
      isLoading: false
    });

  };
  componentDidMount() {
    this.getMusicList();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <List _musicList={musicList}/>
    );
  }
}
