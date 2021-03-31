import 'package:json_annotation/json_annotation.dart';

part 'terms_model.g.dart';

@JsonSerializable()
class TermsModel {
  String message;
  int errorCode;

  TermsModel(this.message,this.errorCode);

  factory TermsModel.fromJson(Map<String,dynamic> json) => _$TermsModelFromJson(json);
  Map<String,dynamic> toJson() => _$TermsModelToJson(this);
}