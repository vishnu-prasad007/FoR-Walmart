import 'package:code_brewing_social_commerce/providers/providers.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Walmart'),
      ),
      drawer: Drawer(
        child: ListView(children: [
          InkWell(
              child: ListTile(
              title: Text('Home'),
              leading: Icon(Icons.home),
            ),
          ),
          InkWell(
            child: ListTile(
              title: Text('My Orders'),
              leading: Icon(Icons.shopping_basket),
            ),
          ),
          InkWell(child: ListTile(
            title: Text('Friends / Followers'),
            onTap: (){
              Navigator.pushNamed(context, RoutePath.friendsAndFollowingScreen);
            },
            leading: Icon(Icons.people),
          ),)
        ],),
      ),
      body: Consumer<HomeProvider>(builder: (context,homeProvider,_){
         // homeProvider.initCategory();
         print('gdgdg');
            if(homeProvider.getCategoryList == null) {
              return Center(
                child: CircularProgressIndicator(),
              );
            } else {
        return GridView.builder(itemCount: homeProvider.getCategoryList.length ?? 0,gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2), itemBuilder:  (buildContext,int index){
          return Card(
            child: InkWell(
              onTap: (){
               homeProvider.initPrducts(context,homeProvider.getCategoryList[index].id.toString());
              },
                child: Stack(
                  alignment: Alignment.bottomCenter,
                  children:[ Image.network(homeProvider.getCategoryList[index].pictureLink,fit: BoxFit.contain,)
                  ,Container(padding: EdgeInsets.all(4.0),child:Text(homeProvider.getCategoryList[index].name,style: TextStyle(fontSize: 18.0),),color: Colors.white,)
                  ])
              
            ),
          );
        });
      }
      },
    ),);
  }
}