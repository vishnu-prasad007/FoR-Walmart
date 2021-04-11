// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stories_data_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StoriesDataModel _$StoriesDataModelFromJson(Map<String, dynamic> json) {
  return StoriesDataModel(
    json['id'] as int,
    json['item'] == null
        ? null
        : ProductDataModel.fromJson(json['item'] as Map<String, dynamic>),
    json['user'] == null
        ? null
        : UserModel.fromJson(json['user'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$StoriesDataModelToJson(StoriesDataModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'item': instance.item,
      'user': instance.user,
    };
