// Real-time availability management
import { SheetsAPI } from './sheets.js';

class AvailabilityManager {
    constructor() {
        this.sheetsAPI = new SheetsAPI();
        this.availabilityData = [];
        this.refreshInterval = null;
        this.autoRefreshTime = 30000; // 30 seconds
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAvailability();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        const refreshBtn = document.getElementById('refresh-availability');
        const notifyBtn = document.getElementById('notify-available');
        const notificationModal = document.getElementById('notification-modal');
        const notificationForm = document.getElementById('notification-form');
        const closeModalBtns = document.querySelectorAll('.close');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshAvailability());
        }

        if (notifyBtn) {
            notifyBtn.addEventListener('click', () => this.showNotificationModal());
        }

        if (notificationForm) {
            notificationForm.addEventListener('submit', (e) => this.handleNotificationSubmit(e));
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

    async loadAvailability() {
        try {
            this.showLoadingState(true);
            this.availabilityData = await this.sheetsAPI.getAvailability();
            this.renderAvailability();
            this.updateSummary();
            this.updateLastUpdated();
        } catch (error) {
            console.error('Error loading availability:', error);
            this.showError('Failed to load availability data');
        } finally {
            this.showLoadingState(false);
        }
    }

    async refreshAvailability() {
        await this.loadAvailability();
        this.showSuccess('Availability updated');
    }

    renderAvailability() {
        const roomTypes = ['gaming', 'vr', 'billiard'];
        
        roomTypes.forEach(type => {
            const container = document.getElementById(`${type}-rooms`);
            if (container) {
                const rooms = this.availabilityData.filter(room => room.type === type);
                container.innerHTML = rooms.map(room => this.createRoomCard(room)).join('');
            }
        });
    }

    createRoomCard(room) {
        const statusClass = room.status.toLowerCase();
        const statusText = this.getStatusText(room.status);
        const timeInfo = this.getTimeInfo(room);

        return `
            <div class="room-card ${statusClass}" data-room-id="${room.id}">
                <div class="room-number">${room.name}</div>
                <div class="room-status">${statusText}</div>
                <div class="room-time">${timeInfo}</div>
                ${room.status === 'maintenance' && room.notes ? `
                    <div class="room-notes">${room.notes}</div>
                ` : ''}
            </div>
        `;
    }

    getStatusText(status) {
        const statusMap = {
            'available': 'Available',
            'occupied': 'Occupied',
            'maintenance': 'Maintenance'
        };
        return statusMap[status] || status;
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

    updateSummary() {
        const stats = this.calculateStats();
        
        const elements = {
            'total-rooms': stats.total,
            'available-rooms': stats.available,
            'occupied-rooms': stats.occupied,
            'maintenance-rooms': stats.maintenance
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    calculateStats() {
        const stats = {
            total: this.availabilityData.length,
            available: 0,
            occupied: 0,
            maintenance: 0
        };

        this.availabilityData.forEach(room => {
            stats[room.status]++;
        });

        return stats;
    }

    updateLastUpdated() {
        const lastUpdateElement = document.getElementById('last-update-time');
        if (lastUpdateElement) {
            const now = new Date();
            lastUpdateElement.textContent = now.toLocaleTimeString();
        }
    }

    showNotificationModal() {
        const modal = document.getElementById('notification-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    async handleNotificationSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const notificationData = {
            name: formData.get('name') || document.getElementById('notification-name').value,
            phone: formData.get('phone') || document.getElementById('notification-phone').value,
            roomType: formData.get('roomType') || document.getElementById('notification-room-type').value,
            timestamp: new Date().toISOString()
        };

        if (!notificationData.name || !notificationData.phone || !notificationData.roomType) {
            this.showError('Please fill in all required fields');
            return;
        }

        try {
            await this.sheetsAPI.createNotification(notificationData);
            this.showSuccess('Notification set successfully! You will be contacted when a room becomes available.');
            
            // Close modal and reset form
            document.getElementById('notification-modal').style.display = 'none';
            e.target.reset();
            
        } catch (error) {
            console.error('Error setting notification:', error);
            this.showError('Failed to set notification. Please try again.');
        }
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.loadAvailability();
        }, this.autoRefreshTime);
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    showLoadingState(isLoading) {
        const refreshBtn = document.getElementById('refresh-availability');
        if (refreshBtn) {
            if (isLoading) {
                refreshBtn.disabled = true;
                refreshBtn.textContent = 'Loading...';
            } else {
                refreshBtn.disabled = false;
                refreshBtn.textContent = 'Refresh';
            }
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

    // Public methods for external use
    getRoomStatus(roomId) {
        const room = this.availabilityData.find(r => r.id === roomId);
        return room ? room.status : 'unknown';
    }

    getAvailableRooms(type = null) {
        let rooms = this.availabilityData.filter(room => room.status === 'available');
        if (type) {
            rooms = rooms.filter(room => room.type === type);
        }
        return rooms;
    }

    getOccupiedRooms(type = null) {
        let rooms = this.availabilityData.filter(room => room.status === 'occupied');
        if (type) {
            rooms = rooms.filter(room => room.type === type);
        }
        return rooms;
    }

    // WebSocket-like functionality for real-time updates
    simulateRealTimeUpdates() {
        // This would typically connect to a WebSocket or use Server-Sent Events
        // For now, we'll use polling with the refresh interval
        this.startAutoRefresh();
    }

    // Generate mock availability data for testing
    generateMockData() {
        const rooms = [
            // Gaming rooms
            { id: 'gaming-1', name: 'Gaming Room 1', type: 'gaming' },
            { id: 'gaming-2', name: 'Gaming Room 2', type: 'gaming' },
            { id: 'gaming-3', name: 'Gaming Room 3', type: 'gaming' },
            { id: 'gaming-4', name: 'Gaming Room 4', type: 'gaming' },
            
            // VR rooms
            { id: 'vr-1', name: 'VR Room 1', type: 'vr' },
            { id: 'vr-2', name: 'VR Room 2', type: 'vr' },
            { id: 'vr-3', name: 'VR Room 3', type: 'vr' },
            
            // Billiard rooms
            { id: 'billiard-1', name: 'Billiard Room 1', type: 'billiard' },
            { id: 'billiard-2', name: 'Billiard Room 2', type: 'billiard' },
            { id: 'billiard-3', name: 'Billiard Room 3', type: 'billiard' }
        ];

        return rooms.map(room => ({
            ...room,
            status: this.getRandomStatus(),
            lastUpdated: new Date().toISOString(),
            endTime: this.getRandomEndTime(),
            notes: room.status === 'maintenance' ? 'Routine maintenance' : ''
        }));
    }

    getRandomStatus() {
        const statuses = ['available', 'occupied', 'maintenance'];
        const weights = [0.5, 0.4, 0.1]; // 50% available, 40% occupied, 10% maintenance
        const random = Math.random();
        
        let sum = 0;
        for (let i = 0; i < statuses.length; i++) {
            sum += weights[i];
            if (random < sum) {
                return statuses[i];
            }
        }
        return statuses[0];
    }

    getRandomEndTime() {
        const now = new Date();
        const endTime = new Date(now.getTime() + Math.random() * 4 * 60 * 60 * 1000); // 0-4 hours from now
        return endTime.toISOString();
    }

    // Cleanup when leaving page
    destroy() {
        this.stopAutoRefresh();
    }
}

// Initialize availability manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.availability-sections')) {
        window.availabilityManager = new AvailabilityManager();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.availabilityManager) {
        window.availabilityManager.destroy();
    }
});

// Add CSS for room status animations
const style = document.createElement('style');
style.textContent = `
    .room-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .room-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .room-card.available {
        animation: availablePulse 2s infinite;
    }
    
    .room-card.occupied {
        animation: occupiedGlow 3s infinite;
    }
    
    .room-card.maintenance {
        animation: maintenanceBlink 1s infinite;
    }
    
    @keyframes availablePulse {
        0%, 100% { border-color: var(--success-color); }
        50% { border-color: rgba(0, 255, 136, 0.5); }
    }
    
    @keyframes occupiedGlow {
        0%, 100% { border-color: var(--error-color); }
        50% { border-color: rgba(255, 68, 68, 0.5); }
    }
    
    @keyframes maintenanceBlink {
        0%, 100% { border-color: var(--warning-color); }
        50% { border-color: rgba(255, 170, 0, 0.5); }
    }
    
    .room-notes {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-top: 0.5rem;
        padding: 0.25rem;
        background: rgba(255, 170, 0, 0.1);
        border-radius: 5px;
    }
    
    .loading-overlay {
        position: relative;
    }
    
    .loading-overlay::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
        border-radius: inherit;
    }
    
    .loading-overlay::after {
        content: 'Loading...';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--primary-color);
        font-weight: bold;
        z-index: 2;
    }
`;
document.head.appendChild(style);

export { AvailabilityManager };
