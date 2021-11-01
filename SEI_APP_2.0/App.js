/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Home from './src/page/Home';
import Sign from './src/page/Sign';
import tailwind from 'tailwind-rn';
import React from 'react';
import {PROPERTY_TYPES} from '@babel/types';
import ProductInfo from './src/page/ProductInfo';
import ProductLibrary from './src/page/ProductLibrary';
import ProductLibraryInfo from './src/page/ProductLibaryInfo';
import ProductLibraryPdf from './src/page/ProductLibraryPdf';
import FastImage from 'react-native-fast-image';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, SafeAreaView, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Processing from './src/page/notif/Processing';
import Done from './src/page/notif/Done';
import QR from './src/page/Issue/QR';
import SerailManual from './src/page/Issue/SerailManual';
import MainContact from './src/page/Contact/MainContact';
import Instrument from './src/page/Issue/Instrument';
import Form from './src/page/Issue/Form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Task from './src/page/notif/Task';
import MachineMain from './src/page/Machine/machinemain';
import MachineEdit from './src/page/Machine/machineedit';
import MachineAdd from './src/page/Machine/machineadd';
import UserMain from './src/page/User/usermain';
import UserEdit from './src/page/User/useredit';
import UserAdd from './src/page/User/useradd';
import EditProfile from './src/page/EditProfile';
import UpdatePassword from './src/page/UpdatePassword/UpdatePassword';
// import UpdatePassword from './src/page/UpdatePassword/UpdatePassword';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('loggedOut');
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  const HomeStack = createNativeStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="หน้าหลัก"
          options={{
            headerShown: false,
          }}>
          {props => <Home {...props} updateAuthState={updateAuthState} />}
        </HomeStack.Screen>
        <HomeStack.Screen
          name="ProductInfo"
          component={ProductInfo}
          // options={{
          //   headerTitle: 'สินค้า',
          //   headerTintColor: '#fff',
          //   headerStyle: { backgroundColor: '#222655' },
          // }}
        />


        <HomeStack.Screen
          name="ProductLibary"
          options={{
            headerTitle: 'Libary',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={ProductLibrary}
        />
        <HomeStack.Screen
          name="แจ้งซ่อม"
          options={{
            headerTitle: 'แจ้งซ่อม',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={TabIssueScreen}
        />

        <HomeStack.Screen
          name="EditProfile"
          options={{
            headerTitle: 'Profile',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}>
          {props => (
            <EditProfile {...props} updateAuthState={updateAuthState} />
          )}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    );
  }

  const ContactStack = createNativeStackNavigator();
  function ContactStackScreen() {
    return (
      <ContactStack.Navigator>
        <ContactStack.Screen
          name="ติดต่อเรา"
          options={{
            headerTitle: 'ติดต่อเรา',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}>
          {props => <Form {...props} mode={'contact'} />}
        </ContactStack.Screen>
      </ContactStack.Navigator>
    );
  }

  const LibraryStack = createNativeStackNavigator();
  function LibraryStackScreen() {
    return (
      <LibraryStack.Navigator>
        <LibraryStack.Screen
          name="ห้องสมุด"
          options={{
            headerTitle: 'Library',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={ProductLibrary}
        />
        <LibraryStack.Screen
          name="ProductLibaryInfo"
          options={{
            headerTitle: 'Library',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={ProductLibraryInfo}
        />
        <LibraryStack.Screen
          name="ProductLibaryPdf"
          component={ProductLibraryPdf}
        />
      </LibraryStack.Navigator>
    );
  }

  const MachineStack = createNativeStackNavigator();
  function MachineStackScreen() {
    return (
      <MachineStack.Navigator>
        <MachineStack.Screen
          name="machinemain"
          options={{
            headerTitle: 'อุปกรณ์',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={MachineMain}
        />
        <MachineStack.Screen
          name="machineedit"
          options={{
            headerTitle: 'อุปกรณ์',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={MachineEdit}
        />
        <MachineStack.Screen
          options={{
            headerTitle: 'เพิ่มอุปกรณ์',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          name="machineadd"
          component={MachineAdd}
        />
        <MachineStack.Screen
          options={{
            headerTitle: 'ค้นหาอุปกรณ์',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          name="machinescan"
          component={InputScreen}
        />
      </MachineStack.Navigator>
    );
  }

  const UserStack = createNativeStackNavigator();
  function UserStackScreen() {
    return (
      <UserStack.Navigator>
        <UserStack.Screen
          name="usermain"
          options={{
            headerTitle: 'ผู้ใช้งาน',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={UserMain}
        />
        <UserStack.Screen
          name="useredit"
          options={{
            headerTitle: 'อุปกรณ์',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          component={UserEdit}
        />
        <UserStack.Screen
          options={{
            headerTitle: 'สร้างบัญชี',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#222655'},
          }}
          name="useradd"
          component={UserAdd}
        />
      </UserStack.Navigator>
    );
  }

  const TabNotif = createMaterialTopTabNavigator();

  function NotifStackScreen() {
    return (
      <View style={{backgroundColor: '#222655', flex: 1}}>
        <SafeAreaView style={tailwind('flex-1')}>
          <IssueStack.Navigator>
            <IssueStack.Screen
              options={{
                headerTitle: 'แจ้งเตือน',
                headerTintColor: '#fff',
                headerStyle: {backgroundColor: '#222655'},
              }}
              name="แจ้งเตือน"
              component={NotifTab}
            />
            <IssueStack.Screen
              options={{
                headerTitle: 'Task',
                headerTintColor: '#fff',
                headerStyle: {backgroundColor: '#222655'},
              }}
              name="Task"
              component={Task}
            />
          </IssueStack.Navigator>
        </SafeAreaView>
      </View>
    );
  }

  const NotifTab = () => {
    return (
      <TabNotif.Navigator>
        <TabNotif.Screen name="กำลังดำเนินการ" component={Processing} />
        <TabNotif.Screen name="งานที่เสร็จแล้ว" component={Done} />
      </TabNotif.Navigator>
    );
  };

  const InputScreen = () => {
    return (
      <TabIssue.Navigator>
        <TabIssue.Screen name="สแกน QR Code" component={QR} />
        <TabIssue.Screen name="Serial Number" component={SerailManual} />
      </TabIssue.Navigator>
    );
  };

  const IssueStack = createNativeStackNavigator();
  const TabIssue = createMaterialTopTabNavigator();
  function TabIssueScreen() {
    return (
      <View style={tailwind('flex-1')}>
        <IssueStack.Navigator>
          <IssueStack.Screen
            options={{
              headerTitle: 'ค้นหาอุปกรณ์',
              headerTintColor: '#fff',
              headerStyle: {backgroundColor: '#222655'},
            }}
            name="ค้นหาอุปกรณ์"
            component={InputScreen}
          />
          <IssueStack.Screen
            options={{
              headerTitle: 'Instrument',
              headerTintColor: '#fff',
              headerStyle: {backgroundColor: '#222655'},
            }}
            name="Instrument"
            component={Instrument}
          />
          <IssueStack.Screen
            options={{
              headerTitle: 'แจ้งปัญหา',
              headerTintColor: '#fff',
              headerStyle: {backgroundColor: '#222655'},
            }}
            name="แจ้งปัญหา"
            component={Form}
          />
        </IssueStack.Navigator>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer Theme={Theme}>
      {isUserLoggedIn === 'loggedIn' && (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/homebar.png')}
                  />
                );
              } else if (route.name === 'Library') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/libralybar.png')}
                  />
                );
              } else if (route.name === 'แจ้งปัญหา') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/helpbar.png')}
                  />
                );
              } else if (route.name === 'ติดต่อ') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/contactbar.png')}
                  />
                );
              } else if (route.name === 'แจ้งเตือน') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/bellbar.png')}
                  />
                );
              }

              // You can return any component that you like here!
              return (
                <Image
                  style={tailwind('h-5 w-5')}
                  source={require('./src/image/logo.png')}
                />
              );
            },
            tabBarActiveTintColor: '#222655',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Library" component={LibraryStackScreen} />
          <Tab.Screen name="แจ้งปัญหา" component={TabIssueScreen} />
          <Tab.Screen name="ติดต่อ" component={ContactStackScreen} />
          <Tab.Screen name="แจ้งเตือน" component={NotifStackScreen} />
        </Tab.Navigator>
      )}
      {isUserLoggedIn === 'loggedInAdmin' && (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/homebar.png')}
                  />
                );
              } else if (route.name === 'Library') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/libralybar.png')}
                  />
                );
              } else if (route.name === 'ผู้ใช้งาน') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/usericon.png')}
                  />
                );
              } else if (route.name === 'อุปกรณ์') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/toolsicon.png')}
                  />
                );
              } else if (route.name === 'แจ้งเตือน') {
                return (
                  <Image
                    style={tailwind('h-5 w-5')}
                    source={require('./src/image/bellbar.png')}
                  />
                );
              }

              // You can return any component that you like here!
              return (
                <Image
                  style={tailwind('h-5 w-5')}
                  source={require('./src/image/logo.png')}
                />
              );
            },
            tabBarActiveTintColor: '#222655',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Library" component={LibraryStackScreen} />
          <Tab.Screen name="ผู้ใช้งาน" component={UserStackScreen} />
          <Tab.Screen name="อุปกรณ์" component={MachineStackScreen} />
          <Tab.Screen name="แจ้งเตือน" component={NotifStackScreen} />
        </Tab.Navigator>
      )}

      {isUserLoggedIn === 'loggedOut' && (
        <Stack.Navigator>
          <Stack.Screen
            name="Sign"
            options={{
              headerShown: false,
            }}>
            {props => <Sign {...props} updateAuthState={updateAuthState} />}
          </Stack.Screen>
           <Stack.Screen
            name="ResetPassword"
            options={{
              headerTitle: 'ResetPassword',
              headerTintColor: '#fff',
              headerStyle: {backgroundColor: '#222655'},
            }}>
            {props => (
              <UpdatePassword {...props} updateAuthState={updateAuthState} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255,0,0)',
    backgroundColor: '#222655',
  },
};

export default App;
