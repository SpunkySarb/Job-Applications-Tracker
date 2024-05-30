/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Dimensions, ScrollView, Text, View } from "react-native";
import { jobList } from "../Model/ApplicationList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import JobCard from "../Components/JobList/JobCard";
import SearchBar from "../Components/JobList/SearchBar";
import TagBar from "../Components/JobList/TagBar";
import { StatusType } from "../Components/JobList/StatusIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AskReview from "../Components/Review/AskReview";



const EmptyData = ()=>{
    return <View style={{justifyContent:'center', alignItems:'center', marginTop:100}}>
        <MaterialCommunityIcons name="robot-happy-outline" size={50} color="#075ba6" />
        <Text style={{fontFamily:'noto-regular', color:'#075ba6', textAlign:'center', marginTop:20}}>No jobs found in this category</Text>
    </View>
}



const JobList:React.FC = ()=>{
    const {height,width} = Dimensions.get('window');
    const [jobs,setJobs] = useState(jobList.getList());

    const  [searchQuery, setSearchQuery] = useState("");
    const [filterTag, setFilterTag] = useState<StatusType>('not-applied');

    


const isFocused = useIsFocused();
    useEffect(()=>{
        setJobs(jobList.getList());
        searchList(searchQuery); 
        filterList(filterTag);

    },[isFocused]);

 const searchList = (query:string)=>{
    setSearchQuery(query);
    const filteredList = filterList(filterTag);
 const searchedList = filteredList.filter(i=>{
        const context = (i.title+i.category+i.notes).trim().toLowerCase();
        return context.includes(query.trim().toLowerCase());
    });
    setJobs(searchedList);
 }

 const filterList = (tag:StatusType)=>{
setFilterTag(tag);
const list = jobList.getList().filter(i=>i.status===tag)
    setJobs(list);
   
    return list;


 }

 const refresh = ()=>{
    
     setJobs(jobList.getList());
      searchList(searchQuery);
        filterList(filterTag);
 }

 useEffect(()=>{

    filterList('not-applied');

 },[]);

return(<View style={{backgroundColor:'white', width,height}}>
   
{/**Title */}
   <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>
    <Text style={{fontSize:30, fontWeight:"500", color:"#075ba6",fontFamily:"noto-bold"}}>Job Queue</Text>
</View>

{/**Tag and search */}
<SearchBar getSearchText={(t)=>{searchList(t);}} />
<TagBar getActiveTag={(tag)=>{filterList(tag);}} />


{/**Tag and search */}



<AskReview/>
{/**Jobs */}

<ScrollView showsVerticalScrollIndicator={false}>
    {jobs.map((i,index)=><JobCard key={index} refresh={refresh} data={i}/>)}

    {(jobs.length===0|| (jobs.length===1&&filterTag==='rejected')) && <EmptyData/>}


<View style={{height:200}}/>


</ScrollView>



</View>);


}
export default JobList;
