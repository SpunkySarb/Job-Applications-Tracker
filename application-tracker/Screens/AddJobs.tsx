/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import NotesModal from "../Components/AddJobs/NotesModal";
import Suggestions from "../Components/AddJobs/Suggestions";
import Application from "../Model/Application";
import { jobList } from "../Model/ApplicationList";
import { useIsFocused } from "@react-navigation/native";

const AddJobs: React.FC = () => {
  const { height, width } = Dimensions.get("window");
  const [jobLink, setJobLink] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");

  const [saveStatus, setSavingStatus] = useState<
    "Save Job" | "Saving 🔄" | "Job Saved ✅"
  >("Save Job");

  const [jobTitleSuggestions, setJobTitleSuggestions] = useState(jobList.getJobTitles());
  const [companyNameSuggestions, setCompanyNameSuggestions] = useState(jobList.getCompanies());

  const isFocused = useIsFocused();

  const updateSuggestions = ()=>{
    setJobTitleSuggestions(jobList.getJobTitles());
    setCompanyNameSuggestions(jobList.getCompanies());

  }
  useEffect(()=>{

    updateSuggestions();
   
  },[isFocused]);


  const [showJobTitleSuggestions, setJobTitleSuggestionVisibility] =
    useState(false);
  const [showCompanyNameSuggestions, setCompanyNameSuggestionVisibility] =
    useState(false);

  const [showNoteEditor, setNoteEditorVisibility] = useState(false);

  const filteredJobTitleSuggestions = jobTitleSuggestions.filter((i) =>
    i.trim().toLowerCase().includes(jobTitle.toLowerCase().trim())
  );
  const filteredCompanyNameSuggestions = companyNameSuggestions.filter((i) =>
    i.trim().toLowerCase().includes(companyName.toLowerCase().trim())
  );

  const extractURL = (text:string)=>{
    return text.replaceAll("\n"," ").split(" ").filter(i=>i.toLowerCase().startsWith("http"))[0];//stores only the link
  }

  const pasteFromClipBoard = async () => {
    const text = await Clipboard.getStringAsync();
    
    setJobLink(extractURL(text));
  };

  const clearInputs = () => {
    setJobLink("");
    setJobTitle("");
    setCompanyName("");
    setNotes("");
    setCompanyNameSuggestionVisibility(false);
    setJobTitleSuggestionVisibility(false);
  };

  const saveJob = () => {
    //Job link can be undefined if no link is provided which includes http
    if(jobLink===undefined){
      Alert.alert(
        "Invalid Job Link",
        "There is no Http link in the job.."
      );
      return;
    }


    if (
      jobLink.trim() !== "" &&
      jobTitle.trim() !== "" &&
      companyName.trim() !== ""
    ) {
      setSavingStatus("Saving 🔄");
      const job = new Application(jobLink, jobTitle, companyName, notes);

      jobList.loadData().then(() => {
        jobList.insert(job);
        clearInputs();
        setSavingStatus("Job Saved ✅");
        setTimeout(() => {
          setSavingStatus("Save Job");
        }, 1000);
      });
      Keyboard.dismiss();
      updateSuggestions();//fetch new suggestions
    } else {
      Alert.alert(
        "Invalid Input",
        "Please fill the required fields and then save."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ backgroundColor: "white", width, height }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 100,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: "500",
              color: "#075ba6",
              fontFamily: "noto-bold",
            }}
          >
            Add Job
          </Text>
        </View>

        {/**JOB LINK */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <TextInput
            onFocus={pasteFromClipBoard}
            onChangeText={(t) => {
              setJobLink(extractURL(t));
            }}
            value={jobLink}
            placeholderTextColor={"#075ba6"}
            style={{
              fontFamily: "noto-bold",
              width: "70%",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              padding: 12,
              borderWidth: 2,
              color: "#075ba6",
              borderColor: "#075ba6",
            }}
            placeholder="Click to Paste Job Link Here.."
          />
          <TouchableOpacity
            onPress={pasteFromClipBoard}
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              width: "15%",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderColor: "#075ba6",
            }}
          >
            <FontAwesome5 name="paste" size={24} color="#075ba6" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/**JOB TITLE */}
          <View
            style={{
              flexDirection: "row",
              zIndex: 1,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              marginTop: 30,
              alignSelf: "center",
            }}
          >
            <TextInput
              value={jobTitle}
              onChangeText={(t) => {
                setJobTitle(t);
                setJobTitleSuggestionVisibility(true);
              }}
              placeholderTextColor={"#075ba6"}
              style={{
                fontFamily: "noto-bold",
                width: "70%",
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                padding: 12,
                borderWidth: 2,
                color: "#075ba6",
                borderColor: "#075ba6",
              }}
              placeholder="Job Title"
            />
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                width: "15%",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderColor: "#075ba6",
              }}
            >
              <FontAwesome5 name="chevron-down" size={24} color="#075ba6" />
            </View>

            {showJobTitleSuggestions && jobTitle.length>0 &&
              filteredJobTitleSuggestions.length > 0 && (
                <Suggestions
                  close={() => {
                    setJobTitleSuggestionVisibility(false);
                  }}
                  getSuggestion={(t) => {
                    setJobTitle(t);
                  }}
                  suggestionList={filteredJobTitleSuggestions}
                />
              )}
          </View>

          {/**COMPANY NAME */}
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              zIndex: 0,
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            <TextInput
              value={companyName}
              onChangeText={(t) => {
                setCompanyName(t);
                setCompanyNameSuggestionVisibility(true);
              }}
              placeholderTextColor={"#075ba6"}
              style={{
                fontFamily: "noto-bold",
                width: "70%",
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                padding: 12,
                borderWidth: 2,
                color: "#075ba6",
                borderColor: "#075ba6",
              }}
              placeholder="Company Name"
            />
            <TouchableOpacity
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                width: "15%",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderColor: "#075ba6",
              }}
            >
              <FontAwesome name="building-o" size={24} color="#075ba6" />
            </TouchableOpacity>

            {showCompanyNameSuggestions && companyName.length>0 &&
              filteredCompanyNameSuggestions.length > 0 && (
                <Suggestions
                  close={() => {
                    setCompanyNameSuggestionVisibility(false);
                  }}
                  getSuggestion={(t) => {
                    setCompanyName(t);
                  }}
                  suggestionList={filteredCompanyNameSuggestions}
                />
              )}
          </View>

          {/**Add Notes Button */}

          <TouchableOpacity
            onPress={() => {
              setNoteEditorVisibility(true);
            }}
            style={{
              paddingTop: 15,
              zIndex: -1,
              borderWidth: 2,
              paddingBottom: 15,
              marginTop: 10,
              width: "70%",
              justifyContent: "center",
              flexDirection: "row",
              borderRadius: 15,
              borderColor: "#075ba6",
            }}
          >
            <Entypo name="pencil" size={24} color="#075ba6" />
            <Text
              style={{
                fontFamily: "noto-bold",
                fontSize: 15,
                color: "#075ba6",
              }}
            >
              {" "}
              Add Notes
            </Text>
          </TouchableOpacity>

          {/**Save Button */}

          <TouchableOpacity
            onPress={saveJob}
            style={{
              paddingTop: 15,
              zIndex: -1,
              paddingBottom: 15,
              marginTop: 10,
              width: "70%",
              justifyContent: "center",
              flexDirection: "row",
              borderRadius: 15,
              backgroundColor: "#075ba6",
            }}
          >
            <Text
              style={{ fontFamily: "noto-bold", fontSize: 15, color: "white" }}
            >
              {saveStatus}
            </Text>
          </TouchableOpacity>
        </View>

        {showNoteEditor && (
          <NotesModal
            role={jobTitle}
            company={companyName}
            value={notes}
            getNotes={(notes) => {
              setNotes(notes);
            }}
            onClose={() => {
              setNoteEditorVisibility(false);
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default AddJobs;
