import 'package:code_brewing_social_commerce/models/stories_data_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'stories_model.g.dart';

@JsonSerializable()
class StoriesModel {
  List<StoriesDataModel> data;

  StoriesModel(this.data);

  factory StoriesModel.fromJson(Map<String,dynamic> json) => _$StoriesModelFromJson(json);
     Map<String,dynamic> toJson() => _$StoriesModelToJson(this); 
}