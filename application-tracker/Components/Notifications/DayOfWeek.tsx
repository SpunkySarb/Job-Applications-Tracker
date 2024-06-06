/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Switch, Text, View } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenModeType } from "./ScreenMode";
import { useEffect, useState } from "react";
import notificationData from "../../Model/Notifications";
import * as Notifications from 'expo-notifications';


export type DayOfWeekType = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";


/**
 * 
 * MODE: mode is basically the setting mode, are we scheduling the save jobs notificaiton asking the user to save the jobs
 or are we asking the user to apply jobs if scheduling notifications for Apply mode
 
 */

/**
 * 
 * This sets the notifications for each day of the week on specific times and for both 
 * Save and Apply notificaitons
 * 
 * @param day: Day of the week, mode: SaveMode or Apply Mode (for notificaiton settings) 
 * @returns Component where You can choose the time and turn on and of Notifications
 */
const DayOfWeek:React.FC<{day:DayOfWeekType, mode:ScreenModeType}> = ({day,mode})=>{

    //times alredy been set to show notification on a specific day of the week
    const saveTime = notificationData.save[day].time;
    const applyTime = notificationData.apply[day].time;

    //extracting if the notifications were turned on or not for this day
    const saveSwitchMode = notificationData.save[day].status;
    const applySwitchMode = notificationData.apply[day].status;

    //checking the mode(Save mode or ApplyMode) and assiging the switch value true or false
    const thisSwitchMode = mode==='SAVE'?saveSwitchMode:applySwitchMode;

    const [switchValue, setSwitchValue] = useState(thisSwitchMode==='ON');
    const [time, setTime] = useState(mode==='SAVE'?saveTime:applyTime);

    useEffect(()=>{

        //updating the time and switch value according to the MODE
        setTime(mode==='SAVE'?saveTime:applyTime);
        setSwitchValue(thisSwitchMode==='ON');

    },[mode]);

/**
 * 
 * @param timestamp : number
 * 
 * NOTE: if the switch was already turned ON as true (i.e. notification was already scheduled for that day)
 * Then we cancel the previous notifcation and schedule a new ONe..
 * 
 */
const changeTime = (timestamp:number)=>{
    if(mode==='SAVE'){
const newTime = notificationData.setSaveTime(timestamp, day);
if(switchValue===true){
cancelScheduledNotification(notificationData.save[day].identifier!).then(()=>{
    schedulePushNotification(mode, day).then((identifier)=>{
        notificationData.setSaveIdentifier(day, identifier);
    }).catch(err=>{console.log(err)});
}).catch(err=>{console.log(err)});
}
setTime(newTime);
    }else{
        const newTime = notificationData.setApplyTime(timestamp, day);
        if(switchValue===true){
            cancelScheduledNotification(notificationData.apply[day].identifier!).then(()=>{
                schedulePushNotification(mode, day).then((identifier)=>{
                    notificationData.setApplyIdentifier(day, identifier);
                }).catch(err=>{console.log(err)});
            }).catch(err=>{console.log(err)});
            }
        setTime(newTime);
    }
}


/**
 * 
 * @param value :switch value
 * 
 * Turning on and Off Notification
 */
const changeSwitch = async (value:boolean)=>{

    if(mode==='SAVE'){
        if(value===false){
            const prevIdentifier = notificationData.getSaveIdentifier(day);
            if(prevIdentifier){
                await cancelScheduledNotification(prevIdentifier);
            }
            notificationData.setSaveIdentifier(day, null);
            setSwitchValue(notificationData.save[day].status==="ON");
        }else{
            ///schedule notification and SetIdentifier
            const identifier = await schedulePushNotification(mode, day);
            notificationData.setSaveIdentifier(day, identifier);
            setSwitchValue(notificationData.save[day].status==="ON");
        }

    }else{
        if(value===false){
            const prevIdentifier = notificationData.getApplyIdentifier(day);
            if(prevIdentifier){
                //cancel notification
                await cancelScheduledNotification(prevIdentifier);
            }
            notificationData.setApplyIdentifier(day, null);
            setSwitchValue(notificationData.apply[day].status==="ON");
        }else{
            ///schedule notification and setIdentifier
            const identifier = await schedulePushNotification(mode, day);
            notificationData.setApplyIdentifier(day, identifier);
            setSwitchValue(notificationData.apply[day].status==="ON");
        }
    }

}



return(<View style={{margin:10, borderLeftWidth:1, borderRightWidth:1, borderBottomWidth:1,  borderColor:'#075ba6'}}>
    <View style={{padding:5, backgroundColor:'#075ba6', }}>
        <Text style={{color:'white', fontFamily:'noto-bold', fontSize:18, margin:5}}>{day}</Text>
    </View>
    <View style={{justifyContent:'space-around', flexDirection:'row', padding:5}}>
        <DateTimePicker onChange={(t)=>{changeTime(t.nativeEvent.timestamp)}} mode="time" style={{ borderStartStartRadius:20}}  value={new Date(time)} />
        <Switch trackColor={{true:'#075ba6'}} onChange={(e)=>{changeSwitch(e.nativeEvent.value);}} value={switchValue} />
    </View>
</View>);


}

 async function schedulePushNotification(mode:ScreenModeType, day:DayOfWeekType) {
    const notification = mode==='SAVE'?notificationData.save[day]:notificationData.apply[day];
    const {hours, minutes} = notificationData.getHourAndMinute(notification.time);
   const identifier =  await Notifications.scheduleNotificationAsync({
      content: {
        title: mode==="SAVE"?"🛟 Time to Save Some Jobs":"Apply Now! 💻",
        body: mode==="SAVE"?"Save the jobs you find during your search. Apply later with ease.":'It’s time to apply to the jobs you’ve saved. Make your move today.',
        data: {},
        sound:'default',
      },
      trigger: { 
        weekday:notification.dayCode+1,
        hour:hours,
        minute:minutes,
        repeats:true

       },
    });
    console.log(`Scheduled notification with ID: ${identifier}`);
  return identifier;
  }
  
 async function cancelScheduledNotification(identifier:string) {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    console.log(`Canceled notification with ID: ${identifier}`);
  }


export default DayOfWeek;
