// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ItemModel _$ItemModelFromJson(Map<String, dynamic> json) {
  return ItemModel(
    json['id'] as int,
    json['name'] as String,
    json['price'] as int,
    json['description'] as String,
    json['ratings'] as int,
    json['pictureLink'] as String,
  );
}

Map<String, dynamic> _$ItemModelToJson(ItemModel instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'price': instance.price,
      'description': instance.description,
      'ratings': instance.ratings,
      'pictureLink': instance.pictureLink,
    };
