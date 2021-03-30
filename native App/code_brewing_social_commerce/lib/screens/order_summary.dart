import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:flutter/material.dart';

class OrderSummaryScreen extends StatelessWidget {
  final ProductDataModel product;

  OrderSummaryScreen({this.product});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Check out'),
      ),
      body: Column(
        children: [
          ListTile(
            leading: Icon(Icons.check_circle),
            title: Text('Your Order is Placed'),
          ),
          SizedBox(height: 30.0),
          ListTile(
            leading: Image.network(product.pictureLink),
            title: Text(product.name),
          ),
          SizedBox(height: 30.0),
          ElevatedButton(
              onPressed: () async{
                await checkShareTerms(context);
              }, child: Text('Share this product with friends'))
        ],
      ),
    );
  }
}
