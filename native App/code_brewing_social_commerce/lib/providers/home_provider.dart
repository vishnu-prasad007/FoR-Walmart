import 'package:code_brewing_social_commerce/models/category_data_model.dart';
import 'package:code_brewing_social_commerce/models/category_model.dart';
import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/models/product_model.dart';
import 'package:code_brewing_social_commerce/services/products_api_service.dart';
import 'package:code_brewing_social_commerce/utils/constants.dart';
import 'package:code_brewing_social_commerce/utils/http_exception.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/utils/storage.dart';
import 'package:flutter/material.dart';

class HomeProvider extends ChangeNotifier {

 CategoryModel categoryModel;
 ProductModel productModel;
 static SecureStorage secureStorage;
 static String accessToken;

 HomeProvider() {
   print('11111');
   secureStorage = SecureStorage();
   initStartupAsyncFunctions();
   print('22222');
 }

  Future<void> initAccessToken() async {
    accessToken = await secureStorage.readValue(SecureStorageKey.secureStoargeAccessTokenKey);
  }


  void initStartupAsyncFunctions() async {
    await initCategory();
    await initAccessToken();
  }

 List<CategoryDataModel> get getCategoryList {
   if(categoryModel == null)
   return null;
   else
   return categoryModel.categories;
 }

 List<ProductDataModel> get getProductList {
   return productModel.products;
 }

  Future<void> initCategory() async{
    print('request completed');
   categoryModel =  await getCategory();
   notifyListeners();
   print('request completed');
  } 


  Future<void> initPrducts(BuildContext context,String categoryId) async {

    try{
    productModel = await getProducts(categoryId);
    Navigator.pushNamed(context,RoutePath.productsScreen,arguments: productModel.products);
    } on HttpNotFoundException{
      print('Not found');
    } on HttpInternalServerException {
      print('Oops');
    }
  }
}