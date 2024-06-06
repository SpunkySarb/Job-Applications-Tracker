/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Dimensions, Linking, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";
import { jobList } from "../../Model/ApplicationList";



/**
 * 
 * @param close: function to close the InfoModal
 * @returns InfoModal where about the app and a button to Erase all data lies.
 */
const InfoModal:React.FC<{close:()=>void;}> = ({close})=>{

const [isErased, setEraser] = useState(false);

    const eraseData = ()=>{

        Alert.alert('Are you sure you want to erase all Jobs and their data ?', "Please Confirm or Cancel", [
            {text:'Confirm', style:'destructive', onPress:()=>{jobList.eraseData().then(()=>{setEraser(true);}).catch(err=>{console.log(err)});}}, {text:'Cancel'}
        ])


    }



return(<Modal animationType="slide">
<SafeAreaView>
<TouchableOpacity onPress={close}>
    <AntDesign name="closecircle" style={{margin:5}} size={50} color="#075ba6" />
</TouchableOpacity>

<View>
<Text style={{fontSize: 16, fontFamily:'noto-regular', color: '#333', textAlign: 'justify', margin: 10}}>
    JobQueue was developed to streamline the job application process, making it easier to save, categorize, and track job listings. The app allows users to save job links while on the go (eg. Travelling, At Work, not able to edit resume and apply at the moment, etc..), categorize them into different stages such as 'To Be Applied', 'Applied', 'Rejected', and 'Interviews', and receive reminders to apply for saved jobs. By keeping job applications organized, users can focus on applying strategically and efficiently, ultimately improving their job search experience.
  </Text>
  <Text style={{fontSize: 14, fontFamily:'noto-bold', color: 'green', textAlign: 'center', marginTop: 20}}>
   Made with ❤️ by SarbZone
  </Text>
  <Text style={{fontSize: 14, fontFamily:'noto-bold', color: '#1E90FF', textAlign: 'center', marginTop: 5}} onPress={() => Linking.openURL('https://www.sarbzone.com')}>
    https://www.sarbzone.com
  </Text>
</View>

<View style={{justifyContent:'center', flexDirection:'row',marginTop:20}}>
   {!isErased? <TouchableOpacity onPress={eraseData} style={{ padding:5, paddingRight:10, paddingLeft:10, borderRadius:10, borderWidth:2, borderColor:'red', justifyContent:'center', flexDirection:'row'}}>
        <Text style={{fontFamily:'noto-bold', fontSize:15, color:'red'}}>Erase all Jobs</Text>
    </TouchableOpacity>:
    <Text style={{color:'red', fontFamily:'noto-bold'}}>Data Erased for Fresh Start!</Text>}
    
</View>

</SafeAreaView>
</Modal>);


}






const Info:React.FC = ()=>{

const {width, height} = Dimensions.get('screen');
const [showModal, setModalVisibility] = useState(false);

return(<>
{showModal && <InfoModal close={()=>{setModalVisibility(false);}} />}
<TouchableOpacity onPress={()=>{setModalVisibility(true);}} style={{position:'absolute', shadowColor:'gray', backgroundColor:'white', borderRadius:20, shadowOpacity:0.5, shadowOffset:{width:5,height:5}, bottom:height/6 , right:20}}>

<AntDesign name="infocirlce" size={40} color="#075ba6" />
</TouchableOpacity>
</>);


}
export default Info;
