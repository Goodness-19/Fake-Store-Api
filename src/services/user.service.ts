import UserRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";

class UserService {
  private repo = new UserRepository();

  private async checkEmailDuplicate(email: string) {
    const existingUser = await this.repo.findByEmail(email);
    if (existingUser && existingUser.email) {
      const err: any = new Error(
        "Duplicate entry, please check the email and try again",
      );
      err.statusCode = 409;
      throw err;
    }
  }

  private async checkUserExist(uuid: string) {
    const user = await this.repo.findByUuid(uuid);
    if (!user) {
      const err: any = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    return user;
  }

  async createUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = data;

    const existingUser = await this.repo.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.repo.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  async getUsers() {
    return this.repo.findAll();
  }

  async getUserByUuid(uuid: string) {
    return await this.checkUserExist(uuid);
  }

  async updateUser(uuid: string, data: any) {
    const user = await this.checkUserExist(uuid);
     await this.checkEmailDuplicate(data.email);
    return this.repo.update(uuid, data);
  }

  async deleteUser(uuid: string) {
    await this.checkUserExist(uuid);


    const result = await this.repo.delete(uuid);

    return { message: "User deleted successfully" };
  }
}

export default UserService;
