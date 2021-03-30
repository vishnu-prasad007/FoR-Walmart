import 'package:code_brewing_social_commerce/screens/products_screen.dart';
import 'package:flutter/material.dart';
import 'package:code_brewing_social_commerce/screens/screens.dart';

abstract class RoutePath {
  static const String loginScreen = '/login';
  static const String homeScreen = '/home';
  static const String productsScreen = '/products';
  static const String productDetailScreen = '/product-detail';
  static const String orderSummaryScreen = '/order-summary';
}

var screens = <String,Widget>{
RoutePath.loginScreen:LoginScreen(),
RoutePath.homeScreen:HomeScreen(),
RoutePath.productsScreen:ProductsScreen(),
RoutePath.productDetailScreen:ProductDetailScreen(),
RoutePath.orderSummaryScreen:OrderSummaryScreen()

};