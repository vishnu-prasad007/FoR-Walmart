// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'friends_suggestion_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FriendsSuggestionModel _$FriendsSuggestionModelFromJson(
    Map<String, dynamic> json) {
  return FriendsSuggestionModel(
    json['message'] as String,
    (json['users'] as List)
        ?.map((e) =>
            e == null ? null : UserModel.fromJson(e as Map<String, dynamic>))
        ?.toList(),
  );
}

Map<String, dynamic> _$FriendsSuggestionModelToJson(
        FriendsSuggestionModel instance) =>
    <String, dynamic>{
      'message': instance.message,
      'users': instance.users,
    };
