class HttpNotFoundException implements Exception {
  String message;
  HttpNotFoundException([this.message]);
}

class HttpInternalServerException implements Exception {
  String message;
  HttpInternalServerException([this.message]);
}

class HttpUnauthorizedException implements Exception {
  String message;
  HttpUnauthorizedException([this.message]);
}