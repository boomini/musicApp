import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity 
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import uuidv1 from "uuid/v1";
import Icon from 'react-native-vector-icons/AntDesign';


const { height,width} = Dimensions.get("window");

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  static propTypes = {
    _cnt : PropTypes.number.isRequired,
    _music : PropTypes.object.isRequired
  }
  _turnMusic = (event) =>{
    event.stopPropagation;
    const {_music} = this.props
    console.log( _music );
  }
  render() {
    const {_music : {musicTitle , musicFile , replyTime , favYn }, _cnt } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.column}>
              <TouchableOpacity  style={[styles.f5 , styles.touchZone]} onPress={this._turnMusic}>
                <View  style={styles.f1}><Text style={styles.txt}>{_cnt}</Text></View>
                <View  style={styles.f4}><Text style={styles.txt}>{musicTitle}</Text></View>
                <View  style={styles.f1}><Text style={styles.txt}>{replyTime}</Text></View>
              </TouchableOpacity>
                <View  style={[styles.f1 , styles.fav ]}>
                  { favYn ? 
                    <Icon name="star" size={30} color="#4F8EF7" />  :  
                    <Icon name="staro" size={30} color="#4F8EF7" /> 
                  }
                  
                </View>
                
                
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
