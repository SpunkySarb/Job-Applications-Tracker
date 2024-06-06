/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Alert, Dimensions, Keyboard, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Application from "../../Model/Application";
import {  Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import StatusIndicator, { StatusType } from "./StatusIndicator";
import { jobList } from "../../Model/ApplicationList";
import { useState } from "react";






/**
 * 
 * @param job:Applicaiion Object, refresh:from parent to refresh the list, close: to close the modal 
 * @returns JobModal to perform actions of JobApplicaiton eg: applied, rejected or edit Notes
 */
const JobModal:React.FC<{job:Application, refresh:()=>void; close:()=>void;}> = ({job, refresh, close})=>{

    const {width,height} = Dimensions.get('screen');

    const [currentStatus, setCurrentStatus] = useState(job.status);
    const [isEditing, setEditing] = useState(false);
    const [notes, setNotes] = useState(job.notes);

    const copyJobLink = async ()=>{

        await Clipboard.setStringAsync(job.link);
        Alert.alert("Job Link Copied..", "Hurry Up! and Apply the Job..🙂");

    }

    const deleteApplication = (link:string)=>{

        Alert.alert('Delete Application ?','Are you sure you want to delete this application ?',
            [{text:'Confirm', style:'destructive', onPress:()=>{

                jobList.delete(link);
                refresh();
                close();
            }},{text:'cancel'}]
        )

        

    }

    const markStatus = (status:StatusType)=>{
Alert.alert(`Are you Sure you want to mark this Application as it got ${status} ?`, "", [{text:'Yes', style:'destructive', onPress:()=>{

    switch (status) {
        case "applied":
            job.applied(jobList);
            setCurrentStatus('applied');
            refresh();
            close();
            break;
        case 'rejected':
            job.gotRejected(jobList);
            setCurrentStatus('rejected');
            refresh();
            close();
            break;
        case 'interview':
            job.gotInterview(jobList);
            setCurrentStatus('interview');
            refresh();
            close();
            break;
        
    
        default:
            break;
    }
    

}}, {text:'Cancel'}])
    }

return(<Modal animationType="slide">
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView>
<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
  
  <TouchableOpacity onPress={()=>{refresh();close();}} style={{marginLeft:10}}>
  <Ionicons name={"arrow-back-circle-sharp"} size={50} color="#075ba6" />
  </TouchableOpacity>
  
    <Text style={{fontSize:30, fontFamily:'noto-bold', color:"#075ba6"}}>Job Info</Text>

    <TouchableOpacity onPress={()=>{setEditing(prev=>!prev);setNotes(job.notes);}} style={{padding:5, marginRight:10, justifyContent:'center', alignItems:'center', width:40,height:40, borderRadius:40, backgroundColor:'#075ba6'}}>
    <Ionicons name={isEditing?"close":"pencil"} size={25} color="white" />
    </TouchableOpacity>

</View>
<View>
</View>



{/** Action Body */}
<View>

<View style={{flexDirection:'row', padding:5, borderBottomWidth:1, borderColor:'#075ba6', margin:10, alignItems:'center', justifyContent:'space-between'}}>
<Text style={{fontSize:18,fontFamily:'noto-bold'}}>{job.title}</Text>
<Text style={{color:'#075ba6'}}>{job.category}</Text>
</View>

{/**NOTES VIEW */}
    <View style={{ margin:5, borderWidth:1,height:height*0.40, borderColor:'#075ba6', borderRadius:10}}>
<View style={{flexDirection:'row', justifyContent:'center', padding:5, backgroundColor:'#075ba6',borderTopStartRadius:9, borderTopEndRadius:9}}>
    <Text style={{fontFamily:'noto-bold', color:'white'}}>NOTES</Text>
</View>
<ScrollView showsVerticalScrollIndicator={false}>
{!isEditing && <Text>{job.notes}</Text>}
{isEditing && <TextInput autoFocus onChangeText={(t)=>{setNotes(t);}} style={{width:'100%', height:200}} multiline defaultValue={job.notes} />}
</ScrollView>
{isEditing && <TouchableOpacity onPress={()=>{job.updateNotes(notes, jobList); setEditing(false);}} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#075ba6', padding:5, borderBottomEndRadius:9, borderBottomStartRadius:9}} ><Text style={{color:'white', fontFamily:'noto-bold', }}>SAVE CHANGES</Text></TouchableOpacity>}
</View>
</View>

{/**Copy Link */}
<TouchableOpacity onPress={copyJobLink} style={{alignItems:'center', shadowOpacity:0.5, shadowColor:'gray', shadowOffset:{width:2,height:5}, backgroundColor:'#075ba6', margin:10, padding:10, borderRadius:20, justifyContent:'center'}}>
<Text style={{color:'white'}}>{job.link.slice(0,30)}</Text>
<Text style={{fontSize:18,color:'white', fontFamily:'noto-bold'}}>Click to Copy Job Link</Text>
</TouchableOpacity>

{/** Job Status */}
<View style={{flexDirection:'row', borderTopWidth:2, backgroundColor:'#075ba6', borderColor:'#075ba6', borderBottomWidth:2, justifyContent:'space-around', alignItems:'center'}}>
<Text style={{fontSize:20, fontFamily:'noto-bold', color:'white'}}>STATUS</Text>
<StatusIndicator animate status={currentStatus}/>
<Text style={{fontSize:18, fontFamily:'noto-bold',color:'white'}}>{job.status.toUpperCase()}</Text>
</View>

{/**Job Status Actions */}
<View style={{flexDirection:'row', marginTop:20, justifyContent:'space-around'}}>

{currentStatus==="not-applied" && <TouchableOpacity onPress={()=>{markStatus('applied')}} style={{flexDirection:'row', alignItems:'center', borderRadius:20, justifyContent:'center', width:width/2.2, padding:10, margin:5, backgroundColor:'#075ba6' }}>
<Text style={{fontFamily:'noto-bold', color:'white'}}><StatusIndicator animate status={'applied'} /> MARK APPLIED</Text>
</TouchableOpacity>}

{currentStatus==="not-applied" && <TouchableOpacity onPress={()=>{deleteApplication(job.link)}} style={{flexDirection:'row', alignItems:'center', borderRadius:20, justifyContent:'center', width:width/2.2, padding:10, margin:5, backgroundColor:'#075ba6' }}>
<Text style={{fontFamily:'noto-bold', color:'white'}}><StatusIndicator animate status={'rejected'} />  DELETE</Text>
</TouchableOpacity>}

</View>

<View style={{flexDirection:'row', marginTop:20, justifyContent:'space-around'}}>

{currentStatus==="applied" && <TouchableOpacity onPress={()=>{markStatus('rejected')}} style={{flexDirection:'row', alignItems:'center', borderRadius:20, justifyContent:'center', width:width/2.2, padding:10, margin:5, backgroundColor:'#075ba6' }}>
<Text style={{fontFamily:'noto-bold', color:'white'}}><StatusIndicator animate status={'rejected'} /> MARK REJECTED</Text>
</TouchableOpacity>}

{currentStatus==="applied" && <TouchableOpacity onPress={()=>{markStatus('interview')}} style={{flexDirection:'row', alignItems:'center', borderRadius:20, justifyContent:'center', width:width/2.2, padding:10, margin:5, backgroundColor:'#075ba6' }}>
<Text style={{fontFamily:'noto-bold', color:'white'}}><StatusIndicator animate status={'interview'} /> GOT INTERVIEW</Text>
</TouchableOpacity>}
</View>






</SafeAreaView>
    </TouchableWithoutFeedback>
</Modal>);


}
export default JobModal;
