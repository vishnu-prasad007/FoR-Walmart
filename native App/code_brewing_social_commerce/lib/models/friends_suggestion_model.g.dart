// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'friends_suggestion_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FriendsSuggestionModel _$FriendsSuggestionModelFromJson(
    Map<String, dynamic> json) {
  return FriendsSuggestionModel(
    json['message'] as String,
  )..users = json['users'] == null
      ? null
      : UserModel.fromJson(json['users'] as Map<String, dynamic>);
}

Map<String, dynamic> _$FriendsSuggestionModelToJson(
        FriendsSuggestionModel instance) =>
    <String, dynamic>{
      'message': instance.message,
      'users': instance.users,
    };
