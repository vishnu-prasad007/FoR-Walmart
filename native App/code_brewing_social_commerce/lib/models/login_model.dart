import 'package:code_brewing_social_commerce/models/login_data_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'login_model.g.dart';

@JsonSerializable()
class LoginModel{

  String message;
  LoginDataModel data;

  LoginModel(this.message,this.data);

  factory LoginModel.fromJson(Map<String,dynamic> json) => _$LoginModelFromJson(json);
  Map<String,dynamic> toJson() => _$LoginModelToJson(this);

}