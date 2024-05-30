import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import AddJobs from './Screens/AddJobs';
import JobList from './Screens/JobList';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { jobList } from './Model/ApplicationList';
import notificationData from './Model/Notifications';

SplashScreen.preventAutoHideAsync();
/**
 * Initializing and preparing the data before rendering
 */
jobList.loadData();
notificationData.loadData();

export default function App() {



  const {width, height} = Dimensions.get('screen');
  const [fontsLoaded, fontError] = useFonts({
    'noto': require('./assets/Fonts/noto.ttf'),
    'noto-bold':require('./assets/Fonts/noto-bold.ttf'),
    'noto-regular':require('./assets/Fonts/noto-regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


const Tab = createBottomTabNavigator();
  return (
    
      
      <View onLayout={onLayoutRootView}>
      <NavigationContainer>


      <SafeAreaView style={{width,height}}>
      <StatusBar style="dark"  />

<Tab.Navigator  screenOptions={({route})=>({
  tabBarIcon:({focused, color, size})=>{
    let iconName:string="home";
    
    switch (route.name) {
      case "home":
        iconName='home';
        
        break;

        case "addJobs":
          iconName = "plus-circle";
        
        break;

        case "jobList":
          iconName='list-ul';
        break;
    
      default:
        iconName="home";
        break;
    }


    return <FontAwesome name={iconName as any} size={route.name==="addJobs"?40:24} color={focused?"#075ba6":"black"} />
  }
})} >




  <Tab.Screen name='home' options={{title:"HOME", headerShown:false, tabBarActiveTintColor:"#075ba6", tabBarShowLabel:false,}} component={Home} />
  <Tab.Screen name='addJobs' options={{title:"ADD JOB", headerShown:false, tabBarActiveTintColor:"#075ba6", tabBarShowLabel:false}} component={AddJobs} />
  <Tab.Screen name='jobList' options={{title:"JOB LIST",headerShown:false, tabBarActiveTintColor:"#075ba6", tabBarShowLabel:false}} component={JobList} />
</Tab.Navigator>




    </SafeAreaView>
    
    
    </NavigationContainer>
   
    </View> 
    
    );
}


