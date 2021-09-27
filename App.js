import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    GoogleSignin.configure({
      // TODO: that webClientId just for android. for using it in iOS need to re-setup native part
      webClientId:
        '257426262564-0e4a62d0h3ilpueg37jve43unmj5frf9.apps.googleusercontent.com',
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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
    </SafeAreaView>
  );
};

export default App;
