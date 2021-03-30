// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login_data_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LoginDataModel _$LoginDataModelFromJson(Map<String, dynamic> json) {
  return LoginDataModel(
    json['userId'] as int,
    json['accessToken'] as String,
  );
}

Map<String, dynamic> _$LoginDataModelToJson(LoginDataModel instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'accessToken': instance.accessToken,
    };
