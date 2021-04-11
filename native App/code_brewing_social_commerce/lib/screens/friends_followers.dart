import 'dart:io';

import 'package:code_brewing_social_commerce/models/following_user_model.dart';
import 'package:code_brewing_social_commerce/models/friends_suggestion_model.dart';
import 'package:code_brewing_social_commerce/providers/following_user_provider.dart';
import 'package:code_brewing_social_commerce/screens/screens.dart';
import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class FriendsAndFollowersScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Friends and Followers'),
        ),
        body: Column(
          children: [
            Flexible(
              child: Consumer<FollowingUserProvider>(
                builder: (context, followingUserProvider, _) {
                  if (followingUserProvider.apiReq ?? false) {
                    followingUserProvider.initFollowingUserRequest();
                  }
                  return ListView.builder(
                      itemCount:
                          followingUserProvider.followingUsers == null ?0 :followingUserProvider.followingUsers.following.length,
                      itemBuilder: (context, int index) {
                        return ListTile(
                          onTap: () {
                            followingUserProvider.initFollowingProfile(
                                context,
                                followingUserProvider
                                    .followingUsers.following[index].id);
                          },
                          leading: Icon(Icons.account_circle),
                          title: Text(followingUserProvider
                              .followingUsers.following[index].name),
                          subtitle: Text('2 followers'),
                        );
                      });
                },
              ),
            ),
           Flexible(
             flex: 4,
             child: Column(
               children: [
                 Padding(
                   padding: const EdgeInsets.all(8.0),
                   child: Text('Followers Suggestion'),
                 ),
                 Flexible(
                   child: ListView.builder(itemCount: FollowingUserProvider.friendsSuggestionModel == null ?0:FollowingUserProvider.friendsSuggestionModel.users.length,itemBuilder: (context,int index){
                     return ListTile(
                       leading: Icon(Icons.account_circle),
                       title: Text(FollowingUserProvider.friendsSuggestionModel.users[index].name)
                     );
                   }),
                 )
               ],
             ),
           ),
          ],
        ));
  }
}
