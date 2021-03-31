

class ContactModel {
  String phoneEmail;

  ContactModel(this.phoneEmail);

  Map toJson() => {
    'phoneEmail':phoneEmail
  };
}