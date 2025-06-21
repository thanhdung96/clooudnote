export const USER_CREATED_EVENT = 'user:created';

export class UserCreatedEvent {
  public readonly email!: string;

  constructor(email: string) {
    this.email = email;
  }
}
