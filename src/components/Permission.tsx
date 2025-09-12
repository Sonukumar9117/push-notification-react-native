import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
export default function Permission() {
  const askForPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       getToken();
      Alert.alert('permission Granted');
    } else {
      Alert.alert('Permission Denied By You');
    }
  };
  useEffect(() => {
    askForPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Message come',JSON.stringify(remoteMessage?.notification?.body));
    });
    return unsubscribe;
  });
  const getToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('Token is:', token);
    } else {
      console.log('No token received');
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

  return <View></View>;
}
