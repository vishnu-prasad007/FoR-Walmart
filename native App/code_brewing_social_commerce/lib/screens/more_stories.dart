import 'package:code_brewing_social_commerce/models/stories_data_model.dart';
import 'package:code_brewing_social_commerce/models/stories_model.dart';
import 'package:code_brewing_social_commerce/utils/route_constants.dart';
import 'package:code_brewing_social_commerce/widgets/similar_products.dart';
import 'package:flutter/material.dart';
import 'package:story_view/controller/story_controller.dart';
import 'package:story_view/widgets/story_view.dart';

class MoreStories extends StatefulWidget {

  final StoriesDataModel storiesDataModel;

  MoreStories({this.storiesDataModel});

  @override
  _MoreStoriesState createState() => _MoreStoriesState();
}

class _MoreStoriesState extends State<MoreStories> {
  final storyController = StoryController();

  @override
  void dispose() {
    storyController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
      ),
      body: StoryView(
        storyItems: [
          StoryItem.pageImage(
            url: widget.storiesDataModel.item.pictureLink,
            caption: widget.storiesDataModel.item.name,
            controller: storyController,
          ),
        ],
        onStoryShow: (s) {
          print("Showing a story");
        },
        onComplete: () {
          print("Completed a cycle");
        },
        progressPosition: ProgressPosition.top,
        repeat: false,
        controller: storyController,
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(top: 500),
        child: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              FloatingActionButton(
                onPressed: () => {
                  Navigator.pushNamed(context, RoutePath.productDetailScreen,arguments: SimilarProducts(widget.storiesDataModel.item,[]))
                },
                child: Icon(Icons.shopping_cart),
              ),
              FloatingActionButton(
                onPressed: () => {},
                child: Icon(Icons.share),
              ),
            ],
          ),
        ),
      ),
    );
  }
}