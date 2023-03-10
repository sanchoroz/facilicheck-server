export default class UserDto {
  email;
  id;
  isActivated;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.roles = model.roles;
  }
}
