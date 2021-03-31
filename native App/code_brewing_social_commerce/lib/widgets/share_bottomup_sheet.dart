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
              ListTile(title:Text('We shared your purchase with your firends/followers')),
              ListTile(
                leading: Icon(Icons.link),
                title: Text('Get a link'),
                onTap: () => {},
              ),
            ],
          ),
        );
      });
}
