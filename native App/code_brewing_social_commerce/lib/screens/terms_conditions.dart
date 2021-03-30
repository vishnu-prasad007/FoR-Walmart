import 'package:flutter/material.dart';




class Instructions extends StatefulWidget {
  @override
  
  Widget build(BuildContext context) {
    return Scaffold(

      body: Column(

          children: [
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
              title: Text(
                  'Share button allows you to share with anyone & anywhere.'),
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

              title: Center(child: Text(
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
                    child: FlatButton(
                      child: Text('Cancel', style: TextStyle(fontSize: 18.0),),
                      color: Colors.blueAccent,
                      textColor: Colors.white,
                      onPressed: () {},
                    ),
                  ),
                  Container(
                    child: FlatButton(
                      child: Text('Agree', style: TextStyle(fontSize: 18.0),),
                      color: Colors.blueAccent,
                      textColor: Colors.white,
                      onPressed: () {},
                    ),
                  ),

                ],
              ),

            ),
          ]
      ),
    );
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    throw UnimplementedError();
  }
}