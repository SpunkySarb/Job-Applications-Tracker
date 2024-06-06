/**author:Sarbjeet Singh, contact:https://www.sarbzone.com*/

import { useEffect, useState } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
  } from 'react-native-reanimated';

export type StatusType ="not-applied"|"applied"|"rejected"|"interview"



/**
 * 
 * @param status: status of job (applied not etc..), animate: if we want to animate it 
 * @returns Status indicator in Colorful way
 */
const StatusIndicator:React.FC<{status:StatusType, animate?:boolean}> = ({status, animate=false})=>{

    const [color, setColor] = useState('yellow');

    useEffect(()=>{

        if(status==='applied'){
            setColor('#075ba6');
        }else if(status==='rejected'){
            setColor('red');
        }else if(status==='not-applied'){
            setColor('yellow');
        }else if(status==='interview'){
            setColor('green');
        }
        

    },[status]);

    const animation = useSharedValue(0.5);

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // -1 for infinite repetitions
      true // reverse on each iteration
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animation.value }],
    };
  });

return(<Animated.View style={[{backgroundColor:color, width:15, height:15, borderWidth:2,  borderColor:(status==="applied"||status==="rejected"||status==="interview")?"white":'#075ba6', borderRadius:15}, animate||status==="interview"||status==="not-applied"?animatedStyle:{}]}>

</Animated.View>);


}
export default StatusIndicator;
