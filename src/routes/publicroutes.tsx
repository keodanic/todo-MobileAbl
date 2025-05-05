import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack"
import Login from "../screens/Login";

type CreateRoutesProps={
  Login:undefined,
  Home:undefined
}

const {Navigator, Screen}= createNativeStackNavigator<CreateRoutesProps>()

export type CreateRoutes=NativeStackNavigationProp<CreateRoutesProps>;

const PublicRoutes = () => {
  return ( 
      <Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Screen name="Login" component={Login} />
      </Navigator>
   );
}
 
export default PublicRoutes;