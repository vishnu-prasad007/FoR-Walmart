

import 'package:json_annotation/json_annotation.dart';
import 'package:code_brewing_social_commerce/models/user_model.dart';

part 'friends_suggestion_model.g.dart';

@JsonSerializable()
class FriendsSuggestionModel {
  String message;
  UserModel users;

  FriendsSuggestionModel(this.message);

  factory FriendsSuggestionModel.fromJson(Map<String,dynamic> json) => _$FriendsSuggestionModelFromJson(json);
  Map<String,dynamic> toJson() => _$FriendsSuggestionModelToJson(this);
}