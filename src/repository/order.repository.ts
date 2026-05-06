import db from "../config/mySql.js";

export type Order = {
  id: number;
  user_id: number;
  total_amount: number;
};

class OrderRepository {
  async createOrder(userId: number, totalAmount: number): Promise<number> {
    const [result]: any = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, totalAmount],
    );

    return result.insertId;
  }

  async createOrderItem(
    orderId: number,
    productId: string,
    quantity: number,
    price: number,
  ): 
  Promise<void> {
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price],
    );
  }

  async findOrdersByUser(userId: number): Promise<Order[]> {
    const [rows]: any = await db.query(
      "SELECT * FROM orders WHERE user_id = ?",
      [userId],
    );

    return rows;
  }

  async findOrderItems(orderId: number): Promise<any[]> {
    const [rows]: any = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [orderId],
    );

    return rows;
  }

  async findOrderById(orderId: number): Promise<Order | null> {
    const [rows]: any = await db.query("SELECT * FROM orders WHERE id = ?", [
      orderId,
    ]);

    return rows[0] || null;
  }

  async deleteOrder(orderId: number): Promise<{ affectedRows: number }> {
    await db.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);

    const [result]: any = await db.query("DELETE FROM orders WHERE id = ?", [
      orderId,
    ]);

    return result;
  }
}

export default OrderRepository;