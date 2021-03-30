import 'package:json_annotation/json_annotation.dart';

part 'product_data_model.g.dart';

@JsonSerializable()
class ProductDataModel {
  int id;
  String name;
  int price;
  String description;
  int ratings;
  String pictureLink;
  ProductDataModel(this.id,this.name,this.price,this.description,this.ratings,this.pictureLink);

  factory ProductDataModel.fromJson(Map<String,dynamic> json) => _$ProductDataModelFromJson(json);
  Map<String,dynamic> toJson() => _$ProductDataModelToJson(this);
}