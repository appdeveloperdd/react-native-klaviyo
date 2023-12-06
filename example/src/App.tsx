import * as React from 'react';

import { Button, SafeAreaView, ScrollView } from 'react-native';
import Klaviyo from 'react-native-dd-native-demo';

const App = () => {
  React.useEffect(() => {
    onPress();
  }, []);

  const onPress = () => {
    Klaviyo.initializeKlaviyo('SHmAn7');
  };
  const onPressSetProfile = () => {
    Klaviyo.setProfile('programmer90.dynamicdreamz@gmail.com');
  };
  const onPressResetProfile = () => {
    Klaviyo.resetProfile();
  };
  const onPressCreateEvent = () => {
    Klaviyo.createEvent('Add to Cart22', {
      Name: 'New japanese jacket22222',
      Qty: '1',
      TotalPrice: '9000.0',
      Price: '9000.0',
      Size: '38',
    });
  };

  const onPressSetPushToken = () => {
    Klaviyo.setPushToken('0123456789abcdef0123456789abcdef');
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Button
          title="Click to invoke your native module!"
          color="#841584"
          style={{marginVertical: 20}}
          onPress={onPress}
        /> */}
        <Button
          title="Set Profile"
          color="#841584"
          onPress={onPressSetProfile}
        />

        <Button
          title="Reset Profile"
          color="#841584"
          onPress={onPressResetProfile}
        />

        <Button
          title="Create Event"
          color="#841584"
          onPress={onPressCreateEvent}
        />

        <Button
          title="Set Push Token"
          color="#841584"
          onPress={onPressSetPushToken}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
