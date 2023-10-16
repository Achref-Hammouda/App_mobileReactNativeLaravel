import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogIn from './app/LogIn';
import HistoSold from './app/HistoSold';
import CongeForm from './app/CongeForm';
import Inscrit from './app/Inscrit';
import Settings from './app/Setting';
import { Image } from 'react-native';
import Update from './components/itemSetting';
import Admin from './app/admin'
import ForgetPassword from './app/forgetpassword';
import VerifieToken from './app/VerifieToken';
import ModifierEmailPassword from './app/modifierEmailPassword';
import SuperHerarchi from './app/SuperHerarchi';
import UpdateEmail from './app/Updatemail';
import UpdatePassword from './app/updatePassword';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
import SplashScreen from './app/Splash';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
async function registerForPushNotificationsAsync() {

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  let token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra?.eas?.projectId, })).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

const Stack = createStackNavigator();
const Stacksetting = createStackNavigator();
function SettingStack() {
  return (<Stacksetting.Navigator>
    <Stacksetting.Screen name="Parametre" component={Settings} options={{
      headerShown: false
    }} />
    <Stacksetting.Screen name="Parame" component={Update} />
    <Stacksetting.Screen name="Modifier email" component={UpdateEmail} />
    <Stacksetting.Screen name="Modifier mot de pass" component={UpdatePassword} />
  </Stacksetting.Navigator>
  )
}
function CongeStack() {
  return (<Stacksetting.Navigator>
    <Stacksetting.Screen name="HistoSold" component={HistoSold} options={{
      headerShown: false
    }} />
    <Stacksetting.Screen name="demande" component={CongeForm} />
  </Stacksetting.Navigator>
  )
}
const Tab = createBottomTabNavigator();
function EmployeTab() {
  return (<Tab.Navigator>
    <Tab.Screen
      name="Historique Solde"
      component={CongeStack}
      options={{
        tabBarLabel: 'Historique Solde',
        tabBarIcon: ({ color, size }) => (
          <Icon name="history" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Parametres"
      component={SettingStack}
      options={{
        tabBarLabel: 'Paramètres',
        tabBarIcon: ({ color, size }) => (
          <Icon name="gear" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
  )
}
function RhTab() {

}
function SuperHerarchiTab() {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="Historique Solde"
        component={CongeStack}
        options={{
          tabBarLabel: 'Historique Solde',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen Screen name="Superviseur" component={SuperHerarchi}
        options={{
          tabBarLabel: 'Superviseur',
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={color} size={size} /> // Exemple d'icône d'utilisateurs
          ),
        }}
      />
      <Tab.Screen
        name="Parametres"
        component={SettingStack}
        options={{
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AdminTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Historique Solde"
        component={CongeStack}
        options={{
          tabBarLabel: 'Historique Solde',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />

          ),
        }}
      />
      <Tab.Screen Screen name="admin" component={Admin}
        options={{
          tabBarLabel: 'Admin',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-secret" color={color} size={size} /> // Exemple d'icône de paramètres
          ),
        }}
      />
      <Tab.Screen Screen name="Superviseur" component={SuperHerarchi}
        options={{
          tabBarLabel: 'Superviseur',
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={color} size={size} /> // Exemple d'icône d'utilisateurs
          ),
        }}
      />
      <Tab.Screen
        name="Parametres"
        component={SettingStack}
        options={{
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    registerForPushNotificationsAsync().then((pushToken) => {
      setToken(pushToken); // Save the push token in the state
    });;
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds (3 seconds) delay in this example
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="page d'acceuil"
          initialParams={{ token }}
          component={LogIn} options={{

            headerRight: () => <Image
              source={require('./assets/logo.png')}
              style={{ width: 100, height: 30, marginRight: 10 }}
            />
          }} />
        <Stack.Screen name="EmployeTab" component={EmployeTab} options={{
          headerShown: false
        }} />
        <Stack.Screen name="SuperherarchiTab" component={SuperHerarchiTab} options={{
          headerShown: false
        }} />
        <Stack.Screen name="AdminTab" component={AdminTab} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Inscription" component={Inscrit} />
        <Stack.Screen name="ResetPassword" component={ForgetPassword} />
        <Stack.Screen name="VerifieToken" component={VerifieToken} />
        <Stack.Screen name="ModifierEmailPassword" component={ModifierEmailPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;