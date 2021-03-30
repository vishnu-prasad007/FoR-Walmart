import 'package:json_annotation/json_annotation.dart';

part 'order_model.g.dart';

@JsonSerializable()
class OrderModel  {
  String message;
  int orderId;

  OrderModel(this.message,this.orderId);

   factory OrderModel.fromJson(Map<String,dynamic> json) => _$OrderModelFromJson(json);
  Map<String,dynamic> toJson() => _$OrderModelToJson(this);

}