import db from "../config/mySql";
import {v4 as uuidv4} from "uuid";

class UserRepository {
  async create(data: any) {
    const { username, email, password } = data;
     const uuid = uuidv4();

    const [result]: any = await db.query(
      "INSERT INTO users (uuid, username, email, password) VALUES (?, ?, ?, ?)",
      [uuid, username, email, password],
    );

    return {
      uuid: uuid,
      username,
      email,
    };
  }

  async findAll() {
    const [rows]: any = await db.query("SELECT uuid, username, email FROM users");
    return rows;
  }

  async findByUuid(uuid: string) {
    const [rows]: any = await db.query(
      "SELECT uuid, username, email FROM users WHERE uuid = ?",
      [uuid],
    );
    return rows[0];
  }

  async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async update(uuid: string, data: any) {
    const { username, email } = data;

    await db.query("UPDATE users SET username = ?, email = ? WHERE uuid = ?", [
      username,
      email,
      uuid,
    ]);

    const [rows]: any = await db.query(
      "SELECT uuid, username, email FROM users WHERE uuid = ?",
      [uuid],
    );

    return rows[0];
  }

  async delete(uuid: string) {
    const [result]: any = await db.query("DELETE FROM users WHERE uuid = ?", [
      uuid,
    ]);

    return result;
  }
}

export default UserRepository;