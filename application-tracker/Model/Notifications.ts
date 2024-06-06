import { DayOfWeekType } from "../Components/Notifications/DayOfWeek";
import { ScreenModeType } from "../Components/Notifications/ScreenMode";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type NotificationStatusType = "ON"|"OFF";

const daysArray:DayOfWeekType[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class NotificationInfo {

    type:ScreenModeType;
    identifier:string|null;
    time:number;
    dayCode:number;
    day:DayOfWeekType;
    status:NotificationStatusType;

    constructor(type:ScreenModeType, time:number, day:DayOfWeekType){
        this.type = type;
        this.time = time;
        this.day = day;
        this.dayCode = daysArray.indexOf(day);
        this.identifier = null;
        this.status = 'OFF';
    }


}


class NotificationData {

    save:{[key:string]:NotificationInfo};
    apply:{[key:string]:NotificationInfo};

    constructor(){

        this.save = {};
        this.apply = {};
        daysArray.forEach((i)=>{
            const saveData = new NotificationInfo('SAVE', new Date().getTime(), i);
            const applyData = new NotificationInfo('APPLY', new Date().getTime(), i);
            this.save[i] = saveData;
            this.apply[i]= applyData;
        });
        
    }


    async saveChanges(){
        try{
            await AsyncStorage.setItem('saveData', JSON.stringify(this.save));
            await AsyncStorage.setItem('applyData', JSON.stringify(this.apply));
        }catch(err:any){
            console.log('Error Saving Notification Data');
        }
    }


    async loadData(){

        try{
           const saveData =  await AsyncStorage.getItem('saveData');
           const applyData = await AsyncStorage.getItem('applyData');

           if(saveData){
            this.save = JSON.parse(saveData);
           }
           if(applyData){
            this.apply = JSON.parse(applyData);

           }

        }catch(err:any){
            console.log('error Loading Notification Data')
        }
    }
    /**
     * 
     * @param day :day of the week
     * @returns identifier: Required to cancel a scheduled Notification
     */
    getSaveIdentifier(day:DayOfWeekType){
        return this.save[day].identifier;
    }
     /**
     * 
     * @param day :day of the week
     * @returns identifier: Required to cancel a scheduled Notification
     */
    getApplyIdentifier(day:DayOfWeekType){
        return this.apply[day].identifier;
    }

    /**
     * 
     * @param day : day of the week
     * @param identifier : is the identifier of the Scheduled notificaiton, which is required
     * if you want to cancel that notificaiton
     */
    setSaveIdentifier(day:DayOfWeekType, identifier:string|null){
        if(identifier!==null){
            this.save[day].status="ON";
        }else{
            this.save[day].status="OFF";
        }
        this.save[day].identifier = identifier;
        this.saveChanges();
    }

     /**
     * 
     * @param day : day of the week
     * @param identifier : is the identifier of the Scheduled notificaiton, which is required
     * if you want to cancel that notificaiton
     */
    setApplyIdentifier(day:DayOfWeekType, identifier:string|null){
        if(identifier!==null){
            this.apply[day].status="ON";
        }else{
            this.apply[day].status="OFF";
        }
        this.apply[day].identifier = identifier;
        this.saveChanges();
    }

    setSaveTime(time:number, day:DayOfWeekType){
        this.save[day].time = time;
        this.saveChanges();
        return this.save[day].time;
    }
    setApplyTime(time:number, day:DayOfWeekType){
        this.apply[day].time = time;
        this.saveChanges(); 
        return this.apply[day].time;
    }

    getSaveTime(day:DayOfWeekType){
        return this.save[day].time;
    }
    getApplyTime(day:DayOfWeekType){
        return this.apply[day].time;
    }

    getHourAndMinute(timestamp:number) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return { hours, minutes };
      }
      



}



const notificationData = new NotificationData();
export default notificationData;