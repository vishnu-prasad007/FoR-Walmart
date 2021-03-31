import 'package:flutter/material.dart';

class FriendsAndFollowers extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Friends and Followers'),
      ),
      body: ListView.builder(itemBuilder: (context,int index){
        return ListTile(
          leading: Icon(Icons.account_circle),
          title: Text('dfdfg'),
        );
        
      }),
    );
  }
}