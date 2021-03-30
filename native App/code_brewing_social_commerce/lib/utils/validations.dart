mixin Validation {
  /// Returns the string without any leading and trailing whitespace.
  String trimInput(String input) {
    return input.trim();
  }

  /// phoneNo -> User | Customer 10 digit phoneno validation
  /// returns true if phoneNo is valid else false
  bool validatePhoneNo(String phoneNo) {
    if (phoneNo.length != 10) return false;
    return true;
  }
  
  bool validateName(String name) {
    name = trimInput(name);
    if (name.length > 2) return true;
    return false;
  }

  /// [emailaddress] of type String
  /// returns -true if email address is valid, else false
  bool validateEmail(String emailAddress) {
    Pattern pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp regexEmail = new RegExp(pattern);
    if (!regexEmail.hasMatch(emailAddress))
      return false;
    else
      return true;
  }

}

