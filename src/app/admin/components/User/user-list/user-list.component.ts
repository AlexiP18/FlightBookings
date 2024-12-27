import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com' },
    { id: 4, name: 'Ana Torres', email: 'ana.torres@example.com' },
    { id: 5, name: 'Luis Gómez', email: 'luis.gomez@example.com' },
    { id: 6, name: 'Elena Martínez', email: 'elena@gmail.com' },
    // Agrega más usuarios según sea necesario.
  ];
  filteredUsers = [...this.users];
  paginatedUsers: { id: number; name: string; email: string; }[] = [];
  searchTerm = '';

  // Paginación
  currentPage = 1;
  itemsPerPage = 5;
  rowsPerPageOptions = [5, 10, 20, 30, 50];
  totalPages = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  filterUsers() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
    );
    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagination();
    }
  }

  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de dar de baja a este usuario?')) {
      this.users = this.users.filter((user) => user.id !== userId);
      this.filterUsers();
    }
  }

  updateRowsPerPage() {
    this.currentPage = 1;
    this.calculatePagination();
  }
}
