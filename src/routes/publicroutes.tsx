import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack"
import Login from "../screens/Login";
import Register from "../screens/Register";

type CreateRoutesProps={
  Login:undefined,
  Home:undefined,
  Register:undefined
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
        <Screen name="Register" component={Register} />
      </Navigator>
   );
}
 
export default PublicRoutes;