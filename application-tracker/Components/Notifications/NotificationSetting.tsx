/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { PermissionStatus, Platform, Text, TouchableOpacity, View } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import NotificationModal from "./NotificationModal";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });



const NotificationSetting:React.FC<{text:string, info:string}> = ({text,info})=>{


    const [showModal, setModalVisibility] = useState(false);

    const [notificationStatus, setNotificationStatus] = useState<PermissionStatus>('granted');
    const [pushToken, setPushToken] = useState<string|undefined>("");
   
    useEffect(()=>{

        registerForPushNotificationsAsync().then(token=>{setPushToken(token);}).catch(err=>{console.log(err)});

        Notifications.getPermissionsAsync().then((status:Notifications.NotificationPermissionsStatus)=>{
            setNotificationStatus(status.status as PermissionStatus);
   }).catch(err=>{console.log(err)});

    },[]);

return(<>
{showModal &&  <NotificationModal close={()=>{setModalVisibility(false);}} notificationStatus={notificationStatus} />}
<View style={{margin:10}}>

<TouchableOpacity onPress={()=>{setModalVisibility(true);}} style={{display:'flex', alignItems:'center', shadowColor:'gray', shadowOffset:{width:2,height:5}, shadowOpacity:0.5, backgroundColor:'#075ba6', padding:10,borderRadius:20, flexDirection:'row', justifyContent:'space-between'}}>

<Entypo  name="bell" size={24} color="white" />

<View style={{display:'flex', flexDirection:'column'}}>
<Text style={{fontFamily:'noto-bold',color:'white',fontSize:20}}>{text}</Text>
<Text style={{color:'white'}}>{info}</Text>
</View>
{notificationStatus==='granted' ? <Ionicons name="settings" size={24} color="white" />:
<MaterialIcons name="error" size={30} color="#ff3849" />}
</TouchableOpacity>


</View>
</>
);


}




  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }



export default NotificationSetting;
