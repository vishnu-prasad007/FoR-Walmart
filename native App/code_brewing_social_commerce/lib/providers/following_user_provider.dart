import 'package:code_brewing_social_commerce/models/following_user_model.dart';
import 'package:code_brewing_social_commerce/models/user_model.dart';
import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:flutter/material.dart';

class FollowingUserProvider extends ChangeNotifier {

  FollowingUserModel followingUsers;


  Future<void> initFollowingUserRequest() async{
    try {
        followingUsers = await getFollowingUsers();
        notifyListeners();
    }  on HttpInternalServerException {
      print('Server error');
    }
  }

}