import 'dart:io';
import 'package:code_brewing_social_commerce/models/login_model.dart';
import 'package:code_brewing_social_commerce/providers/home_provider.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'dart:convert';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';

Future<void> checkShareTerms(BuildContext context) async {
  final accessToken = HomeProvider.accessToken;
  var response = await http.post(
    Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.share + ApiEndpoint.terms),
    headers: <String, String>{
      'Content-Type': 'application/json',
      'authorization': accessToken,
    },
  );

  
}
