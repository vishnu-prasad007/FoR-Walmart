import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
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
               var shareTerms =  await checkShareTerms(context);
               if(shareTerms.errorCode == 4000) {
                 Navigator.pushNamed(context, RoutePath.termsAndConditionScreen);
               } else if(shareTerms.errorCode == 2000) {
                 AlertDialog(
                   title: Text('Turn your profile to Public'),
                   actions: [
                     TextButton(
                       child: Text('Switch now'),
                       onPressed: (){
                         // switch profile
                       },
                     )
                   ],
                 );
               }
              }, child: Text('Share this product with friends'))
        ],
      ),
    );
  }
}
