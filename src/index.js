import './style.css';
import TicketService from './api/TicketService';
import TicketList from './components/TicketList';
import Modal from './components/Modal';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const ticketService = new TicketService('http://localhost:7070');
  const modal = new Modal(app);
  const ticketList = new TicketList(app, ticketService, modal);
  ticketList.init();
});