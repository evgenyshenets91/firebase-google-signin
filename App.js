import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1095826669424-7am76k7v1sm6nu7kvvsl22uing484tkr.apps.googleusercontent.com',
    });
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onGoogleButtonPress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      Alert.alert('', JSON.stringify(e));
    }
  };

  const signOut = async () => {
    await GoogleSignin.signOut();
    console.log('sign out');
  };

  const userInfo = async () => {
    const user = await GoogleSignin.getCurrentUser();
    console.log('userInfo', user);
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <View style={{justifyContent: 'center', flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <View style={{height: 50}} />
        <Button title="Google Sign Out" onPress={signOut} />
        <View style={{height: 50}} />
        <Button title="User Info" onPress={userInfo} />
      </View>
    </SafeAreaView>
  );
};

export default App;
