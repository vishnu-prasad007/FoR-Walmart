import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';


class SecureStorage {
  FlutterSecureStorage flutterSecureStorage;
  
  SecureStorage(){
    flutterSecureStorage = new FlutterSecureStorage();
  }

  Future<void> writeValue(String key,String value) async {
    await flutterSecureStorage.write(key: key, value: value);
  }

  Future<String> readValue(String key) async{
    return await flutterSecureStorage.read(key: key);
  }

  Future<String> getAccessToken() async {
    return await flutterSecureStorage.read(key: SecureStorageKey.secureStoargeAccessTokenKey);
  }
}

class SharedPreferenceController {
  static Future<void> setLoggedIn() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    await sharedPreferences.setBool(SharedPreferenceKey.isLoggedInKey, true);
  }

  static Future<bool> getIsLoggedIn() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    return sharedPreferences.getBool(SharedPreferenceKey.isLoggedInKey);
  }

  static Future<void> setUserId(int userId) async {
    SharedPreferences.getInstance().then((sharedPreferences) => {
      sharedPreferences.setInt(SharedPreferenceKey.userIdKey, userId)
    });
  }

  static Future<int> getUserId() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    return sharedPreferences.getInt(SharedPreferenceKey.userIdKey);
  }
}