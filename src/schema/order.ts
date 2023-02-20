import { Schema } from "mongoose";

//Create orderschema interface and associate type here
const OrderSchema = new Schema({
  partnerId: Schema.Types.ObjectId,
  lineItems: [{ type: Schema.Types.ObjectId, ref: "LineItem" }],
  quotations: [{ type: Schema.Types.ObjectId, ref: "Quotation" }],
  execution: Schema.Types.ObjectId,
  totalPrice: { type: Number, required: true },
  status: { type: Number, required: true },
});
