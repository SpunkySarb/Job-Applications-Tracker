/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";




/**
 * 
 * @param onClose:Function, role:jobTitle, company:Category, getNotes:sends the changes to parent, value:Previous Notes Value
 * @returns NotesModal to edit Notes
 */


const NotesModal:React.FC<{onClose:()=>void; role:string, company:string, getNotes:(notes:string)=>void; value:string}> = ({onClose, getNotes, value, role, company})=>{
return(
    
    <Modal animationType="slide">
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View>
<View style={{marginTop:100}}>
<View style={{flexDirection:'row', justifyContent:'center', marginTop:0, marginBottom:10}}>
    <Text style={{fontSize:50, fontWeight:"500", color:"#075ba6",fontFamily:"noto-bold"}}>Job Notes</Text>
</View>
</View>


<View>
<View style={{flexDirection:'row', justifyContent:'center', padding:10,}}>
    <Text style={{fontFamily:"noto-bold"}}>{role.trim()===""?"Unknown":role} Role at {company.trim()===""?"Unknown Company":company}</Text>
</View>
<TextInput defaultValue={value} onChangeText={(t)=>{getNotes(t);}} style={{margin:10, padding:10, fontFamily:'noto-regular', borderWidth:2, borderColor:'#075ba6', borderRadius:15,  height:200}} multiline spellCheck={false} placeholder="Write Notes here.." />

</View>



<View style={{flexDirection:'row', justifyContent:'center'}}>
    <TouchableOpacity onPress={onClose} style={{paddingTop:15, zIndex:-1, paddingBottom:15, marginTop:10, width:'70%', justifyContent:'center', flexDirection:'row', borderRadius:15, backgroundColor:'#075ba6'}}>
    <Text style={{fontFamily:"noto-bold", fontSize:15, color:'white'}}>Save and Close</Text>
</TouchableOpacity>
</View>
</View>
</TouchableWithoutFeedback>
</Modal>


);


}
export default NotesModal;
