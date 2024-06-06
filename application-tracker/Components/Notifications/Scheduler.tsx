/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { ScrollView, Text, View } from "react-native";
import { ScreenModeType } from "./ScreenMode";
import DayOfWeek from "./DayOfWeek";







const Scheduler:React.FC<{mode:ScreenModeType}> = ({mode})=>{

    const info = mode==='SAVE'?
    "You can set reminders for each day of the week at specific time when you are ready to save jobs but, not able to apply at the moment."
    :
    "Here you can set reminders to remind yourself that it's time to apply for the jobs you have saved earlier.";

return(<View>
<ScrollView showsVerticalScrollIndicator={false}>

<View>
    <Text style={{fontFamily:'noto-regular', fontSize:16, margin:10}}>{info}</Text>
</View>

      <DayOfWeek mode={mode} day="Monday" />
      <DayOfWeek mode={mode} day="Tuesday" />
      <DayOfWeek mode={mode} day="Wednesday" />
      <DayOfWeek mode={mode} day="Thursday" />
      <DayOfWeek mode={mode} day="Friday" />
      <DayOfWeek mode={mode} day="Saturday" />
      <DayOfWeek mode={mode} day="Sunday" />

<View style={{height:600}} />
</ScrollView>
</View>);


}
export default Scheduler;
