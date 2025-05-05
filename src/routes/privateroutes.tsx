import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack"
import Home from "../screens/Home"


type CreateRoutesProps={
  Login:undefined,
  Home:undefined
}

const {Navigator, Screen}= createNativeStackNavigator<CreateRoutesProps>()

export type CreateRoutes=NativeStackNavigationProp<CreateRoutesProps>;

const PrivateRoutes = () => {
  return ( 

      <Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Screen name="Home" component={Home} />
      </Navigator>

   );
}
 
export default PrivateRoutes;