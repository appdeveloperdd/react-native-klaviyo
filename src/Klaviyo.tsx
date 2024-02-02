import { NativeModules } from 'react-native';

interface KlaviyoModule {
  initializeKlaviyo(publicKey: string): void;
  setProfile(email: string): void;
  resetProfile(): void;
  createEvent(eventName: string, properties: object): void;
  setPushToken(pushToken: string): void;
}

const KlaviyoBridge: KlaviyoModule = NativeModules.Klaviyo;

class Klaviyo {
  static initializeKlaviyo(publicKey: string): void {
    KlaviyoBridge.initializeKlaviyo(publicKey);
  }

  static setProfile(email: string): void {
    KlaviyoBridge.setProfile(email);
  }

  static resetProfile(): void {
    KlaviyoBridge.resetProfile();
  }

  static createEvent(eventName: string, properties: object): void {
    KlaviyoBridge.createEvent(eventName, properties);
  }

  static setPushToken(pushToken: string): void {
    KlaviyoBridge.setPushToken(pushToken);
  }
}

export default Klaviyo;
