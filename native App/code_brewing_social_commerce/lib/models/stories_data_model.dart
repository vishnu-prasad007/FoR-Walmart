import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:code_brewing_social_commerce/models/user_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'stories_data_model.g.dart';

@JsonSerializable()
class StoriesDataModel {
  int id;
  ProductDataModel item;
  UserModel user;

  StoriesDataModel(this.id,this.item,this.user);

  factory StoriesDataModel.fromJson(Map<String,dynamic> json) => _$StoriesDataModelFromJson(json);
     Map<String,dynamic> toJson() => _$StoriesDataModelToJson(this); 
}