// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'following_user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FollowingUserModel _$FollowingUserModelFromJson(Map<String, dynamic> json) {
  return FollowingUserModel(
    (json['following'] as List)
        ?.map((e) =>
            e == null ? null : UserModel.fromJson(e as Map<String, dynamic>))
        ?.toList(),
  );
}

Map<String, dynamic> _$FollowingUserModelToJson(FollowingUserModel instance) =>
    <String, dynamic>{
      'following': instance.following,
    };
