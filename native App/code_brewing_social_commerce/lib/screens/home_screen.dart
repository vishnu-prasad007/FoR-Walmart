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
        child: ListView(
          children: [
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
            InkWell(
              child: ListTile(
                title: Text('Friends / Followers'),
                onTap: () {
                  Navigator.pushNamed(
                      context, RoutePath.friendsAndFollowingScreen);
                },
                leading: Icon(Icons.people),
              ),
            )
          ],
        ),
      ),
      body: Consumer<HomeProvider>(
        builder: (context, homeProvider, _) {
          // homeProvider.initCategory();
          print('gdgdg');
          if (homeProvider.getCategoryList == null) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else {
            return RefreshIndicator(
                child: Container(
                  child: Column(
                    children: [
                      SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          children: <Widget>[
                            Row(
                              children: List.generate(
                                homeProvider.getStoriesModel.data.length,
                                (index) {
                                  return Padding(
                                    padding: const EdgeInsets.only(right: 20),
                                    child: Column(
                                      children: <Widget>[
                                        InkWell(
                                          onTap: () {
                                            Navigator.pushNamed(context,
                                                RoutePath.moreStoriesScreen,
                                                arguments: homeProvider
                                                    .getStoriesModel
                                                    .data[index]);
                                          },
                                          child: Container(
                                            width: 60,
                                            height: 60,
                                            child: Stack(
                                              children: <Widget>[
                                                true
                                                    ? Container(
                                                        decoration: BoxDecoration(
                                                            shape:
                                                                BoxShape.circle,
                                                            border: Border.all(
                                                                color: Colors
                                                                    .blueAccent,
                                                                width: 3)),
                                                        child: Padding(
                                                          padding:
                                                              const EdgeInsets
                                                                  .all(3.0),
                                                          child: Container(
                                                            width: 75,
                                                            height: 75,
                                                            child: Icon(
                                                              Icons
                                                                  .account_circle,
                                                              size: 45.0,
                                                            ),
                                                          ),
                                                        ),
                                                      )
                                                    : Container(
                                                        width: 70,
                                                        height: 70,
                                                        decoration: BoxDecoration(
                                                            shape: BoxShape
                                                                .circle,
                                                            image: DecorationImage(
                                                                image: NetworkImage(
                                                                    homeProvider
                                                                        .getStoriesModel
                                                                        .data[
                                                                            index]
                                                                        .item
                                                                        .pictureLink),
                                                                fit: BoxFit
                                                                    .cover)),
                                                      ),
                                              ],
                                            ),
                                          ),
                                        ),
                                        SizedBox(
                                          height: 10,
                                        ),
                                        SizedBox(
                                          width: 75,
                                          child: Align(
                                              child: Text(
                                            homeProvider.getStoriesModel
                                                .data[index].user.name,
                                            overflow: TextOverflow.ellipsis,
                                          )),
                                        )
                                      ],
                                    ),
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(18.0),
                        child: GridView.builder(
                            shrinkWrap: true,
                            itemCount: homeProvider.getCategoryList.length ?? 0,
                            gridDelegate:
                                SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 2),
                            itemBuilder: (buildContext, int index) {
                              return Card(
                                child: InkWell(
                                    onTap: () {
                                      homeProvider.initPrducts(
                                          context,
                                          homeProvider.getCategoryList[index].id
                                              .toString());
                                    },
                                    child: Stack(
                                        alignment: Alignment.bottomCenter,
                                        children: [
                                          Image.network(
                                            homeProvider.getCategoryList[index]
                                                .pictureLink,
                                            fit: BoxFit.contain,
                                          ),
                                          Container(
                                            padding: EdgeInsets.all(4.0),
                                            child: Text(
                                              homeProvider
                                                  .getCategoryList[index].name,
                                              style: TextStyle(fontSize: 18.0),
                                            ),
                                            color: Colors.white,
                                          )
                                        ])),
                              );
                            }),
                      ),
                    ],
                  ),
                ),
                onRefresh: () async {
                  print('Refreshing');
                  homeProvider.initHomeRefresh();
                });
          }
        },
      ),
    );
  }
}
