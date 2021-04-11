import 'package:code_brewing_social_commerce/models/product_data_model.dart';

class SimilarProducts {
  final List<ProductDataModel> products;
  final ProductDataModel product;
  SimilarProducts(this.product,this.products,);
}


class OrderSummary {
  final int orderId;
  final SimilarProducts similarProducts;
  OrderSummary(this.orderId,this.similarProducts);
}


class StoriesScreen {
  
}