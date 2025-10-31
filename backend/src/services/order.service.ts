import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { ApiError } from "../errors/ApiError";

export const createOrder = async (
  buyerId: string,
  items: any[],
  paymentMethod: string
) => {
  if (!items || items.length === 0)
    throw ApiError.badRequest("No items in order");

  const firstProduct = await Product.findById(items[0].product);
  if (!firstProduct) throw ApiError.notFound("Product not found");
  const sellerId = firstProduct.seller;

  let total = 0;
  const orderItems = [];

  for (const i of items) {
    const p = await Product.findById(i.product);
    if (!p) continue;
    const price = p.discountPrice || p.price;
    total += price * i.quantity;
    orderItems.push({ product: p._id, quantity: i.quantity, price });
  }

  const order = await Order.create({
    buyer: buyerId,
    seller: sellerId,
    products: orderItems,
    totalAmount: total,
    paymentMethod,
    timestamps: [{ status: "Pending Approval", time: new Date() }],
  });

  return order;
};

export const getBuyerOrders = async (buyerId: string) => {
  return Order.find({ buyer: buyerId })
    .populate("products.product", "title price images")
    .populate("seller", "name email");
};
