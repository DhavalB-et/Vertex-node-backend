import axios from 'axios';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const { customer, shipping_address, line_items } = req.body;

    const orderPayload = {
      order: {
        line_items: line_items,
        customer: customer,
        shipping_address: shipping_address,
        financial_status: "paid",
        send_receipt: true,
        send_fulfillment_receipt: true,
        note: "Sample Order"
      }
    };

    const response = await axios.post(
      `https://${process.env.SHOP}.myshopify.com/admin/api/2024-01/orders.json`,
      orderPayload,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.ADMIN_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Order creation failed" });
  }
}