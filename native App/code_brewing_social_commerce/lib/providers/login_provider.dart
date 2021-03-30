import 'package:code_brewing_social_commerce/services/login_api_service.dart';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:code_brewing_social_commerce/utils/validations.dart';


class LoginProvider extends ChangeNotifier with Validation {

String emailphoneno;
String password;
bool isemailphonenoValid;
bool ispwdValid;


LoginProvider(){
  isemailphonenoValid = false;
  ispwdValid = false;
}





set setuserEmailPhone(String input){
  emailphoneno = trimInput(input);
  if(validateEmail(emailphoneno)){
    isemailphonenoValid = true;
    notifyListeners();
  } else{
    isemailphonenoValid = false;
    notifyListeners();
  }
}

set setPassword(String input) {
  password = trimInput(input);
  if(password.length < 4){
    ispwdValid = false;
     notifyListeners();
  } else {
     notifyListeners();
    ispwdValid = true;
  }
}


bool get getisEmailPhoneNoValid {
  return isemailphonenoValid;
}

bool get getisPasswordValid {
  return ispwdValid;
}


Future<void> initLogin(BuildContext context) async{
 
  if(isemailphonenoValid && ispwdValid){
    // request login api 
    try{
    await initLoginApiRequest(emailphoneno, password);
    Navigator.pushReplacementNamed(context, RoutePath.homeScreen);
    } on HttpUnauthorizedException {
      isemailphonenoValid = false;
      ispwdValid = false;
      notifyListeners();
    }
  }
}
}