// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProfileModel _$ProfileModelFromJson(Map<String, dynamic> json) {
  return ProfileModel(
    (json['orders'] as List)
        ?.map((e) => e == null
            ? null
            : SharedOrderModel.fromJson(e as Map<String, dynamic>))
        ?.toList(),
    json['id'] as int,
    json['name'] as String,
    json['termsandConditionStatus'] as bool,
    json['isProfilePublic'] as bool,
  );
}

Map<String, dynamic> _$ProfileModelToJson(ProfileModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'termsandConditionStatus': instance.termsandConditionStatus,
      'isProfilePublic': instance.isProfilePublic,
      'orders': instance.orders,
    };
