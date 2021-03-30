import 'dart:ui';

import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/providers/providers.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/widgets/similar_products.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ProductsScreen extends StatelessWidget {

  // products 
  final List<ProductDataModel> products;

  ProductsScreen({this.products});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Consumer<Productsprovider>(builder: (buildContext,productsprovider,_){
        return ListView.builder(itemCount: products.length,itemBuilder: (buildcontext,int index) {
          return ListTile(
            onTap: (){
              Navigator.pushNamed(context,RoutePath.productDetailScreen,arguments: SimilarProducts(products[index], products));
            },
            leading: Image.network(products[index].pictureLink,fit: BoxFit.contain,),
            title: Text(products[index].name),
            subtitle: Text(products[index].price.toString(),style: TextStyle(color: Colors.green),),
          );
        });
      },),
    );
  }
}