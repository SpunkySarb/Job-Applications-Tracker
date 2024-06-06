/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { ScrollView, View } from "react-native";
import Tag from "./Tag";
import { useState } from "react";
import { StatusType } from "./StatusIndicator";






/**
 * 
 * @param getActiveTag: spits the active tag to the parent and parent filters the list according to the selected tag
 * @returns TagBar below the search bar
 */
const TagBar:React.FC<{getActiveTag:(tag:StatusType)=>void;}> = ({getActiveTag})=>{

    const [activeTag, setActiveTag] = useState<StatusType>('not-applied');

return(<View style={{borderBottomWidth:2, borderColor:"#075ba6", borderTopWidth:2,  backgroundColor:'white', }}>
   <ScrollView showsHorizontalScrollIndicator={false} horizontal>
    <Tag tag="not-applied" getActive={(tag)=>{setActiveTag(tag); getActiveTag(tag);}} active={activeTag==='not-applied'} />
    <Tag tag="applied" getActive={(tag)=>{setActiveTag(tag); getActiveTag(tag);}} active={activeTag==='applied'}/>
    <Tag tag="rejected" getActive={(tag)=>{setActiveTag(tag); getActiveTag(tag);}} active={activeTag==='rejected'}/>
    <Tag tag="interview" getActive={(tag)=>{setActiveTag(tag); getActiveTag(tag);}} active={activeTag==='interview'}/>
    </ScrollView> 
</View>);


}
export default TagBar;
