export default class TicketItem {
  constructor(ticket, service, listManager) {
    this.ticket = ticket;
    this.service = service;
    this.listManager = listManager;
    this.element = this.createElement();
  }

  createElement() {
    const ticketEl = document.createElement('div');
    ticketEl.className = 'ticket-item';
    ticketEl.dataset.id = this.ticket.id;

    const statusCheckbox = document.createElement('input');
    statusCheckbox.type = 'checkbox';
    statusCheckbox.checked = this.ticket.status;
    statusCheckbox.addEventListener('change', (e) => {
      e.stopPropagation();
      this.listManager.toggleStatus(this.ticket);
    });

    const nameEl = document.createElement('span');
    nameEl.className = 'ticket-name';
    nameEl.textContent = this.ticket.name;
    nameEl.addEventListener('click', () => this.showDetails());

    const createdEl = document.createElement('span');
    createdEl.className = 'ticket-created';
    createdEl.textContent = new Date(this.ticket.created).toLocaleString();

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '✎';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.listManager.showEditModal(this.ticket);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '✖';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.listManager.showDeleteModal(this.ticket);
    });

    ticketEl.append(statusCheckbox, nameEl, createdEl, editBtn, deleteBtn);
    return ticketEl;
  }

  async showDetails() {
    try {
      const fullTicket = await this.service.getTicketById(this.ticket.id);
      let detailsEl = this.element.querySelector('.ticket-details');
      if (detailsEl) {
        detailsEl.remove(); // современный метод
        return;
      }
      detailsEl = document.createElement('div');
      detailsEl.className = 'ticket-details';
      detailsEl.textContent = fullTicket.description || 'Нет описания';
      this.element.after(detailsEl);
    } catch (e) {
      console.error(e);
    }
  }
}