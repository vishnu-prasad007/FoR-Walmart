import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/models/profile_model.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/widgets/similar_products.dart';
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final ProfileModel profileModel;

  ProfileScreen({this.profileModel});

  @override
  Widget build(BuildContext context) {
    print(profileModel.orders);
    return Scaffold(
        body: CustomScrollView(
      slivers: [
        SliverAppBar(
          leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
          title: Text('Profile'),
          expandedHeight: 200.0,
          flexibleSpace: FlexibleSpaceBar(
            centerTitle: true,
            background: Column(
              children: [
                SizedBox(
                  height: 25.0,
                ),
                Container(
                  padding: EdgeInsets.all(18.0),
                  child: Icon(
                    Icons.account_circle_sharp,
                    size: 70.0,
                  ),
                ),
                Text(
                  profileModel.name,
                  style: TextStyle(color: Colors.white),
                )
              ],
            ),
          ),
        ),
        SliverList(
          delegate: SliverChildListDelegate(List.generate(
              profileModel.orders == null ? 1 : profileModel.orders.length,
              (index) {
                print('before if else');
            if (profileModel.orders!= null) {
              return ListTile(
                onTap: () {
                  Navigator.pushNamed(context, RoutePath.productDetailScreen,
                      arguments:
                          SimilarProducts(profileModel.orders[index].item, []));
                },
                leading:
                    Image.network(profileModel.orders[index].item.pictureLink),
                title: Text(profileModel.orders[index].item.name),
              );
            } else {
              return Container(child: Text('No orders found'),padding: EdgeInsets.only(top: 20.0),alignment: Alignment.center,);

            }
          })),
        )
      ],
    ));
  }
}
