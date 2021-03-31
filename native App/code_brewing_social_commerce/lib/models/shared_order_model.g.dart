// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'shared_order_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SharedOrderModel _$SharedOrderModelFromJson(Map<String, dynamic> json) {
  return SharedOrderModel(
    json['id'] as int,
    json['createdAt'] as String,
    json['isPublic'] as bool,
    json['item'] == null
        ? null
        : ItemModel.fromJson(json['item'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$SharedOrderModelToJson(SharedOrderModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'createdAt': instance.createdAt,
      'isPublic': instance.isPublic,
      'item': instance.item,
    };
