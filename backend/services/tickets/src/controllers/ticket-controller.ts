import { BadRequestError } from '../middleware/error-handler';
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

export const fetchAllTickets = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any | Response> => {

   try {
        
        const tickets = await Ticket.find().populate("event")
        const totalTickets = await Ticket.countDocuments({});

        const searchQuery = request.query.search as any;
        const regexInit = new RegExp(searchQuery, 'i');

        const foundTickets = tickets.map(ticketData => ticketData.name.match(regexInit))
    
        return response.status(StatusCodes.OK).json({success: true, tickets, sentAt: new Date(Date.now()  )});

   } 
   
   catch(error: any) {
      if(error) {
        return next(new BadRequestError(error.message, StatusCodes.BAD_REQUEST));
      }
   }

   finally {
      console.log(`Gracefully handled error`)
   }


})

// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:ticketId
// @access    Private (Authorization Token Required)

export const getEventTicketById = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {

      const ticketId = request.params.ticketId;
      const ticket = await Ticket.findById(ticketId).populate("event") // Find the ticket and populate it with the event that it corresponds to


      return response.status(StatusCodes.OK).json({success: true, ticket, sentAt: new Date(Date.now( ))})
  } 
  
  catch(error: any) {



  }

  finally {
    return console.log(`Error Handled Gracefully`)
  }

}

// @desc      Create New Event Ticket
// @route     POST /api/v1/tickets/:eventId
// @access    Private (JWT Authorization Token Required)

export const createNewTicket = async (request: Request, response: Response, next: NextFunction): Promise<any> => {

   try {
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


export const deleteTicketByID = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const fetchPremiumTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const fetchStandardTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const fetchVipTickets = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}

export const fetchTicketsSoldLastThirtyDays = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    
}