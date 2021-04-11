// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stories_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StoriesModel _$StoriesModelFromJson(Map<String, dynamic> json) {
  return StoriesModel(
    (json['data'] as List)
        ?.map((e) => e == null
            ? null
            : StoriesDataModel.fromJson(e as Map<String, dynamic>))
        ?.toList(),
  );
}

Map<String, dynamic> _$StoriesModelToJson(StoriesModel instance) =>
    <String, dynamic>{
      'data': instance.data,
    };
