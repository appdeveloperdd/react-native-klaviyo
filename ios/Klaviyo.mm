#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Klaviyo, NSObject)


RCT_EXTERN_METHOD(initializeKlaviyo:(NSString *)publicKey)
RCT_EXTERN_METHOD(setProfile:(NSString *)email)
RCT_EXTERN_METHOD(createEvent:(NSString *)eventName :(NSDictionary *)properties)
RCT_EXTERN_METHOD(setPushToken:(NSString *)pushToken)
RCT_EXTERN_METHOD(resetProfile)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
