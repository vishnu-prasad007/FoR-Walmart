import 'package:json_annotation/json_annotation.dart';

part 'category_data_model.g.dart';
@JsonSerializable()
class CategoryDataModel {
  int id;
  String name;
  String pictureLink;

  CategoryDataModel(this.id,this.name,this.pictureLink);

  factory CategoryDataModel.fromJson(Map<String,dynamic> json) => _$CategoryDataModelFromJson(json);
  Map<String,dynamic> toJson() => _$CategoryDataModelToJson(this);

}