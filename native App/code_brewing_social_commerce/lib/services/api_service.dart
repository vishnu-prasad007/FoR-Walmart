import 'dart:io';
import 'package:code_brewing_social_commerce/models/login_model.dart';
import 'package:code_brewing_social_commerce/models/terms_model.dart';
import 'package:code_brewing_social_commerce/providers/home_provider.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'dart:convert';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:code_brewing_social_commerce/models/contact_model.dart';
import 'package:code_brewing_social_commerce/models/friends_suggestion_model.dart';

Future<TermsModel> checkShareTerms(BuildContext context) async {
  final accessToken = HomeProvider.accessToken;
  var response = await http.post(
    Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.share + ApiEndpoint.terms),
    headers: <String, String>{
      'Content-Type': 'application/json',
      'authorization': accessToken,
    },
  );

  if (response.statusCode == HttpStatus.ok) {
    Map json = jsonDecode(response.body);
    print(json);
    var termsModel = TermsModel.fromJson(json);
    print(termsModel);
    return termsModel;
    if (termsModel.errorCode == 4000) {
      // navigate to instruction screen
      Navigator.pushNamed(context, RoutePath.termsAndConditionScreen);
    } else if (termsModel.errorCode == 2000) {
      // display msg on profile switch button;
    } else {
      // open bottom sheet
    }
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
      // Map friendSuggestionJson = jsonDecode(response.body);
      // var friendSuggestionModel = FriendsSuggestionModel.fromJson(friendSuggestionJson);
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