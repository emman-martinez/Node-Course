import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";

export class TicketService {
  public readonly tickets: Ticket[] = [
    {
      id: UuidAdapter.v4(),
      number: 1,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 2,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 3,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 4,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 5,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 6,
      createdAt: new Date(),
      done: false,
    },
  ];

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter((ticket) => !ticket.handleAtDesk);
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.slice(0, 4);
  }

  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket() {
    const newTicket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false,
      handleAtDesk: undefined,
      handleAt: undefined,
    };

    this.tickets.push(newTicket);

    return newTicket;
  }

  public drawTicket(desk: string) {
    const pendingTickets = this.pendingTickets;

    if (pendingTickets.length === 0) {
      return {
        status: "error",
        message: "No pending tickets to handle.",
      };
    }

    const ticket = pendingTickets[0];
    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    return { status: "ok", ticket };
  }

  public completeTicket(id: string) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      return {
        status: "error",
        message: "Ticket not found.",
      };
    }

    this.tickets.map((t) => {
      if (t.id === id) {
        t.done = true;
      }

      return t;
    });

    return { status: "ok", ticket };
  }
}
