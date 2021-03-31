
import 'package:code_brewing_social_commerce/models/item_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'shared_order_model.g.dart';

@JsonSerializable()
class SharedOrderModel {
    int id;
    String createdAt;
    bool isPublic;
    ItemModel item;

    SharedOrderModel(this.id,this.createdAt,this.isPublic,this.item);

     factory SharedOrderModel.fromJson(Map<String,dynamic> json) => _$SharedOrderModelFromJson(json);
     Map<String,dynamic> toJson() => _$SharedOrderModelToJson(this);

}