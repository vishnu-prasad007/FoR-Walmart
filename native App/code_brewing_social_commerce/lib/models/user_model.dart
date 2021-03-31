

import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable()
class UserModel {
  int id;
  String name;
  bool termsandConditionStatus;
  bool isProfilePublic;

  UserModel(this.id,this.name,this.isProfilePublic,this.termsandConditionStatus);

  factory UserModel.fromJson(Map<String,dynamic> json) => _$UserModelFromJson(json);
  Map<String,dynamic> toJson() => _$UserModelToJson(this);
}