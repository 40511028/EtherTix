import mongoose, { Model } from "mongoose";

type TicketTypes = {
    
}
interface ITicketAttributes {
    ticket: Object
}

interface ITicketDocument extends mongoose.Model<ITicketAttributes> {
    ticket: Object
}

const TicketSchema = new mongoose.Schema<ITicketDocument>({ // Ticket Data Schema Model

    ticket: { // Ticket Object

        name: {
            type: String
        },

        capacity: { // Number of tickets for sale (0, 1, 2,3)
            type: String,
            required: [true, "Please specify the number of tickets available for sale"],
            default: null
        },

        minimumQuantityPurchase: {

        },

        maximumQuantityPurchase: {

        },

        description: {
            type: String,
            required: [true, "Provide a valid description for the ticket"]
        },

        cost: { // The ticket cost in ETHER
            type: String,
            required: [true, "Please specify how much the ticket costs"],
            default: "0.013"
        },

        isFree: {
            type: Boolean,
            required: [true, "Please specify if the ticket is free or not"],
            default: false
        },

        deliveryMethods: { // Methods of ticket delivery
            type: String,
            required: [true, "Please specify the type of delivery method"],
            default: "SMS",
            enum: ["Will Call", "SMS", "Electronic", "E-mail"]
        },

        onSaleStatus: {
            type: String
        },

        saleStartsAt: {
            type: Date,
            default: Date.now
        },

        saleEndsAt: {

        },

        confirmationMessage: {
            type: String,
            required: [true, "Please specify the confirmation message for the purchased event ticket"]
        },

        ticketSold: {
            type: Boolean,
            default: false,
            required: [true, "Please specify if the ticket has been sold or not"]
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }


    }
}, {
    timestamps: true
});

const Ticket = mongoose.model<ITicketDocument>("Ticket", TicketSchema);
export {Ticket} // Export the model