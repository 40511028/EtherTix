import { BadRequestError } from './../../../authentication/src/middleware/error-handler';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket-model';
import asyncHandler from 'express-async-handler'

declare namespace Express {
    export interface Request {
        user: any;
        body: any;
        session: any
    }

  }

// @desc      Fetch All Tickets
// @route     GET /api/v1/tickets
// @access    Private (Authorization Token Required)

export const getAllEventTickets = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

   try {

        const totalTickets = await Ticket.countDocuments({});
        const tickets = await Ticket.find().populate("event")
    
        return response.status(StatusCodes.OK).json({success: true, tickets, totalTickets, sentAt: new Date(Date.now()  )});

   } 
   
   catch(error: any) {

       if(error) {
         return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
       }


   }

   finally {
     return console.log(`Gracefully handled error`)
   }


})

// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:ticketId
// @access    Private (Authorization Token Required)

export const getEventTicketById = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {

    const ticketId = request.params.ticketId;
    
    if(!ticketId) {
        return next(new BadRequestError("No ticket found with that ID", StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, message: "Single Event Ticket", sentAt: new Date(Date.now( ))})
  } 
  
  catch(error: any) {

    if(error) {
        return next(new BadRequestError(error, StatusCodes.BAD_REQUEST));
    }

  }

  finally {
    return console.log(`Error Handled Gracefully`)
  }

}

// @desc      Create New Event Ticket
// @route     POST /api/v1/tickets/:eventId
// @access    Private (JWT Authorization Token Required)

export const createNewEventTicket = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
   try {
        const eventId = request.params.id; // Get the event ID
        const body = request.body;
   } 
   
   catch(error: any) {

   }


}

// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)

export const editTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const ticketId = request.params.ticketId;
}

// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteAllTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

}

// @desc      Remove An Event Ticket By ID
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}