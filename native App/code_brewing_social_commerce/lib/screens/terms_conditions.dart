import 'dart:convert';

import 'package:code_brewing_social_commerce/services/api_service.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:code_brewing_social_commerce/models/contact_model.dart';
import 'package:code_brewing_social_commerce/widgets/share_bottomup_sheet.dart';

class TermsAndConditionsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        ListTile(
          title: Text(' '),
        ),
        ListTile(
          title: Center(child: Text('Terms & Conditions')),
        ),
        ListTile(
          title: Text(' '),
        ),
        ListTile(
          leading: Icon(Icons.adjust),
          title: Text(
              'How PUBLIC accounts and PRIVATE accounts indulge in data sharing'),
        ),
        ListTile(
          leading: Icon(Icons.adjust),
          title:
              Text('Share button allows you to share with anyone & anywhere.'),
        ),
        ListTile(
          leading: Icon(Icons.adjust),
          title: Text(
              'After the products being bought from the link shared, the users obtain rewards & free shipment'),
        ),
        ListTile(
          title: Text(' '),
        ),
        ListTile(
          title: Center(
              child: Text(
                  'By tapping AGREE, you accept the terms and privacy policy.')),
        ),
        ListTile(
          title: Text(' '),
        ),
        ListTile(
          title: Text(' '),
        ),
        ListTile(
          title: Text(' '),
        ),
        Container(
          margin: EdgeInsets.all(0),
          child: new Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Container(
                child: ElevatedButton(
                  child: Text(
                    'Cancel',
                    style: TextStyle(fontSize: 18.0),
                  ),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
              ),
              Container(
                child: ElevatedButton(
                  child: Text(
                    'Agree',
                    style: TextStyle(fontSize: 18.0),
                  ),
                  onPressed: () async {
                    final PermissionStatus permissionStatus =
                        await _getPermission();
                    if (permissionStatus == PermissionStatus.granted) {
                      // init agreeRequest;
                      /// get contacts
                      final Iterable<Contact> contacts =
                          await ContactsService.getContacts();
                      String preparedcontacts = prepareContacts(contacts);
                      var agreeResponse = await agreeTerms(preparedcontacts);
                      if (agreeResponse) {
                        Navigator.pop(context);
                        showShareBottomUpSheet(context);
                      }
                    } else {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) => AlertDialog(
                                title: Text('Contacts Permission'),
                                content: Text('Please enable contacts access '
                                    'permission in system settings'),
                                actions: <Widget>[
                                  TextButton(
                                    child: Text('Ok'),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  )
                                ],
                              ));
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ]),
    );
  }
}

Future<PermissionStatus> _getPermission() async {
  final PermissionStatus permission = await Permission.contacts.status;
  if (permission != PermissionStatus.granted &&
      permission != PermissionStatus.denied) {
    final Map<Permission, PermissionStatus> permissionStatus =
        await [Permission.contacts].request();
    return permissionStatus[Permission.contacts] ?? PermissionStatus.granted;
  } else {
    return permission;
  }
}

String prepareContacts(Iterable<Contact> contacts) {
  List<Map<String, String>> payloadContacts = [];
  List<ContactModel> cont = [];
  List<Map<String, String>> jsonString = [];
  contacts.forEach((contact) {
    if (contact.emails != null) {
      contact.emails.forEach((c2) {
        payloadContacts.add({"phoneEmail": c2.value});
        cont.add(ContactModel(c2.value));
      });
    }
    if (contact.phones != null) {
      contact.phones.forEach((p1) {
        payloadContacts.add({"phoneEmail": p1.value});
        cont.add(ContactModel(p1.value));
      });
    }
  });
  String jsonContactModel = jsonEncode(cont);
  return jsonContactModel;
}
