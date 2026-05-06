import OrderRepository from "../repository/order.repository"
import Order from "../models/order.type";

class OrderService {
  private repo: OrderRepository;

  constructor() {
    this.repo = new OrderRepository();
  }

  async createOrder(data: any) {
    const { userId, items } = data;

    let totalAmount = 0;

    for (const item of items) {
      totalAmount += item.price * item.quantity;
    }

    const orderId = await this.repo.createOrder(userId, totalAmount);

    for (const item of items) {
      await this.repo.createOrderItem(orderId, item.productId, item.quantity, item.price);
    }

    return {
      orderId,
      userId,
      totalAmount,
      status: "waiting",
      items,
    };
  }

  async getMyOrders(userId: number) {
    const orders = await this.repo.findOrdersByUser(userId);

    const ordersWithItems = await Promise.all(
      (orders as Order[]).map(async (order) => {
        const items = await this.repo.findOrderItems(order.id);

        return {
          ...order,
          items,
        };
      }),
    );

    return ordersWithItems;
  }

  async getOrderById(orderId: number) {
    const order = await this.repo.findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const items = await this.repo.findOrderItems(orderId);

    return {
      ...order,
      items,
    };
  }

  async deleteOrder(orderId: number) {
    const order = await this.repo.findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    await this.repo.deleteOrder(orderId);

    return { message: "Order deleted successfully" };
  }
}

export default OrderService;