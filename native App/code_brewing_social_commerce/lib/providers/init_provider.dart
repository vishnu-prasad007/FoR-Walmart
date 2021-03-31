import 'package:flutter/material.dart';
import 'package:code_brewing_social_commerce/models/friends_suggestion_model.dart';

class InitProvider extends ChangeNotifier {
  
   FriendsSuggestionModel friendsSuggestionsModel;
  
   void setFriendsSuggestion(FriendsSuggestionModel _friendsSuggestionsModel) {
    friendsSuggestionsModel = _friendsSuggestionsModel;
    notifyListeners();
  }

}