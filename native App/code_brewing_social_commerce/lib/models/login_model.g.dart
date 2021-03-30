// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LoginModel _$LoginModelFromJson(Map<String, dynamic> json) {
  return LoginModel(
    json['message'] as String,
    json['data'] == null
        ? null
        : LoginDataModel.fromJson(json['data'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$LoginModelToJson(LoginModel instance) =>
    <String, dynamic>{
      'message': instance.message,
      'data': instance.data,
    };
