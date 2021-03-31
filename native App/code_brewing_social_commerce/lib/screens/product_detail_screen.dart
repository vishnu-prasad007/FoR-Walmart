import 'package:code_brewing_social_commerce/services/products_api_service.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/widgets/similar_products.dart';
import 'package:flutter/material.dart';

class ProductDetailScreen extends StatelessWidget {
  final SimilarProducts similarProducts;

  ProductDetailScreen({this.similarProducts});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        children: [
          Container(
            padding: EdgeInsets.only(top: 20.0),
            child: Image.network(
              similarProducts.product.pictureLink,
              fit: BoxFit.contain,
            ),
            height: 150.0,
            alignment: Alignment.center,
          ),
          SizedBox(
            height: 25.0,
          ),
          Container(
            padding: EdgeInsets.only(left: 8.0),
            child: Text(similarProducts.product.name),
            alignment: Alignment.topLeft,
          ),
          SizedBox(
            height: 20.0,
          ),
          Container(
            padding: EdgeInsets.only(left: 8.0),
            child: Text(similarProducts.product.price.toString()),
            alignment: Alignment.topLeft,
          ),
          SizedBox(
            height: 20.0,
          ),
          Container(
            padding: EdgeInsets.only(left: 8.0),
            child: Text(similarProducts.product.description),
            alignment: Alignment.topLeft,
          ),
          SizedBox(
            height: 20.0,
          ),
          Container(
            padding: EdgeInsets.only(left: 8.0),
            child:
                Text('Ratings : ' + similarProducts.product.ratings.toString()),
            alignment: Alignment.topLeft,
          ),
          SizedBox(
            height: 20.0,
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton(
              onPressed: () async {
                var res = await addOrder(similarProducts.product.id);
                if(res['orderId']!=null)
                  Navigator.pushNamed(context, RoutePath.orderSummaryScreen,arguments: OrderSummary(res['orderId'], similarProducts));
              },
              child: Text('Buy Now'),
            ),
          ),
          SizedBox(
            height: 20.0,
          ),
          Container(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                  children: similarProducts.products.map((e) {
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Card(
                    
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context,RoutePath.productDetailScreen,arguments: SimilarProducts(e, similarProducts.products));
                      },
                      child: Column(
                        children: [
                          Container(
                            padding: EdgeInsets.all(8.0),
                            child: Image.network(
                              e.pictureLink,
                              fit: BoxFit.contain,
                            ),
                            height: 90.0,
                            width: 90.0,
                          ),
                          SizedBox(
                            height: 5.0,
                          ),
                          Text(e.name),
                          SizedBox(
                            height: 5.0,
                          ),
                          Text(e.price.toString())
                        ],
                      ),
                    ),
                  ),
                );
              }).toList()),
            ),
          )
        ],
      ),
    );
  }
}
