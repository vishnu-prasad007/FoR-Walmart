import 'package:code_brewing_social_commerce/screens/more_stories.dart';
import 'package:code_brewing_social_commerce/screens/products_screen.dart';
import 'package:code_brewing_social_commerce/screens/profile_screen.dart';
import 'package:flutter/material.dart';
import 'package:code_brewing_social_commerce/screens/screens.dart';

abstract class RoutePath {
  static const String loginScreen = '/login';
  static const String homeScreen = '/home';
  static const String productsScreen = '/products';
  static const String productDetailScreen = '/product-detail';
  static const String orderSummaryScreen = '/order-summary';
  static const String termsAndConditionScreen = '/terms-condition'; 
  static const String friendsAndFollowingScreen = '/friends-following';
  static const String profileScreen = '/profile';
  static const String moreStoriesScreen = '/more-stories';

}

var screens = <String,Widget>{
RoutePath.loginScreen:LoginScreen(),
RoutePath.homeScreen:HomeScreen(),
RoutePath.productsScreen:ProductsScreen(),
RoutePath.productDetailScreen:ProductDetailScreen(),
RoutePath.orderSummaryScreen:OrderSummaryScreen(),
RoutePath.termsAndConditionScreen:TermsAndConditionsScreen(),
RoutePath.friendsAndFollowingScreen:FriendsAndFollowersScreen(),
RoutePath.profileScreen:ProfileScreen(),
RoutePath.moreStoriesScreen:MoreStories()
};