import UserRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";

class UserService {
  private repo = new UserRepository();

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

  async getUserById(id: string) {
    const user = await this.repo.findById(id);

    if (!user) throw new Error("User not found");

    return user;
  }

  async updateUser(id: string, data: any) {
    const user = await this.repo.findById(id);

    if (!user) throw new Error("User not found");

    return this.repo.update(id, data);
  }

  async deleteUser(id: string) {
    const user = await this.repo.findById(id);

    if (!user) throw new Error("User not found");

    await this.repo.delete(id);

    return { message: "User deleted successfully" };
  }
}

export default UserService;