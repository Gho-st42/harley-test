// Food ordering system functionality
import { SheetsAPI } from './sheets.js';

class OrderManager {
    constructor() {
        this.sheetsAPI = new SheetsAPI();
        this.cart = [];
        this.currentOrder = null;
        this.menuItems = this.getMenuItems();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderMenuItems();
        this.updateCartDisplay();
    }

    setupEventListeners() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const clearCartBtn = document.getElementById('clear-cart');
        const placeOrderBtn = document.getElementById('place-order');
        const printReceiptBtn = document.getElementById('print-receipt');
        const customerNameInput = document.getElementById('customer-name');
        const currentRoomSelect = document.getElementById('current-room');
        const closeOrderConfirmationBtn = document.getElementById('close-order-confirmation');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryFilter(e));
        });

        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }

        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => this.placeOrder());
        }

        if (printReceiptBtn) {
            printReceiptBtn.addEventListener('click', () => this.printReceipt());
        }

        if (customerNameInput) {
            customerNameInput.addEventListener('input', () => this.updateOrderButtonState());
        }

        if (currentRoomSelect) {
            currentRoomSelect.addEventListener('change', () => this.updateOrderButtonState());
        }

        if (closeOrderConfirmationBtn) {
            closeOrderConfirmationBtn.addEventListener('click', () => {
                document.getElementById('order-confirmation-modal').style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('order-confirmation-modal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    getMenuItems() {
        return [
            // Pizza
            { id: 1, name: 'Margherita Pizza', price: 65, category: 'pizza', description: 'Fresh tomato sauce, mozzarella, basil' },
            { id: 2, name: 'Pepperoni Pizza', price: 75, category: 'pizza', description: 'Pepperoni, mozzarella, tomato sauce' },
            { id: 3, name: 'Supreme Pizza', price: 85, category: 'pizza', description: 'Pepperoni, mushrooms, peppers, onions' },
            { id: 4, name: 'Chicken BBQ Pizza', price: 80, category: 'pizza', description: 'BBQ chicken, onions, BBQ sauce' },
            
            // Burgers
            { id: 5, name: 'Classic Burger', price: 45, category: 'burgers', description: 'Beef patty, lettuce, tomato, onion' },
            { id: 6, name: 'Cheese Burger', price: 55, category: 'burgers', description: 'Beef patty, cheese, lettuce, tomato' },
            { id: 7, name: 'Chicken Burger', price: 50, category: 'burgers', description: 'Grilled chicken, lettuce, mayo' },
            { id: 8, name: 'Double Burger', price: 70, category: 'burgers', description: 'Double beef patty, cheese, sauce' },
            
            // Drinks
            { id: 9, name: 'Coca Cola', price: 15, category: 'drinks', description: 'Classic cola drink' },
            { id: 10, name: 'Orange Juice', price: 20, category: 'drinks', description: 'Fresh squeezed orange juice' },
            { id: 11, name: 'Coffee', price: 25, category: 'drinks', description: 'Freshly brewed coffee' },
            { id: 12, name: 'Tea', price: 20, category: 'drinks', description: 'Hot tea varieties' },
            { id: 13, name: 'Energy Drink', price: 30, category: 'drinks', description: 'Red Bull energy drink' },
            { id: 14, name: 'Water', price: 10, category: 'drinks', description: 'Bottled water' },
            
            // Snacks
            { id: 15, name: 'Chips', price: 12, category: 'snacks', description: 'Crispy potato chips' },
            { id: 16, name: 'Nachos', price: 30, category: 'snacks', description: 'Nachos with cheese dip' },
            { id: 17, name: 'Popcorn', price: 18, category: 'snacks', description: 'Buttered popcorn' },
            { id: 18, name: 'Cookies', price: 25, category: 'snacks', description: 'Chocolate chip cookies' },
            { id: 19, name: 'Nuts Mix', price: 35, category: 'snacks', description: 'Mixed nuts and dried fruits' },
            { id: 20, name: 'Candy', price: 15, category: 'snacks', description: 'Assorted candies' }
        ];
    }

    handleCategoryFilter(e) {
        const category = e.target.getAttribute('data-category');
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter and render items
        this.renderMenuItems(category);
    }

    renderMenuItems(category = 'all') {
        const container = document.getElementById('menu-items');
        if (!container) return;

        let itemsToShow = this.menuItems;
        if (category !== 'all') {
            itemsToShow = this.menuItems.filter(item => item.category === category);
        }

        container.innerHTML = itemsToShow.map(item => `
            <div class="menu-item-card" data-id="${item.id}">
                <div class="menu-item-header">
                    <h4>${item.name}</h4>
                    <span class="menu-item-price">${item.price} EGP</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity-display" data-id="${item.id}">0</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to new elements
        this.setupMenuItemListeners();
    }

    setupMenuItemListeners() {
        const plusBtns = document.querySelectorAll('.quantity-btn.plus');
        const minusBtns = document.querySelectorAll('.quantity-btn.minus');
        const addToCartBtns = document.querySelectorAll('.add-to-cart');

        plusBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                this.updateQuantity(itemId, 1);
            });
        });

        minusBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                this.updateQuantity(itemId, -1);
            });
        });

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                this.addToCart(itemId);
            });
        });
    }

    updateQuantity(itemId, change) {
        const quantityDisplay = document.querySelector(`.quantity-display[data-id="${itemId}"]`);
        const minusBtn = document.querySelector(`.quantity-btn.minus[data-id="${itemId}"]`);
        
        if (quantityDisplay) {
            let currentQuantity = parseInt(quantityDisplay.textContent);
            let newQuantity = Math.max(0, currentQuantity + change);
            
            quantityDisplay.textContent = newQuantity;
            minusBtn.disabled = newQuantity === 0;
        }
    }

    addToCart(itemId) {
        const quantityDisplay = document.querySelector(`.quantity-display[data-id="${itemId}"]`);
        const quantity = parseInt(quantityDisplay.textContent);
        
        if (quantity === 0) {
            this.showError('Please select a quantity first');
            return;
        }

        const item = this.menuItems.find(item => item.id === itemId);
        if (!item) return;

        // Check if item already in cart
        const existingItem = this.cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...item,
                quantity: quantity
            });
        }

        // Reset quantity display
        quantityDisplay.textContent = '0';
        document.querySelector(`.quantity-btn.minus[data-id="${itemId}"]`).disabled = true;

        this.updateCartDisplay();
        this.showSuccess(`${item.name} added to cart`);
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
    }

    updateCartItemQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(itemId);
            return;
        }

        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.updateCartDisplay();
        }
    }

    clearCart() {
        this.cart = [];
        this.updateCartDisplay();
        this.showSuccess('Cart cleared');
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');

        if (!cartItems) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} EGP each</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" onclick="window.orderManager.updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="window.orderManager.updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item" onclick="window.orderManager.removeFromCart(${item.id})">✕</button>
                    </div>
                </div>
            `).join('');
        }

        // Update totals
        const subtotal = this.calculateSubtotal();
        const serviceCharge = 5;
        const total = subtotal + serviceCharge;

        if (cartSubtotal) cartSubtotal.textContent = `${subtotal} EGP`;
        if (cartTotal) cartTotal.textContent = `${total} EGP`;

        this.updateOrderButtonState();
    }

    calculateSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateOrderButtonState() {
        const placeOrderBtn = document.getElementById('place-order');
        const customerName = document.getElementById('customer-name').value.trim();
        const currentRoom = document.getElementById('current-room').value;

        if (placeOrderBtn) {
            placeOrderBtn.disabled = this.cart.length === 0 || !customerName || !currentRoom;
        }
    }

    async placeOrder() {
        const customerName = document.getElementById('customer-name').value.trim();
        const currentRoom = document.getElementById('current-room').value;
        const specialNotes = document.getElementById('special-notes').value.trim();

        if (!customerName || !currentRoom || this.cart.length === 0) {
            this.showError('Please fill in all required fields and add items to cart');
            return;
        }

        const orderData = {
            orderId: this.sheetsAPI.generateOrderId(),
            customerName,
            room: currentRoom,
            items: this.cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            subtotal: this.calculateSubtotal(),
            serviceCharge: 5,
            total: this.calculateSubtotal() + 5,
            specialNotes,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        this.showLoadingState(true);

        try {
            const result = await this.sheetsAPI.createOrder(orderData);
            
            if (result.success) {
                this.currentOrder = orderData;
                this.showOrderConfirmation(orderData);
                this.clearForm();
            } else {
                throw new Error(result.error || 'Failed to create order');
            }
        } catch (error) {
            console.error('Order error:', error);
            this.showError(error.message);
        } finally {
            this.showLoadingState(false);
        }
    }

    showOrderConfirmation(order) {
        const modal = document.getElementById('order-confirmation-modal');
        const orderSummary = document.getElementById('order-summary');
        
        if (!modal || !orderSummary) return;

        const roomNames = {
            'gaming-1': 'Gaming Room 1',
            'gaming-2': 'Gaming Room 2',
            'gaming-3': 'Gaming Room 3',
            'vr-1': 'VR Room 1',
            'vr-2': 'VR Room 2',
            'billiard-1': 'Billiard Room 1',
            'billiard-2': 'Billiard Room 2'
        };

        orderSummary.innerHTML = `
            <div class="order-summary-grid">
                <div class="summary-item">
                    <span class="label">Order ID:</span>
                    <span class="value">${order.orderId}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Customer:</span>
                    <span class="value">${order.customerName}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Room:</span>
                    <span class="value">${roomNames[order.room] || order.room}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Time:</span>
                    <span class="value">${new Date(order.timestamp).toLocaleTimeString()}</span>
                </div>
                <div class="summary-item full-width">
                    <span class="label">Items:</span>
                    <div class="items-list">
                        ${order.items.map(item => `
                            <div class="item-row">
                                <span>${item.name} x${item.quantity}</span>
                                <span>${item.total} EGP</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="summary-item">
                    <span class="label">Subtotal:</span>
                    <span class="value">${order.subtotal} EGP</span>
                </div>
                <div class="summary-item">
                    <span class="label">Service Charge:</span>
                    <span class="value">${order.serviceCharge} EGP</span>
                </div>
                <div class="summary-item">
                    <span class="label">Total:</span>
                    <span class="value highlight">${order.total} EGP</span>
                </div>
                ${order.specialNotes ? `
                <div class="summary-item full-width">
                    <span class="label">Special Notes:</span>
                    <span class="value">${order.specialNotes}</span>
                </div>
                ` : ''}
            </div>
        `;

        // Update receipt data
        this.updateReceiptData(order);

        modal.style.display = 'block';
        
        // Send success notification
        this.showSuccess('Order placed successfully!');
    }

    updateReceiptData(order) {
        const receiptElements = {
            'receipt-order-id': order.orderId,
            'receipt-date': new Date(order.timestamp).toLocaleDateString(),
            'receipt-customer': order.customerName,
            'receipt-room': order.room,
            'receipt-subtotal': `${order.subtotal} EGP`,
            'receipt-service': `${order.serviceCharge} EGP`,
            'receipt-total': `${order.total} EGP`
        };

        Object.entries(receiptElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        // Update items list
        const receiptItemsList = document.getElementById('receipt-items-list');
        if (receiptItemsList) {
            receiptItemsList.innerHTML = order.items.map(item => `
                <div class="receipt-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>${item.total} EGP</span>
                </div>
            `).join('');
        }
    }

    printReceipt() {
        window.print();
    }

    clearForm() {
        document.getElementById('customer-name').value = '';
        document.getElementById('current-room').value = '';
        document.getElementById('special-notes').value = '';
        this.clearCart();
    }

    showLoadingState(isLoading) {
        const placeOrderBtn = document.getElementById('place-order');
        if (placeOrderBtn) {
            if (isLoading) {
                placeOrderBtn.disabled = true;
                placeOrderBtn.textContent = 'Processing...';
            } else {
                placeOrderBtn.textContent = 'Place Order';
                this.updateOrderButtonState();
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
}

// Initialize order manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('menu-items')) {
        window.orderManager = new OrderManager();
    }
});

// Add CSS for order components
const style = document.createElement('style');
style.textContent = `
    .menu-item-card {
        animation: fadeInUp 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .menu-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .menu-item-description {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
    
    .order-summary-grid {
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
    
    .items-list {
        width: 100%;
        margin-top: 0.5rem;
    }
    
    .item-row {
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .item-row:last-child {
        border-bottom: none;
    }
    
    @media (max-width: 768px) {
        .order-summary-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

export { OrderManager };
