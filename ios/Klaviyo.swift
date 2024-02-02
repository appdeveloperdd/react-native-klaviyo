import KlaviyoSwift

@objc(Klaviyo)
class Klaviyo: NSObject {
  
    @objc
     func initializeKlaviyo(_ publicKey : String) {
       print("initializeKlaviyo: ",publicKey)
       KlaviyoSDK().initialize(with: publicKey)
     }
     
     @objc
     func setProfile(_ email : String) {
       print("setProfile: ",email)
       KlaviyoSDK().set(email: email)
     }
     
    @objc
    func resetProfile() {
      print("resetProfile: ")
        KlaviyoSDK().resetProfile()
    }
    
     @objc
     func createEvent(_ eventName: String,_ properties : NSDictionary) {
       print("createEvent")
         
         let propertiesDictionary = properties as? [String: Any]

         let event = Event(name:Event.EventName.CustomEvent(eventName),properties:propertiesDictionary)
         guard let event = try? Event(name: Event.EventName.CustomEvent(eventName), properties: propertiesDictionary) else {
           print("Failed to create Event object.")
           return
         }
         KlaviyoSDK().create(event: event)
     }
     
     @objc
     func setPushToken(_ pushToken: String) {
       print("setPushToken")
       // Convert the hexadecimal string to Data
       if let deviceTokenData = dataFromHexString(pushToken) {
         KlaviyoSDK().set(pushToken: deviceTokenData)
         print("push token sent to klaviyo")
       } else {
         print("Invalid device token string format.")
       }

     }
     
     // Function to convert a hexadecimal string to Data
     func dataFromHexString(_ string: String) -> Data? {
         var hex = string
         var data = Data()

         // Remove any spaces or non-hex characters
         hex = hex.replacingOccurrences(of: " ", with: "")
         hex = hex.replacingOccurrences(of: "0x", with: "")

         // Ensure the string has an even number of characters
         guard hex.count % 2 == 0 else { return nil }

         // Iterate over pairs of characters, convert to bytes, and append to Data
         var index = hex.startIndex
         while index < hex.endIndex {
             let byteString = String(hex[index ..< hex.index(index, offsetBy: 2)])
             if let byte = UInt8(byteString, radix: 16) {
                 data.append(byte)
             } else {
                 return nil
             }
             index = hex.index(index, offsetBy: 2)
         }

         return data
     }
   }
