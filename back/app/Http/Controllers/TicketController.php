<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function findAppartmentTickets(Request $request)
    {
        $user = Auth::user();
        $appartment = $user->appartment;

        $residents = User::where('appartment_id', $appartment->id)->get();

        $all_tickets = [];
        foreach ($residents as $resident) {
            $resident_tickets = Ticket::where('creator_id', $resident->id)->get();
            foreach ($resident_tickets as $ticket) {
                $ticket['creator'] = $ticket->creator;
            }
            $all_tickets = array_merge($all_tickets, $resident_tickets->toArray());
        }

        return response()->json([
            'tickets' => $all_tickets,
        ]);
    }

    public function createTicket(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'amount' => 'required|numeric',
            'expiration_date' => 'optional|date'
        ]);

        $user = Auth::user();
        $ticket = Ticket::create([
            'name' => $request->name,
            'amount' => $request->amount,
            'expiration_date' => $request->expiration_date,
            'creator_id' => $user->id
        ]);
        $ticket['creator'] = $ticket->creator;

        return response()->json([
            'ticket' => $ticket
        ]);
    }

    public function deleteTicket(Request $request, $ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $ticket->delete();

        return response()->json([], 204);
    }
}

