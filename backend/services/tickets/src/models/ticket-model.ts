import mongoose from "mongoose";

interface ITicketAttributes { // Interface that stores the ticket data
    name: string,
    ticketClass: string,
    stock: number,
    description: string,
    cost: number,
    onSaleStatus: string,
    ticketSold: boolean
    saleStartsAt: Date,
    saleEndsAt: Date,
    confirmationMessage: string,
    event: mongoose.Schema.Types.ObjectId,
    issuer: mongoose.Schema.Types.ObjectId,
}

interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
   name: string,
   ticketClass: string,
   capacity: number,
   description: string,
   cost: number,
   stock: number,
   ticketSold: boolean,
   onSaleStatus: string,
   saleStartsAt: Date,
   saleEndsAt: Date,
   confirmationMessage: string,
   event: mongoose.Schema.Types.ObjectId, // The Event ID that this ticket is associated to
   issuer: mongoose.Schema.Types.ObjectId,
}

export const TicketSchema = new mongoose.Schema<ITicketDocument>({ // Ticket Data Schema Model

        name: { // Name of the ticket
            type: String,
            required: [true, "Please specify the name of this ticket"]
        },

        ticketClass: { // The ticket class. VIP ones are the most expensive and basic are the cheapest.
            type: String,
            required: [true, "Please specify the ticket class for this ticket"],
            enum: ["premium", "standard", "basic", "vip"]
        },

        stock: { // Number of tickets in stock for an event
            type: Number,
            required: [true, "Please specify how many tickets are currently in stock"],
            default: 1,
        },

        description: { // Ticket Description for an event
            type: String,
            required: [true, "Please specify the description for this ticket"]
        },

        cost: { // The ticket cost in ETHER
            type: Number,
            required: [true, "Please specify how much a ticket costs in ether"],
            default: 0.010       
         },

        onSaleStatus: { // Ticket on sale status can either be available for sale, sold out or pending
            type: String,
            enum: ["Available", "Sold Out", "Pending"],
            default: 'Pending'
        },

        saleStartsAt: {
            type: Date,
            default: Date.now
        },

        saleEndsAt: { // The timestamp at which the ticket sale ends
            type: Date,
            default: Date.now
        },

        ticketSold: { // Determines if the ticket ahs been sold or not
            type: Boolean,
            default: false
        },

        event: { // Relationship between the Ticket and Event
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
            required: [true, "Please specify the event that this ticket is related to"]
        },

        issuer: { // Relationship between the Event Ticket and the Event ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Please specify who the issuer ID of this ticket is"]
        }

}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model