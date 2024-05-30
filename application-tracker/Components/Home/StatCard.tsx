/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Text, View } from "react-native";
import { StatusType } from "../JobList/StatusIndicator";
import { jobList } from "../../Model/ApplicationList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";






/**
 * 
 * @param title:Job category (applied or not etc.), status:Same as title, color: color of the card
 * @returns  Card to show number of jobs applied or rejected in Home.
 */
const StatCard:React.FC<{title:string, status:StatusType, color:string}> = ({title, status, color})=>{

const [statNumber, setStatNumber] = useState(jobList.lengths[status]?jobList.lengths[status]:0);

const isFocused = useIsFocused();

useEffect(()=>{

    setStatNumber(jobList.lengths[status]?jobList.lengths[status]:0);

},[isFocused]);


return(<View style={{margin:10, shadowColor:'gray', shadowOpacity:0.5, shadowOffset:{width:4,height:5}, width:150, height:150, borderRadius:10, backgroundColor:color, padding:20}}>
<View style={{justifyContent:'center', marginTop:0, flexDirection:'row', alignItems:'center'}} >
    {/**Rejected-1 below because a blank rejected applcation was added to tail to initialize the LinkedList */}
    <Text style={{fontSize:50, fontFamily:'noto-bold', color:color==='yellow'?"black":'white'}}>{ status==="rejected"?statNumber-1:statNumber}</Text>
    </View>

<View style={{flexDirection:'row', marginTop:20, justifyContent:'center', }}>
<Text style={{ fontFamily:"noto-bold", color:color==='yellow'?"black":'white'}}>{title}</Text>

</View>

</View>);


}
export default StatCard;
