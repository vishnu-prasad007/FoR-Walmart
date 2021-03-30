import 'dart:io';
import 'package:code_brewing_social_commerce/models/login_model.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart' as http;
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'dart:convert';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';

Future<void> initLoginApiRequest(String emailPhoneNo,String password) async{
FirebaseMessaging firebaseMessaging = FirebaseMessaging.instance;
String fcmDeviceToken = await firebaseMessaging.getToken();
final response = await http.post(Uri.http(ApiEndpoint.apiBaseUrl,ApiEndpoint.auth+ApiEndpoint.login),headers: apiheaders,body: jsonEncode(<String,String>{
  'emailPhoneNo': emailPhoneNo,
  'password':password,
  'fcmDeviceToken':fcmDeviceToken
}));
  if(response.statusCode == HttpStatus.ok) {
    // login successful
    Map loginModelMap = jsonDecode(response.body);
    print(loginModelMap);
    var loginModel = LoginModel.fromJson(loginModelMap);
    SecureStorage secureStorage = SecureStorage();
    Future.wait([
    secureStorage.writeValue(SecureStorageKey.secureStoargeAccessTokenKey, loginModel.data.accessToken),
    SharedPreferenceController.setLoggedIn(),
    SharedPreferenceController.setUserId(loginModel.data.userId)
    ]);
  } else if(response.statusCode == HttpStatus.unauthorized){
    // invalid emailaddress/Phone no or password
    throw new HttpUnauthorizedException();
  } else {
    // Internal Server Error
    throw new HttpInternalServerException();
  }
}