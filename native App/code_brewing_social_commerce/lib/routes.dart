import 'package:code_brewing_social_commerce/screens/more_stories.dart';
import 'package:code_brewing_social_commerce/screens/products_screen.dart';
import 'package:code_brewing_social_commerce/screens/profile_screen.dart';
import 'package:code_brewing_social_commerce/screens/screens.dart';
import 'package:flutter/material.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';

class RouteGenerator {
  static Route<dynamic> getRoute(RouteSettings routeSettings) {
    switch (routeSettings.name) {
      case RoutePath.loginScreen:
        return MaterialPageRoute(
            builder: (_) => screens[RoutePath.loginScreen]);
        break;
      case RoutePath.homeScreen:
        return MaterialPageRoute(builder: (_) => screens[RoutePath.homeScreen]);
        break;
      case RoutePath.productsScreen:
        return MaterialPageRoute(
            builder: (_) => ProductsScreen(
                  products: routeSettings.arguments,
                ));
        break;

      case RoutePath.productDetailScreen:
        return MaterialPageRoute(
            builder: (_) => ProductDetailScreen(
                  similarProducts: routeSettings.arguments,
                ));
        break;

      case RoutePath.orderSummaryScreen:
        return MaterialPageRoute(
            builder: (_) => OrderSummaryScreen(
                  orderSummary: routeSettings.arguments,
                ));
        break;

      case RoutePath.termsAndConditionScreen:
        return MaterialPageRoute(builder: (_) => TermsAndConditionsScreen());
        break;

      case RoutePath.friendsAndFollowingScreen:
        return MaterialPageRoute(builder: (_) => FriendsAndFollowersScreen());
        break;

      case RoutePath.profileScreen:
        return MaterialPageRoute(
            builder: (_) => ProfileScreen(
                  profileModel: routeSettings.arguments,
                ));
        break;

      case RoutePath.moreStoriesScreen:
          return MaterialPageRoute(builder: (_)=>MoreStories(
            storiesDataModel: routeSettings.arguments,
          ));
          break;
    }
  }
}
