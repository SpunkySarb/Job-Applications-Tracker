/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import {  Text, TouchableOpacity, View } from "react-native";
import { jobList } from "../../Model/ApplicationList";
import { useEffect, useState } from "react";
import * as StoreReview from 'expo-store-review';
import AsyncStorage from "@react-native-async-storage/async-storage";






const AskReview:React.FC = ()=>{

    const appliedLength = jobList.lengths['applied'];
    const [ask, setAskExistence] = useState(true);
    const [alreadyReviewed, setAlreadyReviewedStatus] = useState(true);
    


    const requestReview = async () => {
        
        if (await StoreReview.isAvailableAsync()) {
          try {
            await StoreReview.requestReview();
            saveReviewed();
            setAskExistence(false);
            setAlreadyReviewedStatus(true);
            
          } catch (error) {
            console.log('Error', 'Unable to request review at this time.');
          }
        } else {
          console.log('Not Supported', 'In-app review is not supported on this device.');
        }
      };

      const saveReviewed = async ()=>{
        await AsyncStorage.setItem('isReviewed',"true");
      }

      const getReviewStatus = async ()=>{
        return await AsyncStorage.getItem('isReviewed');
      }


      useEffect(()=>{
        getReviewStatus().then(status=>{
            if(status==='true'){
                console.log('already Reviewed')
            }else{
                setAlreadyReviewedStatus(false);
            }
        }).catch(err=>{console.log(err)});
      },[]);


    if(appliedLength===undefined){
        return <></>
    }else if(appliedLength<2 && ask===true){
return <></>
    }else if(ask===false){
        return <></>;
    }else if(alreadyReviewed){
        return <></>;
    }

return(<View style={{margin:10, borderWidth:2, borderColor:'#075ba6', borderRadius:19}}>

<View style={{justifyContent:'center', alignSelf:'center'}}>
    <Text style={{fontFamily:'noto-regular', fontSize:20, color:'#075ba6'}}>Love using Job Queue ?</Text>
</View>

<View style={{flexDirection:'row', justifyContent:'space-around',padding:10}}>
    <TouchableOpacity onPress={()=>{setAskExistence(false);}} style={{backgroundColor:'#075ba6', padding:2, paddingRight:15, paddingLeft:15, borderRadius:15}}>
        <Text style={{fontSize:17, fontFamily:'noto-bold', color:'white'}}>Close</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={requestReview} style={{backgroundColor:'#075ba6', padding:2, paddingRight:15, paddingLeft:15, borderRadius:15}}>
        <Text style={{fontSize:17, fontFamily:'noto-bold', color:'white'}}>Yes</Text>
    </TouchableOpacity>
</View>

</View>);


}
export default AskReview;
