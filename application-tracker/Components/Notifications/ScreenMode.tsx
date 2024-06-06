/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Text, TouchableOpacity, View } from "react-native";



export type ScreenModeType = "APPLY"|"SAVE";


/**
 * 
 *Toggler to switch SaveMode and ApplyMode
 */
const ScreenMode:React.FC<{getMode:(mode:ScreenModeType)=>void, currentMode:ScreenModeType}> = ({getMode, currentMode})=>{

    const active = {button:{backgroundColor:"#075ba6"}, text:{color:'white'}};
    const passive = {button:{backgroundColor:'white'}, text:{color:"#075ba6"}};


return(<View style={{flexDirection:'row', borderBottomWidth:2, borderColor:'#075ba6', justifyContent:'space-around',}}>
<TouchableOpacity onPress={()=>{getMode('SAVE')}} style={{flexDirection:'row', padding:5, width:'50%', borderTopStartRadius:20, borderTopEndRadius:20, justifyContent:'center',...(currentMode==='SAVE'?active.button:passive.button)}}>
    <Text style={{fontFamily:"noto-bold", fontSize:20, ...(currentMode==='SAVE'?active.text:passive.text)}}>SAVE</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{getMode('APPLY')}} style={{flexDirection:'row', padding:5, width:'50%', borderTopStartRadius:20, borderTopEndRadius:20, justifyContent:'center',...(currentMode==='APPLY'?active.button:passive.button)}}>
    <Text style={{fontFamily:"noto-bold", fontSize:20, ...(currentMode==='APPLY'?active.text:passive.text)}}>APPLY</Text>
</TouchableOpacity>
</View>);


}
export default ScreenMode;
