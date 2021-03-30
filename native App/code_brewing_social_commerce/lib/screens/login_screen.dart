import 'package:code_brewing_social_commerce/providers/login_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<LoginProvider>(builder: (context,loginprovider,_){
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text('Walmart',style: TextStyle(fontSize: 26.0),),
                 SizedBox(
                  height: 35.0,
                ),
               TextField(
                  decoration: InputDecoration(
                    labelText: "Email/PhoneNo",
                    errorText: loginprovider.getisEmailPhoneNoValid ? null:"Invalid Email/Phone No",
                  ),
                  autofocus: true,
                  onChanged: (input){
                    print(input);
                    loginprovider.setuserEmailPhone = input;
                  },
                ), 
                SizedBox(height: 25.0),
                TextField(
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: "Password",
                     errorText: loginprovider.getisPasswordValid ? null:"Invalid Password",
                  ),
                  onChanged: (input){
                    loginprovider.setPassword = input;
                  },
                ),
                SizedBox(height: 25.0),
                ElevatedButton(
                  child: Text("Login"),
                  onPressed: ()=>{
                   loginprovider.initLogin(context),
                  },
                ),
              ],
            ),
          ),
        );
      },),
    );
  }
}