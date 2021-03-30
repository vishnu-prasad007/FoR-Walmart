import 'package:code_brewing_social_commerce/models/category_model.dart';
import 'package:code_brewing_social_commerce/models/order_model.dart';
import 'package:code_brewing_social_commerce/models/product_model.dart';
import 'package:code_brewing_social_commerce/providers/home_provider.dart';
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

Future<CategoryModel> getCategory() async {
  var response = await http.get(
      Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.category),
      headers: apiheaders);
  print(response.body);

  if (response.statusCode == HttpStatus.ok) {
    // decode response
    Map category = jsonDecode(response.body);
    var categoryModel = CategoryModel.fromJson(category);
    return categoryModel;
    // var categoryModel = CategoryModel.fromJson(category);
  } else if (response.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else
    throw new HttpInternalServerException();
}

Future<ProductModel> getProducts(String categoryId) async {
  var response = await http.get(Uri.http(ApiEndpoint.apiBaseUrl,
      ApiEndpoint.category + '/' + categoryId + ApiEndpoint.items));
  print(response.body);

  if (response.statusCode == HttpStatus.ok) {
    // decode json
    Map products = jsonDecode(response.body);
    var productsModel = ProductModel.fromJson(products);
    print(productsModel);
    return productsModel;
  } else if (response.statusCode == HttpStatus.unauthorized)
    throw new HttpUnauthorizedException();
  else if (response.statusCode == HttpStatus.notFound)
    throw new HttpNotFoundException();
  else
    throw new HttpInternalServerException();
}

Future<bool> addOrder(int itemId) async {
 
  final accessToken = HomeProvider.accessToken;
  var response =
      await http.post(Uri.http(ApiEndpoint.apiBaseUrl, ApiEndpoint.orders),
          headers: <String, String>{
            'Content-Type': 'application/json',
            'authorization': accessToken,
          },
          body: jsonEncode(<String, int>{"itemId": itemId}));
  print(response.body);
  if (response.statusCode == HttpStatus.created) {
    Map order = jsonDecode(response.body);
    var orderModel = OrderModel.fromJson(order);
    print(orderModel);
    return true;
  } else if (response.statusCode == HttpStatus.unauthorized) {
    throw new HttpUnauthorizedException();
  } else
    throw new HttpInternalServerException();
}
