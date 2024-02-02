import * as React from 'react';

import { Button, SafeAreaView, ScrollView } from 'react-native';
import Klaviyo from 'react-native-klaviyo';

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
    Klaviyo.createEvent('App Checkout Started', {
      'currency': 'INR',
      'TotalPrice': '7080',
      'Item Count': '2',
      'ItemNames': [
        'Dapple Checked Shirt',
        'Wrinkle Free Everlast Twill Shirt',
      ],
      'Customer first name': 'Dilip',
      'Customer last name': 'Kaklotar',
      'CheckoutURL':
        'https://bombayshirts-india-prod.myshopify.com/53635940515/checkouts/d9ee495e3d70fc4076f0941a6f603da8?key=db8537e5977bb84ec704170f41a825c6',
      'Items': [
        {
          Id: '8161277837475',
          Price: '2490',
          Brand: 'Bombay Shirt Company',
          ProductType: 'Shirt',
          ProductUrl:
            'https://www.bombayshirts.com/products/bsc-dapple-checked-shirt',
          ProductImageURL:
            'https://cdn.shopify.com/s/files/1/0536/3594/0515/products/091ed36d-661e-994e-b4dc-5b6d5b5da7a2_Dapple_20Checked_20Shirt_20copy_203_250x.jpg?v=1703763524',
          Quantity: '1',
          VariantID: '43808483508387',
        },
        {
          Id: '8163383771299',
          Price: '4590',
          Brand: 'Bombay Shirt Company',
          ProductType: 'Shirt',
          ProductUrl:
            'https://www.bombayshirts.com/products/bsc-wrinkle-free-everlast-twill-shirt',
          ProductImageURL:
            'https://cdn.shopify.com/s/files/1/0536/3594/0515/products/40f7bd42-5887-f82e-7ffd-e2048b557f4f_Wrinkle_20Free_20Everlast_20Twill_20Shirt_20copy_204_bf94dcd9-a246-42af-8e3d-bc160f73ebb0_250x.jpg?v=1703758984',
          Quantity: '1',
          VariantID: '43813234639011',
        },
      ],
      'Source': 'Shopify Android App',
    });
  };

  const onPressSetPushToken = () => {
    Klaviyo.setPushToken(
      '740f4707 bebcf74f 9b7c25d4 8e335894 5f6aa01d a5ddb387 462c7eaf 61bb78ad'
    );
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
