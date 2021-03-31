import 'package:code_brewing_social_commerce/routes.dart';
import 'package:code_brewing_social_commerce/screens/screens.dart';
import 'package:code_brewing_social_commerce/utils/theme.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:code_brewing_social_commerce/providers/providers.dart';

void main() async{
  // WidgetsFlutterBinding.ensureInitialized();
  // await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(providers: [
      ChangeNotifierProvider(create: (_) => LoginProvider()),
      ChangeNotifierProvider(create: (_) => HomeProvider(),),
      ChangeNotifierProvider(create: (_) => Productsprovider()),
    ],child: MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        inputDecorationTheme: inputDecorationTheme,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      onGenerateRoute: RouteGenerator.getRoute,
      home: SplashScreen(),
    ));
  }
}