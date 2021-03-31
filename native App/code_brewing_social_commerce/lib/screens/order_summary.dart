import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/widgets/share_bottomup_sheet.dart';
import 'package:code_brewing_social_commerce/widgets/similar_products.dart';
import 'package:flutter/material.dart';

class OrderSummaryScreen extends StatelessWidget {
  
  final OrderSummary orderSummary;

  OrderSummaryScreen({this.orderSummary});

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
            leading: Image.network(orderSummary.similarProducts.product.pictureLink),
            title: Text(orderSummary.similarProducts.product.name),
          ),
          SizedBox(height: 30.0),
          ElevatedButton(
              onPressed: () async{
               var shareTerms =  await checkShareTerms(context,orderSummary.orderId);
               print(shareTerms.errorCode);
               if(shareTerms.errorCode == 4000) {
                 Navigator.pushNamed(context, RoutePath.termsAndConditionScreen);
               } else if(shareTerms.errorCode == 2001) {
                   showDialog(
                          context: context,
                          builder: (BuildContext context) => AlertDialog(
                                title: Text('Your profile is Private'),
                                content: Text('Click Switch Now to turn to public '),
                                actions: <Widget>[
                                  TextButton(
                                    child: Text('Switch Now'),
                                    onPressed: () async{
                                      var res = await switchProfile();
                                      if(res) {
                                      Navigator.of(context).pop();
                                       showShareBottomUpSheet(context);
                                      }
                                    },
                                  )
                                ],
                              ));
               } else {
                 // show bottomup Screen
                 showShareBottomUpSheet(context);
               }
              }, child: Text('Share this product with friends'))
        ],
      ),
    );
  }
}
