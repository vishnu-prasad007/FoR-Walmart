// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product_data_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProductDataModel _$ProductDataModelFromJson(Map<String, dynamic> json) {
  return ProductDataModel(
    json['id'] as int,
    json['name'] as String,
    json['price'] as int,
    json['description'] as String,
    json['ratings'] as int,
    json['pictureLink'] as String,
  );
}

Map<String, dynamic> _$ProductDataModelToJson(ProductDataModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'price': instance.price,
      'description': instance.description,
      'ratings': instance.ratings,
      'pictureLink': instance.pictureLink,
    };
