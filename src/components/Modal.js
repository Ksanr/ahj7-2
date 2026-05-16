export default class Modal {
  constructor(container) {
    this.container = container;
    this.modalEl = null;
    this.onSubmit = null;
  }

  show(type, ticket, callback) {
    this.onSubmit = callback;
    this.createModal(type, ticket);
  }

  createModal(type, ticket) {
    if (this.modalEl) this.modalEl.remove();
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'modal-overlay';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    switch (type) {
      case 'add':
      case 'edit': {
        const title = document.createElement('h3');
        title.textContent = type === 'add' ? 'Добавить тикет' : 'Изменить тикет';
        modalContent.append(title);

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Краткое описание';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = (ticket && ticket.name) || '';
        modalContent.append(nameLabel, nameInput);

        const descLabel = document.createElement('label');
        descLabel.textContent = 'Подробное описание';
        const descInput = document.createElement('textarea');
        descInput.value = (ticket && ticket.description) || '';
        modalContent.append(descLabel, descInput);

        const buttons = document.createElement('div');
        buttons.className = 'modal-buttons';
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Сохранить';
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Отмена';
        buttons.append(submitBtn, cancelBtn);
        modalContent.append(buttons);

        submitBtn.addEventListener('click', () => {
          const data = {
            name: nameInput.value,
            description: descInput.value,
            status: false,
          };
          if (this.onSubmit) this.onSubmit(data);
          this.close();
        });
        cancelBtn.addEventListener('click', () => this.close());
        break;
      }
      case 'delete': {
        const confirmText = document.createElement('p');
        confirmText.textContent = `Удалить тикет "${ticket.name}"?`;
        modalContent.append(confirmText);
        const buttons = document.createElement('div');
        buttons.className = 'modal-buttons';
        const yesBtn = document.createElement('button');
        yesBtn.textContent = 'Удалить';
        const noBtn = document.createElement('button');
        noBtn.textContent = 'Отмена';
        buttons.append(yesBtn, noBtn);
        modalContent.append(buttons);

        yesBtn.addEventListener('click', () => {
          if (this.onSubmit) this.onSubmit();
          this.close();
        });
        noBtn.addEventListener('click', () => this.close());
        break;
      }
    }

    this.modalEl.append(modalContent);
    this.container.append(this.modalEl);
  }

  close() {
    if (this.modalEl) {
      this.modalEl.remove();
      this.modalEl = null;
    }
  }
}