export default class UserDto {
  name;
  email;
  id;
  roles;

  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model._id;
    this.roles = model.roles;
  }
}
