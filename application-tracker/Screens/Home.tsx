/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Dimensions, PermissionStatus, Text, View } from "react-native";
import StatCard from "../Components/Home/StatCard";
import NotificationSetting from "../Components/Notifications/NotificationSetting";
import { useEffect, useState } from "react";
import Info from "../Components/Home/Info";





const Home:React.FC = ()=>{

    const {height,width} = Dimensions.get('window');

   

return(<View style={{backgroundColor:'white', width,height}}>

<View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}> 
    <Text style={{fontSize:50, fontWeight:"500", color:"#075ba6",fontFamily:"noto-bold"}}>Status</Text>
</View>

{/**Stat Cards Container */}
<View style={{display:'flex', justifyContent:'center', flexDirection:'row', flexWrap:'wrap'}}>
<StatCard title="Not Applied" color="yellow" status="not-applied" />
<StatCard title="Applied" color="#075ba6" status="applied" />
<StatCard title="Rejected" color="red" status="rejected" />
<StatCard title="Interview" color="green" status="interview" />
</View>


<NotificationSetting text="Notification Settings" info="Set Reminders when to Apply and Save Jobs" />


<Info/>

</View>);


}
export default Home;
