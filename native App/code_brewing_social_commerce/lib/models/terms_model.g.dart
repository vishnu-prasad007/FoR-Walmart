// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'terms_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TermsModel _$TermsModelFromJson(Map<String, dynamic> json) {
  return TermsModel(
    json['message'] as String,
    json['errorCode'] as int,
  );
}

Map<String, dynamic> _$TermsModelToJson(TermsModel instance) =>
    <String, dynamic>{
      'message': instance.message,
      'errorCode': instance.errorCode,
    };
