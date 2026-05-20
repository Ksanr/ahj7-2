export default class TicketService {
  constructor() {
    this.baseUrl = process.env.API_URL;
  }

  async request(method, queryParams = '', body = null) {
    const url = `${this.baseUrl}/?method=${method}${queryParams}`;
    const options = {
        method: body ? 'POST' : 'GET',
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    if (response.status === 204) return null;
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error: ${response.status} ${errorText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async getAllTickets() {
    return await this.request('allTickets');
  }

  async getTicketById(id) {
    return await this.request('ticketById', `&id=${id}`);
  }

  async createTicket(ticket) {
    return await this.request('createTicket', '', ticket);
  }

  async updateTicket(id, data) {
    return await this.request('updateById', `&id=${id}`, data);
  }

  async deleteTicket(id) {
    return await this.request('deleteById', `&id=${id}`);
  }
}