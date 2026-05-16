import TicketItem from './TicketItem';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

export default class TicketList {
  constructor(container, service, modal) {
    this.container = container;
    this.service = service;
    this.modal = modal;
    this.tickets = [];
  }

  init() {
    this.render();
    this.loadTickets();
  }

  render() {
    this.container.innerHTML = ''; // Очистка контейнера, безопасно, так как мы контролируем содержимое
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = '<h1>HelpDesk</h1><button id="add-ticket-btn">Добавить тикет</button>';
    this.container.append(header);

    this.ticketListEl = document.createElement('div');
    this.ticketListEl.className = 'ticket-list';
    this.container.append(this.ticketListEl);

    document.getElementById('add-ticket-btn').addEventListener('click', () => this.showAddModal());
  }

  async loadTickets() {
    const spinner = new LoadingSpinner(this.ticketListEl);
    spinner.show();
    try {
      this.tickets = await this.service.getAllTickets();
      this.displayTickets();
    } catch (e) {
      console.error(e);
      this.ticketListEl.append('Ошибка загрузки данных');
    } finally {
      spinner.hide();
    }
  }

  displayTickets() {
    this.ticketListEl.innerHTML = '';
    this.tickets.forEach(ticket => {
      const item = new TicketItem(ticket, this.service, this);
      this.ticketListEl.append(item.element);
    });
  }

  async showAddModal() {
    this.modal.show('add', null, async (data) => {
      await this.service.createTicket(data);
      await this.loadTickets();
    });
  }

  async showEditModal(ticket) {
    const fullTicket = await this.service.getTicketById(ticket.id);
    this.modal.show('edit', fullTicket, async (data) => {
      await this.service.updateTicket(fullTicket.id, data);
      await this.loadTickets();
    });
  }

  async showDeleteModal(ticket) {
    this.modal.show('delete', ticket, async () => {
      await this.service.deleteTicket(ticket.id);
      await this.loadTickets();
    });
  }

  async toggleStatus(ticket) {
    const updated = { ...ticket, status: !ticket.status };
    await this.service.updateTicket(ticket.id, updated);
    await this.loadTickets();
  }
}