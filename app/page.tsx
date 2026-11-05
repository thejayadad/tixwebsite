import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-full w-full">
      <div className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-6 text-xl font-semibold">All Tickets</h1>

        <Suspense
          fallback={
            <p className="text-sm text-gray-500">Loading tickets...</p>
          }
        >
          <TicketList />
        </Suspense>
      </div>
    </main>
  );
}

async function TicketList() {
  const tickets = await prisma.title.findMany();

  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center">
        <h2 className="text-sm font-medium">No tickets yet</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your tickets will appear here once you create one.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <article
          key={ticket.id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <h2 className="wrap-break-word text-sm font-semibold text-gray-900">
            {ticket.message}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Ticket #{ticket.id}
          </p>
        </article>
      ))}
    </div>
  );
}