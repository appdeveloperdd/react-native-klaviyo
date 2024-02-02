package com.klaviyo

import android.app.Application
import android.util.Log
import com.facebook.react.bridge.*
import com.google.firebase.messaging.RemoteMessage
import com.klaviyo.analytics.Klaviyo
import com.klaviyo.analytics.model.Event
import com.klaviyo.analytics.model.EventKey
import com.klaviyo.analytics.model.EventType
import com.klaviyo.pushFcm.KlaviyoNotification
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.io.Serializable

class KlaviyoModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun initializeKlaviyo(publicKey: String) {
    Log.d("initializeKlaviyo", "initializeKlaviyo: $publicKey")
    val application = reactApplicationContext.applicationContext as Application
    Klaviyo.initialize(publicKey, application)
    application.registerActivityLifecycleCallbacks(Klaviyo.lifecycleCallbacks)
  }

  @ReactMethod
  fun setProfile(email: String) {
    Klaviyo.setEmail(email)
  }

  @ReactMethod
  fun resetProfile() {
    Klaviyo.resetProfile()
  }

  @ReactMethod
  fun createEvent(eventName: String, properties: ReadableMap) {
    val event = Event(EventType.CUSTOM(eventName))
    val iterator = properties.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (properties.getType(key)) {
        ReadableType.String -> {
          val stringValue = properties.getString(key)
          event.setProperty(EventKey.CUSTOM(key), stringValue ?: "")
        }
        ReadableType.Array -> {
          val array = properties.getArray(key)
          array?.let {
            val jsonArray = convertArrayToJsonArray(it)
            val serializableArray = convertJsonArrayToArray(jsonArray)
            event.setProperty(EventKey.CUSTOM(key), serializableArray)
          }
        }
        ReadableType.Number -> {
          val numberValue = properties.getDouble(key)
          event.setProperty(EventKey.CUSTOM(key), numberValue as Serializable)
        }
        ReadableType.Boolean -> {
          val booleanValue = properties.getBoolean(key)
          event.setProperty(EventKey.CUSTOM(key), booleanValue)
        }
        ReadableType.Map -> {
          val map = properties.getMap(key)
          map?.let { event.setProperty(EventKey.CUSTOM(key), convertMapToJsonString(it)) }
        }
        ReadableType.Null -> event.setProperty(EventKey.CUSTOM(key), null as Serializable)
      }
    }
    Klaviyo.createEvent(event)
  }

  private fun jsonObjectToMap(jsonObject: JSONObject): Map<String, Any> {
    val map = mutableMapOf<String, Any>()
    val keys = jsonObject.keys()
    while (keys.hasNext()) {
      val key = keys.next()
      val value = jsonObject.get(key)
      map[key] = when (value) {
        is JSONObject -> jsonObjectToMap(value)
        is JSONArray -> convertJsonArrayToArray(value).toList()
        else -> value
      }
    }
    return map
  }

  private fun convertJsonArrayToArray(jsonArray: JSONArray): Array<Serializable> {
    return Array(jsonArray.length()) { i ->
      when (val element = jsonArray.get(i)) {
        is JSONObject -> jsonObjectToMap(element) as Serializable
        is JSONArray -> convertJsonArrayToArray(element)
        else -> element as Serializable
      }
    }
  }

  private fun convertArrayToJsonArray(readableArray: ReadableArray): JSONArray {
    val jsonArray = JSONArray()
    for (i in 0 until readableArray.size()) {
      when (readableArray.getType(i)) {
        ReadableType.Null -> jsonArray.put(JSONObject.NULL)
        ReadableType.Boolean -> jsonArray.put(readableArray.getBoolean(i))
        ReadableType.Number -> jsonArray.put(readableArray.getDouble(i))
        ReadableType.String -> jsonArray.put(readableArray.getString(i))
        ReadableType.Map -> readableArray.getMap(i)?.let {
          jsonArray.put(JSONObject(convertMapToJsonString(it)))
        }
        ReadableType.Array -> readableArray.getArray(i)?.let {
          jsonArray.put(convertArrayToJsonArray(it))
        }
      }
    }
    return jsonArray
  }

  private fun convertMapToJsonString(readableMap: ReadableMap): String {
    val jsonObject = JSONObject()
    val iterator = readableMap.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      try {
        when (readableMap.getType(key)) {
          ReadableType.Null -> jsonObject.put(key, JSONObject.NULL)
          ReadableType.Boolean -> jsonObject.put(key, readableMap.getBoolean(key))
          ReadableType.Number -> jsonObject.put(key, readableMap.getDouble(key))
          ReadableType.String -> jsonObject.put(key, readableMap.getString(key))
          ReadableType.Map -> readableMap.getMap(key)?.let {
            jsonObject.put(key, convertMapToJsonString(it))
          }
          ReadableType.Array -> readableMap.getArray(key)?.let {
            jsonObject.put(key, convertArrayToJsonArray(it))
          }
        }
      } catch (e: JSONException) {
        Log.e("TAG", "Could not convert map to JSON", e)
      }
    }
    return jsonObject.toString()
  }

  @ReactMethod
  fun setPushToken(pushToken: String) {
    Klaviyo.setPushToken(pushToken)
  }

  @ReactMethod
  fun displayNotification(message: RemoteMessage) {
    KlaviyoNotification(message).displayNotification(reactApplicationContext)
  }

  companion object {
    const val NAME = "Klaviyo"
  }
}
