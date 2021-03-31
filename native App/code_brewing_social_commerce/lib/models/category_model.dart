import 'package:code_brewing_social_commerce/models/category_data_model.dart';
import 'package:json_annotation/json_annotation.dart';

part'category_model.g.dart';

@JsonSerializable()
class CategoryModel {
  List<CategoryDataModel> categories;

  CategoryModel(this.categories);

  factory CategoryModel.fromJson(Map<String,dynamic> json) => _$CategoryModelFromJson(json);
  Map<String,dynamic> toJson() => _$CategoryModelToJson(this);
}