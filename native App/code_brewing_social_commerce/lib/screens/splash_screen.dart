import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:flutter/material.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SharedPreferenceController.getIsLoggedIn().then((isLoggedIn) => {
      if(isLoggedIn??false)
        Navigator.pushReplacementNamed(context, RoutePath.homeScreen)
      else
        Navigator.pushReplacementNamed(context, RoutePath.loginScreen)
    });
  return Scaffold(
    body: Center(child: Text('Walmart'),),
  ); 
  }
}