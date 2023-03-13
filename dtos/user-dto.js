export default class UserDto {
  name;
  email;
  id;
  isActivated;
  roles;

  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.roles = model.roles;
  }
}
