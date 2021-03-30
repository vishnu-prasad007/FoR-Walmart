
Map<String,String> apiheaders = {'Content-Type':'application/json',};


abstract class ApiEndpoint {
  static const apiBaseUrl = "10.0.2.2:5000";
  static const auth = '/auth';
  static const login = '/login';
  static const category = '/category';
  static const orders = '/orders';
  static const items = '/items';
  static const share = '/share';
  static const terms = '/terms';
}

abstract class SecureStorageKey{
static const String secureStoargeAccessTokenKey = 'accessToken-key-vc-1';
}

/// Shared preferences keys
abstract class SharedPreferenceKey {
static const String isLoggedInKey = 'vc-staff-isloggedin-1';
static const String userIdKey = 'vc-userid-1';
}


