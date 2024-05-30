/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { FontAwesome } from "@expo/vector-icons";
import { useCallback } from "react";
import { TextInput, View } from "react-native";


/**
 * 
 * @param getSearchText: spits the searchbar's text to the parent 
 * @returns Searchbar in JobList
 */
const SearchBar: React.FC<{ getSearchText: (text: string) => void }> = ({
  getSearchText,
}) => {
 
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: "#075ba6",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        style={{ fontFamily: "noto-regular",  width:'90%' }}
        placeholder="Search..."
        onChangeText={(t)=>{getSearchText(t)}}
      />
      <FontAwesome name="search" size={24} color="#075ba6" />
    </View>
  );
};
export default SearchBar;
