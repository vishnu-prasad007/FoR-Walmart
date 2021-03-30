// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'category_data_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CategoryDataModel _$CategoryDataModelFromJson(Map<String, dynamic> json) {
  return CategoryDataModel(
    json['id'] as int,
    json['name'] as String,
    json['pictureLink'] as String,
  );
}

Map<String, dynamic> _$CategoryDataModelToJson(CategoryDataModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'pictureLink': instance.pictureLink,
    };
