import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/models/shared_order_model.dart';
import 'package:code_brewing_social_commerce/models/user_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'profile_model.g.dart';

@JsonSerializable()
class ProfileModel {
  int id;
  String name;
  bool termsandConditionStatus;
  bool isProfilePublic;
  List<SharedOrderModel> orders;
  
  ProfileModel(this.orders,this.id,this.name,this.termsandConditionStatus,this.isProfilePublic);
  
  factory ProfileModel.fromJson(Map<String,dynamic> json) => _$ProfileModelFromJson(json);
  Map<String,dynamic> toJson() => _$ProfileModelToJson(this);
}