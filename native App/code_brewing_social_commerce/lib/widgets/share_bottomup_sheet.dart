import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void showShareBottomUpSheet(BuildContext context) {
  showModalBottomSheet(
      context: context,
      builder: (BuildContext bc) {
        return Container(
          height: 150,
          alignment: Alignment.center,
          child: Wrap(
            children: <Widget>[
              ListTile(
                  leading: Icon(Icons.account_circle_rounded),
                  title: Text('Add to Stories'),
                  onTap: () => {}),
              ListTile(
                leading: Icon(Icons.ios_share),
                title: Text('Share'),
                onTap: () => {},
              ),
            ],
          ),
        );
      });
}
