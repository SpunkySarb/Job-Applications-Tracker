/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Text, TouchableOpacity, View } from "react-native";
import StatusIndicator, { StatusType } from "./StatusIndicator";
import { Entypo } from "@expo/vector-icons";






/**
 * 
 * @param tag: Status of application, active: if we are filtering the list via this tag, getActive: if we click on a tag and we filter the list on that basis in the parent component
 * @returns Tags
 */
const Tag:React.FC<{tag:StatusType,active:boolean, getActive:(tag:StatusType)=>void;}> = ({tag, getActive, active=true})=>{

const textStyle = active?{color:'white'}:{color:'#075ba6'};
const containerBackground = active?"#075ba6":'white';


return(<TouchableOpacity onPress={()=>{getActive(tag);}} ><View style={{margin:0, borderRightWidth:0,  flexDirection:'row', justifyContent:tag==='interview'?"flex-start":'center', alignItems:'center',  minWidth:tag==='interview'?"100%":"auto", padding:5, paddingRight:8,paddingLeft:8, backgroundColor:containerBackground, borderLeftWidth:2, borderColor:'#075ba6'}}>
<Text style={{...textStyle, fontFamily:'noto-regular',  fontWeight:'400'}}>{tag}{" "}</Text>

 <StatusIndicator status={tag}  />


</View></TouchableOpacity>);


}
export default Tag;
