import 'package:code_brewing_social_commerce/models/following_user_model.dart';
import 'package:code_brewing_social_commerce/models/profile_model.dart';
import 'package:code_brewing_social_commerce/models/shared_order_model.dart';
import 'package:code_brewing_social_commerce/models/user_model.dart';
import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:flutter/material.dart';

class FollowingUserProvider extends ChangeNotifier {

  FollowingUserModel followingUsers;
  ProfileModel profileModel;
  List<SharedOrderModel> profileOrders;
  bool apiReq;
  FollowingUserProvider() {
   apiReq = true;
   profileOrders = [];
  }

  Future<void> initFollowingUserRequest() async{
    try {
        followingUsers = await getFollowingUsers();
        apiReq = false;
        notifyListeners();
    }  on HttpInternalServerException {
      print('Server error');
    }
  }

  ProfileModel get getProfileModel {
    return profileModel;
  }

  List<SharedOrderModel> get getProfileorders {
    return profileOrders;
  }

  Future<void> initFollowingProfile(BuildContext context,int profileId) async {
    print(profileId.toString());
    try {
      profileModel = await getProfile(profileId.toString());
      print('dfdfdg');
      print(profileModel.name);

      profileOrders = profileModel.orders;
      notifyListeners();
      Navigator.pushNamed(context, RoutePath.profileScreen,arguments: profileModel);
    } on HttpInternalServerException  {

    }
  }

}