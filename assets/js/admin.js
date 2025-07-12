// Admin panel functionality
import { SheetsAPI } from './sheets.js';

class AdminPanel {
    constructor() {
        this.sheetsAPI = new SheetsAPI();
        this.isAuthenticated = true;
        this.currentTab = 'dashboard';
        this.bookingsData = [];
        this.ordersData = [];
        this.availabilityData = [];
        this.dashboardStats = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Tab buttons
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.getAttribute('data-tab')));
        });

        // Dashboard actions
        const refreshDataBtn = document.getElementById('refresh-data');
        const exportDataBtn = document.getElementById('export-data');
        
        if (refreshDataBtn) {
            refreshDataBtn.addEventListener('click', () => this.refreshDashboardData());
        }
        
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => this.exportData());
        }

        // Data refresh buttons
        const refreshBookingsBtn = document.getElementById('refresh-bookings');
        const refreshOrdersBtn = document.getElementById('refresh-orders');
        const refreshAvailabilityBtn = document.getElementById('refresh-availability');

        if (refreshBookingsBtn) {
            refreshBookingsBtn.addEventListener('click', () => this.loadBookings());
        }
        
        if (refreshOrdersBtn) {
            refreshOrdersBtn.addEventListener('click', () => this.loadOrders());
        }
        
        if (refreshAvailabilityBtn) {
            refreshAvailabilityBtn.addEventListener('click', () => this.loadAvailability());
        }

        // Filter dropdowns
        const bookingFilter = document.getElementById('booking-filter');
        const orderFilter = document.getElementById('order-filter');

        if (bookingFilter) {
            bookingFilter.addEventListener('change', (e) => this.filterBookings(e.target.value));
        }

        if (orderFilter) {
            orderFilter.addEventListener('change', (e) => this.filterOrders(e.target.value));
        }

        // Status change modal
        const statusModal = document.getElementById('status-modal');
        const statusForm = document.getElementById('status-form');
        const closeModalBtns = document.querySelectorAll('.close');

        if (statusForm) {
            statusForm.addEventListener('submit', (e) => this.handleStatusChange(e));
        }

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    checkAuthStatus() {
        const isLoggedIn = sessionStorage.getItem('harley-admin-auth') === 'true';
        if (isLoggedIn) {
            this.isAuthenticated = true;
            this.showAdminPanel();
            this.loadDashboardData();
        } else {
            this.showLoginScreen();
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const password = document.getElementById('admin-password').value;
        const errorDiv = document.getElementById('login-error');
        
        if (!password) {
            this.showLoginError('Please enter a password');
            return;
        }

        try {
            const isAuthenticated = await this.sheetsAPI.authenticateAdmin(password);
            
            if (isAuthenticated) {
                this.isAuthenticated = true;
                sessionStorage.setItem('harley-admin-auth', 'true');
                this.showAdminPanel();
                this.loadDashboardData();
                errorDiv.style.display = 'none';
            } else {
                this.showLoginError('Invalid password');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            this.showLoginError('Authentication failed. Please try again.');
        }
    }

    showLoginError(message) {
        const errorDiv = document.getElementById('login-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('harley-admin-auth');
        this.showLoginScreen();
    }

    showLoginScreen() {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-panel').style.display = 'none';
    }

    showAdminPanel() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;

        // Load data for the active tab
        switch (tabName) {
            case 'bookings':
                this.loadBookings();
                break;
            case 'orders':
                this.loadOrders();
                break;
            case 'availability':
                this.loadAvailability();
                break;
        }
    }

    async loadDashboardData() {
        try {
            this.dashboardStats = await this.sheetsAPI.getDashboardStats();
            this.updateDashboardStats();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    updateDashboardStats() {
        const elements = {
            'total-bookings': this.dashboardStats.totalBookings || 0,
            'total-orders': this.dashboardStats.totalOrders || 0,
            'total-revenue': `${this.dashboardStats.totalRevenue || 0} EGP`,
            'active-rooms': this.dashboardStats.activeRooms || 0
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    async refreshDashboardData() {
        const refreshBtn = document.getElementById('refresh-data');
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.textContent = 'Refreshing...';
        }

        try {
            await this.loadDashboardData();
            this.showSuccess('Dashboard data refreshed');
        } catch (error) {
            this.showError('Failed to refresh dashboard data');
        } finally {
            if (refreshBtn) {
                refreshBtn.disabled = false;
                refreshBtn.textContent = 'Refresh Data';
            }
        }
    }

    async loadBookings(filter = 'all') {
        try {
            this.bookingsData = await this.sheetsAPI.getBookings(filter);
            this.renderBookingsTable(this.bookingsData);
        } catch (error) {
            console.error('Error loading bookings:', error);
            this.showError('Failed to load bookings');
        }
    }

    renderBookingsTable(bookings) {
        const tbody = document.getElementById('bookings-tbody');
        if (!tbody) return;

        if (bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No bookings found</td></tr>';
            return;
        }

        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${this.formatDate(booking.date)}</td>
                <td>${this.formatTime(booking.time)}</td>
                <td>${booking.name}</td>
                <td>${booking.phone}</td>
                <td>${this.getRoomTypeName(booking.roomType)}</td>
                <td>${booking.duration}h</td>
                <td>${booking.totalPrice} EGP</td>
                <td>
                    <div class="action-buttons-table">
                        <button class="action-btn-small edit" onclick="window.adminPanel.editBooking('${booking.id}')">Edit</button>
                        <button class="action-btn-small delete" onclick="window.adminPanel.deleteBooking('${booking.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    filterBookings(filter) {
        let filteredBookings = [...this.bookingsData];
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (filter) {
            case 'today':
                filteredBookings = filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.date);
                    return bookingDate.toDateString() === today.toDateString();
                });
                break;
            case 'upcoming':
                filteredBookings = filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.date);
                    return bookingDate >= today;
                });
                break;
            case 'past':
                filteredBookings = filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.date);
                    return bookingDate < today;
                });
                break;
        }

        this.renderBookingsTable(filteredBookings);
    }

    async loadOrders(filter = 'all') {
        try {
            this.ordersData = await this.sheetsAPI.getOrders(filter);
            this.renderOrdersTable(this.ordersData);
        } catch (error) {
            console.error('Error loading orders:', error);
            this.showError('Failed to load orders');
        }
    }

    renderOrdersTable(orders) {
        const tbody = document.getElementById('orders-tbody');
        if (!tbody) return;

        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No orders found</td></tr>';
            return;
        }

        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.orderId}</td>
                <td>${this.formatTime(order.timestamp)}</td>
                <td>${order.customerName}</td>
                <td>${order.room}</td>
                <td>${order.items.length} items</td>
                <td>${order.total} EGP</td>
                <td><span class="status-badge ${order.status}">${order.status}</span></td>
                <td>
                    <div class="action-buttons-table">
                        <button class="action-btn-small edit" onclick="window.adminPanel.updateOrderStatus('${order.orderId}', 'completed')">Complete</button>
                        <button class="action-btn-small delete" onclick="window.adminPanel.deleteOrder('${order.orderId}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    filterOrders(filter) {
        let filteredOrders = [...this.ordersData];
        const today = new Date().toDateString();

        switch (filter) {
            case 'pending':
                filteredOrders = filteredOrders.filter(order => order.status === 'pending');
                break;
            case 'completed':
                filteredOrders = filteredOrders.filter(order => order.status === 'completed');
                break;
            case 'today':
                filteredOrders = filteredOrders.filter(order => {
                    const orderDate = new Date(order.timestamp).toDateString();
                    return orderDate === today;
                });
                break;
        }

        this.renderOrdersTable(filteredOrders);
    }

    async loadAvailability() {
        try {
            this.availabilityData = await this.sheetsAPI.getAvailability();
            this.renderAvailabilityManagement();
        } catch (error) {
            console.error('Error loading availability:', error);
            this.showError('Failed to load availability data');
        }
    }

    renderAvailabilityManagement() {
        const roomTypes = ['gaming', 'vr', 'billiard'];
        
        roomTypes.forEach(type => {
            const container = document.getElementById(`admin-${type}-rooms`);
            if (container) {
                const rooms = this.availabilityData.filter(room => room.type === type);
                container.innerHTML = rooms.map(room => this.createAdminRoomCard(room)).join('');
            }
        });
    }

    createAdminRoomCard(room) {
        const statusClass = room.status.toLowerCase();
        
        return `
            <div class="admin-room-card ${statusClass}" data-room-id="${room.id}">
                <button class="change-status-btn" onclick="window.adminPanel.showStatusModal('${room.id}')">
                    Change Status
                </button>
                <div class="room-number">${room.name}</div>
                <div class="room-status">${room.status}</div>
                <div class="room-time">${this.getTimeInfo(room)}</div>
                ${room.notes ? `<div class="room-notes">${room.notes}</div>` : ''}
            </div>
        `;
    }

    showStatusModal(roomId) {
        const room = this.availabilityData.find(r => r.id === roomId);
        if (!room) return;

        const modal = document.getElementById('status-modal');
        const roomNameSpan = document.getElementById('status-room-name');
        const currentStatusSpan = document.getElementById('status-current');
        const newStatusSelect = document.getElementById('new-status');

        roomNameSpan.textContent = room.name;
        currentStatusSpan.textContent = room.status;
        newStatusSelect.value = room.status;

        modal.setAttribute('data-room-id', roomId);
        modal.style.display = 'block';
    }

    async handleStatusChange(e) {
        e.preventDefault();
        
        const modal = document.getElementById('status-modal');
        const roomId = modal.getAttribute('data-room-id');
        const newStatus = document.getElementById('new-status').value;
        const notes = document.getElementById('status-notes').value;

        try {
            await this.sheetsAPI.updateRoomStatus(roomId, newStatus, notes);
            await this.loadAvailability();
            modal.style.display = 'none';
            this.showSuccess('Room status updated successfully');
            
            // Clear form
            document.getElementById('status-notes').value = '';
        } catch (error) {
            console.error('Error updating room status:', error);
            this.showError('Failed to update room status');
        }
    }

    async deleteBooking(bookingId) {
        if (!confirm('Are you sure you want to delete this booking?')) {
            return;
        }

        try {
            await this.sheetsAPI.deleteBooking(bookingId);
            await this.loadBookings();
            this.showSuccess('Booking deleted successfully');
        } catch (error) {
            console.error('Error deleting booking:', error);
            this.showError('Failed to delete booking');
        }
    }

    async updateOrderStatus(orderId, status) {
        try {
            await this.sheetsAPI.updateOrderStatus(orderId, status);
            await this.loadOrders();
            this.showSuccess(`Order marked as ${status}`);
        } catch (error) {
            console.error('Error updating order status:', error);
            this.showError('Failed to update order status');
        }
    }

    async deleteOrder(orderId) {
        if (!confirm('Are you sure you want to delete this order?')) {
            return;
        }

        try {
            await this.sheetsAPI.deleteOrder(orderId);
            await this.loadOrders();
            this.showSuccess('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
            this.showError('Failed to delete order');
        }
    }

    async exportData() {
        const exportBtn = document.getElementById('export-data');
        if (exportBtn) {
            exportBtn.disabled = true;
            exportBtn.textContent = 'Exporting...';
        }

        try {
            const result = await this.sheetsAPI.exportData('all', 'csv');
            
            if (result.success) {
                // Create download link
                const blob = new Blob([result.data], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `harley-data-${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showSuccess('Data exported successfully');
            } else {
                throw new Error(result.error || 'Export failed');
            }
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showError('Failed to export data');
        } finally {
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.textContent = 'Export Data';
            }
        }
    }

    // Utility methods
    getRoomTypeName(roomType) {
        const names = {
            'gaming': 'Gaming Room',
            'vr': 'VR Racing Room',
            'billiard': 'Billiard Room'
        };
        return names[roomType] || roomType;
    }

    getTimeInfo(room) {
        const now = new Date();
        
        switch (room.status) {
            case 'available':
                return 'Ready for booking';
            case 'occupied':
                if (room.endTime) {
                    const endTime = new Date(room.endTime);
                    const remainingTime = endTime - now;
                    if (remainingTime > 0) {
                        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                        return `${hours}h ${minutes}m remaining`;
                    }
                }
                return 'Occupied';
            case 'maintenance':
                return room.estimatedTime || 'Under maintenance';
            default:
                return '';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    formatTime(timeString) {
        if (timeString.includes('T')) {
            // ISO timestamp
            return new Date(timeString).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            // Just time
            const time = new Date(`2000-01-01T${timeString}`);
            return time.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    showError(message) {
        if (window.harleyApp) {
            window.harleyApp.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }

    showSuccess(message) {
        if (window.harleyApp) {
            window.harleyApp.showNotification(message, 'success');
        }
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-screen') || document.getElementById('admin-panel')) {
        window.adminPanel = new AdminPanel();
    }
});

export { AdminPanel };
