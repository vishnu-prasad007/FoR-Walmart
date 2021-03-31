import 'package:json_annotation/json_annotation.dart';


part 'item_model.g.dart';

@JsonSerializable()
class ItemModel {
  int id;
  String name;
  int price;
  String description;
  int ratings;
  String pictureLink;

  ItemModel(this.id,this.name,this.price,this.description,this.ratings,this.pictureLink);

  factory ItemModel.fromJson(Map<String,dynamic> json) => _$ItemModelFromJson(json);
  Map<String,dynamic> toJson() => _$ItemModelToJson(this);
}