import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity 
} from "react-native";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/AntDesign';


const { height,width} = Dimensions.get("window");

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  static propTypes = {
    _music : PropTypes.object.isRequired,
    _onItemSelected: PropTypes.func.isRequired,
  }
  _turnMusic = (event) =>{
    event.stopPropagation;
    const {_music} = this.props
  };
  _turnFav = (event) =>{
    event.stopPropagation;
    const {_onItemSelected , _music } = this.props
    _onItemSelected( _music.favYn , _music.id );

  };
  
  render() {
    let {_music : {musicTitle , musicFile , replyTime , favYn },   } = this.props;
    
    return(
      <View style={styles.container}>
        <View style={styles.column}>
              <TouchableOpacity  style={[styles.f5 , styles.touchZone]} onPress={this._turnMusic}>
                <View  style={styles.f4}><Text style={styles.txt}>{musicTitle}</Text></View>
                <View  style={styles.f1}><Text style={styles.txt}>{replyTime}</Text></View>
              </TouchableOpacity>
              <TouchableOpacity  style={ [styles.f1 , styles.fav ] } onPress={this._turnFav}>
                  { favYn ? 
                    <Icon name="star" size={30} color="#4F8EF7" />  :  
                    <Icon name="staro" size={30} color="#4F8EF7" /> 
                  }
              </TouchableOpacity>
         </View>
      </View>
      )
  };
};



const styles = StyleSheet.create({
  f1:{flex:1},f2:{flex:2},f3:{flex:3},f4:{flex:4},f5:{flex:5},f6:{flex:6},f7:{flex:7},
  txt:{color:"white",alignItems: 'flex-start'},
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection :"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingBottom:10,
    width:width-30
  },
  touchZone:{
    flexDirection:"row",
    alignItems:"center",
  },
  column:{
    flexDirection:"row",
    alignItems:"center",
    width:width-30
  },
  fav:{
    alignItems:"center",
  }
});
