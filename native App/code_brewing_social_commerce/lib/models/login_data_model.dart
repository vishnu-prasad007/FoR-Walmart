import 'package:json_annotation/json_annotation.dart';

part 'login_data_model.g.dart';

@JsonSerializable()
class LoginDataModel {
  int userId;
  String accessToken;
  
  LoginDataModel(this.userId,this.accessToken);

  factory LoginDataModel.fromJson(Map<String,dynamic> json) => _$LoginDataModelFromJson(json);
  Map<String,dynamic> toJson() => _$LoginDataModelToJson(this);
}