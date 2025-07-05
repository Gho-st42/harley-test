// Booking form functionality
import { SheetsAPI } from './sheets.js';

class BookingManager {
    constructor() {
        this.sheetsAPI = new SheetsAPI();
        this.currentBooking = null;
        this.priceCalculator = new PriceCalculator();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateMinDate();
    }

    setupEventListeners() {
        const form = document.getElementById('booking-form');
        const roomTypeSelect = document.getElementById('room-type');
        const durationSelect = document.getElementById('duration');
        const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
        const confirmationModal = document.getElementById('confirmation-modal');
        const closeConfirmationBtn = document.getElementById('close-confirmation');

        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        if (roomTypeSelect) {
            roomTypeSelect.addEventListener('change', () => this.updatePricing());
        }

        if (durationSelect) {
            durationSelect.addEventListener('change', () => this.updatePricing());
        }

        addonCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updatePricing());
        });

        if (closeConfirmationBtn) {
            closeConfirmationBtn.addEventListener('click', () => {
                confirmationModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }

    updateMinDate() {
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const bookingData = this.collectFormData(formData);

        if (!this.validateBookingData(bookingData)) {
            return;
        }

        this.showLoadingState(true);

        try {
            // Validate with Google Sheets API
            this.sheetsAPI.validateBookingData(bookingData);
            
            // Create booking
            const result = await this.sheetsAPI.createBooking(bookingData);
            
            if (result.success) {
                this.currentBooking = { ...bookingData, id: result.bookingId };
                this.showConfirmation(this.currentBooking);
                e.target.reset();
                this.updatePricing();
            } else {
                throw new Error(result.error || 'Failed to create booking');
            }
        } catch (error) {
            console.error('Booking error:', error);
            this.showError(error.message);
        } finally {
            this.showLoadingState(false);
        }
    }

    collectFormData(formData) {
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            roomType: formData.get('roomType'),
            date: formData.get('date'),
            time: formData.get('time'),
            duration: parseInt(formData.get('duration')),
            notes: formData.get('notes') || '',
            addons: [],
            timestamp: new Date().toISOString()
        };

        // Collect addons
        const addonCheckboxes = document.querySelectorAll('input[name="addons"]:checked');
        addonCheckboxes.forEach(checkbox => {
            data.addons.push(checkbox.value);
        });

        // Calculate pricing
        const pricing = this.priceCalculator.calculateTotal(data.roomType, data.duration, data.addons);
        data.basePrice = pricing.basePrice;
        data.addonsPrice = pricing.addonsPrice;
        data.totalPrice = pricing.total;

        return data;
    }

    validateBookingData(data) {
        const errors = [];

        // Required field validation
        if (!data.name.trim()) errors.push('Name is required');
        if (!data.phone.trim()) errors.push('Phone number is required');
        if (!data.roomType) errors.push('Room type is required');
        if (!data.date) errors.push('Date is required');
        if (!data.time) errors.push('Time is required');
        if (!data.duration) errors.push('Duration is required');

        // Phone validation
        if (data.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
            errors.push('Please enter a valid phone number');
        }

        // Date validation
        if (data.date && data.time) {
            const bookingDateTime = new Date(data.date + 'T' + data.time);
            const now = new Date();
            const minBookingTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

            if (bookingDateTime < minBookingTime) {
                errors.push('Booking must be at least 2 hours in advance');
            }
        }

        // Business hours validation
        if (data.time) {
            const time = data.time.split(':');
            const hours = parseInt(time[0]);
            const minutes = parseInt(time[1]);
            const totalMinutes = hours * 60 + minutes;

            const openTime = 10 * 60; // 10:00 AM
            const closeTime = 2 * 60; // 2:00 AM (next day)

            if (totalMinutes < openTime || totalMinutes > (24 * 60 - 60)) { // Allow until 11:59 PM
                errors.push('Please select a time between 10:00 AM and 11:59 PM');
            }
        }

        if (errors.length > 0) {
            this.showError(errors.join('\n'));
            return false;
        }

        return true;
    }

    updatePricing() {
        const roomType = document.getElementById('room-type').value;
        const duration = parseInt(document.getElementById('duration').value) || 0;
        const addonCheckboxes = document.querySelectorAll('input[name="addons"]:checked');
        const addons = Array.from(addonCheckboxes).map(cb => cb.value);

        const pricing = this.priceCalculator.calculateTotal(roomType, duration, addons);

        // Update price display
        document.getElementById('base-price').textContent = `${pricing.basePrice} EGP`;
        document.getElementById('addons-price').textContent = `${pricing.addonsPrice} EGP`;
        document.getElementById('total-price').textContent = `${pricing.total} EGP`;

        // Update submit button state
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = !roomType || !duration;
        }
    }

    showConfirmation(booking) {
        const modal = document.getElementById('confirmation-modal');
        const bookingSummary = document.getElementById('booking-summary');
        
        if (!modal || !bookingSummary) return;

        const roomTypes = {
            'gaming': 'Gaming Room',
            'vr': 'VR Racing Room',
            'billiard': 'Billiard Room'
        };

        const addonsText = booking.addons.length > 0 ? booking.addons.map(addon => {
            const addonNames = {
                'food': 'Food Package',
                'drinks': 'Drinks Package',
                'extended': 'Extended Hours'
            };
            return addonNames[addon] || addon;
        }).join(', ') : 'None';

        bookingSummary.innerHTML = `
            <div class="booking-summary-grid">
                <div class="summary-item">
                    <span class="label">Booking ID:</span>
                    <span class="value">${booking.id}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Name:</span>
                    <span class="value">${booking.name}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Phone:</span>
                    <span class="value">${booking.phone}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Room Type:</span>
                    <span class="value">${roomTypes[booking.roomType]}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Date:</span>
                    <span class="value">${this.formatDate(booking.date)}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Time:</span>
                    <span class="value">${this.formatTime(booking.time)}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Duration:</span>
                    <span class="value">${booking.duration} hour${booking.duration > 1 ? 's' : ''}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Add-ons:</span>
                    <span class="value">${addonsText}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Total Price:</span>
                    <span class="value highlight">${booking.totalPrice} EGP</span>
                </div>
                ${booking.notes ? `
                <div class="summary-item full-width">
                    <span class="label">Notes:</span>
                    <span class="value">${booking.notes}</span>
                </div>
                ` : ''}
            </div>
        `;

        modal.style.display = 'block';
        
        // Send confirmation notification
        if (window.harleyApp) {
            window.harleyApp.showNotification('Booking confirmed successfully!', 'success');
        }
    }

    showError(message) {
        if (window.harleyApp) {
            window.harleyApp.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }

    showLoadingState(isLoading) {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm Booking';
            }
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTime(timeString) {
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Price calculator utility
class PriceCalculator {
    constructor() {
        this.basePrices = {
            'gaming': 50,
            'vr': 75,
            'billiard': 40
        };

        this.addonPrices = {
            'food': 50,
            'drinks': 30,
            'extended': 20 // per hour
        };
    }

    calculateTotal(roomType, duration, addons = []) {
        const basePrice = this.calculateBasePrice(roomType, duration);
        const addonsPrice = this.calculateAddonsPrice(addons, duration);
        
        return {
            basePrice,
            addonsPrice,
            total: basePrice + addonsPrice
        };
    }

    calculateBasePrice(roomType, duration) {
        const hourlyRate = this.basePrices[roomType] || 0;
        return hourlyRate * duration;
    }

    calculateAddonsPrice(addons, duration) {
        let total = 0;
        
        addons.forEach(addon => {
            if (addon === 'extended') {
                total += this.addonPrices[addon] * duration;
            } else {
                total += this.addonPrices[addon] || 0;
            }
        });

        return total;
    }
}

// Initialize booking manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('booking-form')) {
        window.bookingManager = new BookingManager();
    }
});

// Add CSS for booking summary
const style = document.createElement('style');
style.textContent = `
    .booking-summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .summary-item.full-width {
        grid-column: 1 / -1;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .summary-item .label {
        font-weight: 600;
        color: var(--text-secondary);
    }
    
    .summary-item .value {
        font-weight: 700;
        color: var(--text-color);
    }
    
    .summary-item .value.highlight {
        color: var(--primary-color);
        font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
        .booking-summary-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

export { BookingManager, PriceCalculator };
