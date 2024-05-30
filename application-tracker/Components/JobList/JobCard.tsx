/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Text, TouchableOpacity, View } from "react-native";
import Application from "../../Model/Application";
import { Foundation } from "@expo/vector-icons";
import StatusIndicator from "./StatusIndicator";
import JobModal from "./JobModal";
import { useState } from "react";






/**
 * 
 * @param data:JobApplication Data, refresh: function from parent to refresh after perfoming actions in JobCard's child
 * @returns : Job Card display in Job List
 */
const JobCard:React.FC<{data:Application,refresh:()=>void;}> = ({data,refresh})=>{
   
    const [showModal, setModalVisibility] = useState(false);

    if(data.title.trim()==="" && data.link.trim()===""){
        return <></>
    }

return(<>

{ showModal && <JobModal close={()=>{setModalVisibility(false);}} refresh={refresh} job={data} />}

<TouchableOpacity onPress={()=>{setModalVisibility(true);}}>
    <View style={{margin:10, minHeight:120, shadowColor:'#075ba6', padding:10, borderRadius:15, backgroundColor:'white', borderWidth:2, borderColor:'#075ba6' }}>
    <View style={{display:'flex', flexDirection:"column"}}>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
        <Text style={{fontSize:20, fontFamily:'noto-bold', color:'#075ba6'}}>{data.title}</Text>
    <StatusIndicator status={data.status} />
        
        </View>
        <Text style={{fontFamily:'noto-regular'}}>{data.category}</Text>

        <Text style={{marginTop:20, fontFamily:'noto-regular'}}>
        <Foundation name="clipboard-notes" size={20} color="black" />
            {"  "}{data.notes.split('\n')[0].slice(0,30)}{data.notes.length>30?"...":""}</Text>
    </View>
</View></TouchableOpacity></>);


}
export default JobCard;
