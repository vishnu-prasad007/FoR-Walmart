import 'package:code_brewing_social_commerce/models/product_data_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'product_model.g.dart';

@JsonSerializable()
class ProductModel {
  List<ProductDataModel> products;

  ProductModel(this.products);

 factory ProductModel.fromJson(Map<String,dynamic> json) => _$ProductModelFromJson(json);
  Map<String,dynamic> toJson() => _$ProductModelToJson(this);
}