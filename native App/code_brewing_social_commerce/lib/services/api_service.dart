import 'dart:io';
import 'package:code_brewing_social_commerce/models/following_user_model.dart';
import 'package:code_brewing_social_commerce/models/login_model.dart';
import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/models/profile_model.dart';
import 'package:code_brewing_social_commerce/models/stories_model.dart';
import 'package:code_brewing_social_commerce/models/terms_model.dart';
import 'package:code_brewing_social_commerce/providers/following_user_provider.dart';
import 'package:code_brewing_social_commerce/providers/home_provider.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:code_brewing_social_commerce/widgets/share_bottomup_sheet.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'dart:convert';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:code_brewing_social_commerce/models/contact_model.dart';
import 'package:code_brewing_social_commerce/models/friends_suggestion_model.dart';

Future<TermsModel> checkShareTerms(BuildContext context,int orderId) async {
  print('order id'+orderId.toString());
  final accessToken = HomeProvider.accessToken;
  var response = await http.post(
    Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.share + ApiEndpoint.terms),
    headers: <String, String>{
      'Content-Type': 'application/json',
      'authorization': accessToken,
    },
    body: jsonEncode(<String,dynamic>{"orderId":orderId})
  );

  if (response.statusCode == HttpStatus.ok) {
    Map json = jsonDecode(response.body);
    print(json);
    var termsModel = TermsModel.fromJson(json);
    print(termsModel);
    return termsModel;
  } else if (response.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else {
    throw new HttpInternalServerException();
  }
}

Future<bool> agreeTerms(String contacts) async {
  final accessToken = HomeProvider.accessToken;
  var response = await http.post(
      Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.share + ApiEndpoint.agree),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      },
      body: jsonEncode(<String, String>{"contacts":contacts}));
    if(response.statusCode == HttpStatus.ok) {
      print(response.body);
       Map friendSuggestionJson = jsonDecode(response.body);
       print(friendSuggestionJson);
       var friendSuggestionModel = FriendsSuggestionModel.fromJson(friendSuggestionJson);
       print(friendSuggestionModel.message);
       FollowingUserProvider.friendsSuggestionModel = friendSuggestionModel;
      return true;
    } else if(response.statusCode == HttpStatus.unauthorized) {
      throw new HttpUnauthorizedException();
    } else {
      throw new HttpInternalServerException();
    }
}


Future<void> shareOrder(String orderId) async {
  final accessToken = HomeProvider.accessToken;
  var response = await http.post(Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.orders + '/'+orderId + ApiEndpoint.share), headers: <String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      },);
    print(response.body);
}


Future<bool> switchProfile() async {
  final accessToken = HomeProvider.accessToken;
  var resposne = await http.post(Uri.http(ApiEndpoint.apiBaseUrl,ApiEndpoint.users + ApiEndpoint.switchProfile),headers: <String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      });

  if(resposne.statusCode == HttpStatus.ok) {
    return true;
  } else if(resposne.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else {
    throw new HttpInternalServerException();
  }
}



Future<FollowingUserModel> getFollowingUsers() async {
  final accessToken = HomeProvider.accessToken;
  var response = await http.get(Uri.http(ApiEndpoint.apiBaseUrl,ApiEndpoint.users + '/me' + ApiEndpoint.following),headers:<String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      });
  print('inside getFollowingUser()');
  print(response.body);

  if(response.statusCode == HttpStatus.ok) {
    Map followingUserJson = jsonDecode(response.body);
    var followinfUserModel = FollowingUserModel.fromJson(followingUserJson);
    print(followinfUserModel.following);
    return followinfUserModel;

  } else if(response.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else {
    throw new HttpInternalServerException();
  }
}





Future<ProfileModel> getProfile(String profileId) async {
  print('inside getProfile');
  final accessToken = HomeProvider.accessToken;
  var response = await http.get(Uri.http(ApiEndpoint.apiBaseUrl,ApiEndpoint.users + ApiEndpoint.profile + '/' + profileId),headers:<String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      });

  if(response.statusCode == HttpStatus.ok) {
    Map profileModelJson = jsonDecode(response.body);
    print(response.body);
    var profileModel = ProfileModel.fromJson(profileModelJson['profile']);
    print(profileModelJson);
    return profileModel;
  } else if(response.statusCode == HttpStatus.notFound) {
      throw new HttpNotFoundException();

  } else if(response.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else {
    throw new HttpInternalServerException();
  }
}


Future<void> followUser(String followingUserId) async{
    final accessToken = HomeProvider.accessToken;
    final response = await http.post(Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.users + '/' + followingUserId + '/follow'),headers:<String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      });

  if(response.statusCode == HttpStatus.ok) {
    // success
     print('You started following');
  } else if(response.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else {
    throw new HttpInternalServerException();
  }

}



Future<StoriesModel> getStories() async{
  final accessToken = HomeProvider.accessToken;
  var response = await http.get(Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.stories),headers:<String, String>{
        'Content-Type': 'application/json',
        'authorization': accessToken,
      });

  print(response.body);
  if(response.statusCode == HttpStatus.ok) {
    Map storiesJson = jsonDecode(response.body);
    var storiesModel = StoriesModel.fromJson(storiesJson);
    print(storiesModel);
    return storiesModel;
  } else if(response.statusCode == HttpStatus.unauthorized)
    throw new HttpUnauthorizedException();
    else if (response.statusCode == HttpStatus.notFound) 
   ///   throw new HttpNotFoundException();
    print('dfdg');
    else {
      throw new HttpInternalServerException();
    }


}