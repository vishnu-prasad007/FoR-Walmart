import 'package:code_brewing_social_commerce/models/user_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'following_user_model.g.dart';

@JsonSerializable()
class FollowingUserModel {

  List<UserModel> following;
  FollowingUserModel(this.following);

  factory FollowingUserModel.fromJson(Map<String,dynamic> json) => _$FollowingUserModelFromJson(json);
  Map<String,dynamic> toJson() => _$FollowingUserModelToJson(this);
}