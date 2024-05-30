/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Entypo, Ionicons } from "@expo/vector-icons";
import { Dimensions, Modal, PermissionStatus, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Linking, Platform, Button, View } from 'react-native';
import ScreenMode, { ScreenModeType } from "./ScreenMode";
import { useState } from "react";
import Scheduler from "./Scheduler";



/**
 * 
 * Shown if No permission for notifications are given
 */
const NoPermission:React.FC<{close:()=>void;}> = ({close})=>{


    const {height, width} = Dimensions.get('window');

    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      };

return(<Modal animationType="slide">
 <SafeAreaView>
   
   <TouchableOpacity style={{margin:10}} onPress={()=>{close();}}>
    <Text><Ionicons name="arrow-back-circle" size={50} color="#075ba6" /></Text>
   </TouchableOpacity>

<View style={{display:'flex', height, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>


<Entypo name="bell" style={{marginBottom:30}} size={100} color="#075ba6" />

<Text style={{fontFamily:'noto-bold', textAlign:'center', fontSize:20, padding:15, color:'#075ba6'}}>
    In order to use this feature
    you must allow permission to show notifications in settings.
</Text>
<TouchableOpacity onPress={openAppSettings} style={{backgroundColor:'#075ba6', padding:10, borderRadius:10, justifyContent:'center', flexDirection:'row', minWidth:width/2, marginTop:10, marginBottom:height/2 }}>
    <Text style={{color:'white', fontFamily:"noto-bold",}}>Open Settings</Text>
</TouchableOpacity>
</View>

 </SafeAreaView>
</Modal>);


}






/**
 * 
 * Notificaiton Modal 
 */
const NotificationModal:React.FC<{notificationStatus:PermissionStatus, close:()=>void;}> = ({notificationStatus,close})=>{

    const [mode, setMode] = useState<ScreenModeType>('SAVE');

    if(notificationStatus!=='granted'){
        return <NoPermission close={close} />
    }

    

return(<Modal animationType="slide">
    <SafeAreaView>
    <TouchableOpacity style={{margin:10}} onPress={()=>{close();}}>
    <Text><Ionicons name="arrow-back-circle" size={50} color="#075ba6" /></Text>
   </TouchableOpacity>
<ScreenMode getMode={(mode)=>{setMode(mode);}} currentMode={mode} />

<Scheduler mode={mode} />


    </SafeAreaView>
 </Modal>);


}
export default NotificationModal;
