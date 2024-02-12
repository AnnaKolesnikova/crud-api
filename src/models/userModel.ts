import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export class Users {
  users: User[] = [];

  getById(id: string): User {
    return this.users.filter((user) => user.id === id)[0];
  }

  create(data: User): User {
    const user = {
      id: uuidv4(),
      ...data,
    };
    this.users.push(user);
    return user;
  }

  update(id: string, data: User): User {
    const { username, age, hobbies } = data;
    const key = this.users.findIndex((user) => user.id === id);
    const currentUser = this.users[key];
    const newUser = Object.assign(currentUser, {
      username,
      age,
      hobbies,
    });
    this.users[key] = newUser;
    return newUser;
  }

  delete(id: string): void {
    const key = this.users.findIndex((user) => user.id === id);
    this.users.splice(key, 1);
    return;
  }
}
