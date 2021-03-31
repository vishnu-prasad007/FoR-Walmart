// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserModel _$UserModelFromJson(Map<String, dynamic> json) {
  return UserModel(
    json['id'] as int,
    json['name'] as String,
    json['isProfilePublic'] as bool,
    json['termsandConditionStatus'] as bool,
  );
}

Map<String, dynamic> _$UserModelToJson(UserModel instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'termsandConditionStatus': instance.termsandConditionStatus,
      'isProfilePublic': instance.isProfilePublic,
    };
