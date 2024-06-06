/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
/**
 * 
 * @param suggestionList: List of previously added Values to the storage as array of strings, 
 * getSuggestion: function to extract the selected suggestion in parent component
 * 
 * @returns List of suggestions when writing Job title or CompanyName
 */
const Suggestions: React.FC<{
  suggestionList: string[];
  getSuggestion: (s: string) => void;
  close: () => void;
}> = ({ suggestionList, getSuggestion, close }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 47,
        left: 30,
        zIndex: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        borderColor: "#075ba6",
        width: "70%",
      }}
    >
      <ScrollView style={{ height: 100 }}>
        {suggestionList.map((i, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                getSuggestion(i);
                close();
              }}
              style={{ backgroundColor: "#075ba6", margin: 2, padding: 5 }}
              key={index}
            >
              <Text style={{ fontFamily: "noto-bold", color: "white" }}>
                {i}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Suggestions;
