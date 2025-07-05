// Google Sheets API integration
class SheetsAPI {
    constructor() {
        this.baseUrl =
            "https://script.google.com/macros/s/AKfycbywIMB5WbsUfMhnV06iJ915wJtvKwuoDHMtAIF8246ODKonIA6aEwTfwXLmBeczg54e/exec";
        this.timeout = 10000; // 10 seconds timeout
    }

    // Generic method to make requests to Google Apps Script
    async makeRequest(action, data = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    action,
                    data,
                    timestamp: Date.now(),
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            return result;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === "AbortError") {
                throw new Error("Request timed out. Please try again.");
            }

            console.error("Sheets API Error:", error);
            throw error;
        }
    }

    // Booking-related methods
    async createBooking(bookingData) {
        try {
            const result = await this.makeRequest("createBooking", bookingData);
            return result;
        } catch (error) {
            console.error("Error creating booking:", error);
            throw new Error("Failed to create booking. Please try again.");
        }
    }

    async getBookings(filter = "all") {
        try {
            const result = await this.makeRequest("getBookings", { filter });
            return result.bookings || [];
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw new Error("Failed to fetch bookings. Please try again.");
        }
    }

    async updateBookingStatus(bookingId, status) {
        try {
            const result = await this.makeRequest("updateBookingStatus", {
                bookingId,
                status,
            });
            return result;
        } catch (error) {
            console.error("Error updating booking status:", error);
            throw new Error(
                "Failed to update booking status. Please try again.",
            );
        }
    }

    async deleteBooking(bookingId) {
        try {
            const result = await this.makeRequest("deleteBooking", {
                bookingId,
            });
            return result;
        } catch (error) {
            console.error("Error deleting booking:", error);
            throw new Error("Failed to delete booking. Please try again.");
        }
    }

    // Order-related methods
    async createOrder(orderData) {
        try {
            const result = await this.makeRequest("createOrder", orderData);
            return result;
        } catch (error) {
            console.error("Error creating order:", error);
            throw new Error("Failed to create order. Please try again.");
        }
    }

    async getOrders(filter = "all") {
        try {
            const result = await this.makeRequest("getOrders", { filter });
            return result.orders || [];
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw new Error("Failed to fetch orders. Please try again.");
        }
    }

    async updateOrderStatus(orderId, status) {
        try {
            const result = await this.makeRequest("updateOrderStatus", {
                orderId,
                status,
            });
            return result;
        } catch (error) {
            console.error("Error updating order status:", error);
            throw new Error("Failed to update order status. Please try again.");
        }
    }

    async deleteOrder(orderId) {
        try {
            const result = await this.makeRequest("deleteOrder", { orderId });
            return result;
        } catch (error) {
            console.error("Error deleting order:", error);
            throw new Error("Failed to delete order. Please try again.");
        }
    }

    // Availability-related methods
    async getAvailability() {
        try {
            const result = await this.makeRequest("getAvailability");
            return result.availability || [];
        } catch (error) {
            console.error("Error fetching availability:", error);
            throw new Error("Failed to fetch availability. Please try again.");
        }
    }

    async updateRoomStatus(roomId, status, notes = "") {
        try {
            const result = await this.makeRequest("updateRoomStatus", {
                roomId,
                status,
                notes,
            });
            return result;
        } catch (error) {
            console.error("Error updating room status:", error);
            throw new Error("Failed to update room status. Please try again.");
        }
    }

    async getRoomStatus(roomId) {
        try {
            const result = await this.makeRequest("getRoomStatus", { roomId });
            return result.status || "available";
        } catch (error) {
            console.error("Error fetching room status:", error);
            throw new Error("Failed to fetch room status. Please try again.");
        }
    }

    // Notification-related methods
    async createNotification(notificationData) {
        try {
            const result = await this.makeRequest(
                "createNotification",
                notificationData,
            );
            return result;
        } catch (error) {
            console.error("Error creating notification:", error);
            throw new Error("Failed to create notification. Please try again.");
        }
    }

    async getNotifications() {
        try {
            const result = await this.makeRequest("getNotifications");
            return result.notifications || [];
        } catch (error) {
            console.error("Error fetching notifications:", error);
            throw new Error("Failed to fetch notifications. Please try again.");
        }
    }

    // Admin authentication
    async authenticateAdmin(password) {
        try {
            const result = await this.makeRequest("authenticateAdmin", {
                password,
            });
            return result.authenticated === true;
        } catch (error) {
            console.error("Error authenticating admin:", error);
            return false;
        }
    }

    // Dashboard statistics
    async getDashboardStats() {
        try {
            const result = await this.makeRequest("getDashboardStats");
            return (
                result.stats || {
                    totalBookings: 0,
                    totalOrders: 0,
                    totalRevenue: 0,
                    activeRooms: 0,
                }
            );
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            throw new Error(
                "Failed to fetch dashboard statistics. Please try again.",
            );
        }
    }

    // Export data
    async exportData(type, format = "csv") {
        try {
            const result = await this.makeRequest("exportData", {
                type,
                format,
            });
            return result;
        } catch (error) {
            console.error("Error exporting data:", error);
            throw new Error("Failed to export data. Please try again.");
        }
    }

    // Utility methods
    generateBookingId() {
        return (
            "BK" +
            Date.now().toString(36) +
            Math.random().toString(36).substr(2, 5)
        );
    }

    generateOrderId() {
        return (
            "OR" +
            Date.now().toString(36) +
            Math.random().toString(36).substr(2, 5)
        );
    }

    validateBookingData(data) {
        const required = [
            "name",
            "phone",
            "roomType",
            "date",
            "time",
            "duration",
        ];
        const missing = required.filter((field) => !data[field]);

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(", ")}`);
        }

        // Validate date is not in the past
        const bookingDate = new Date(data.date + "T" + data.time);
        if (bookingDate < new Date()) {
            throw new Error("Booking date cannot be in the past");
        }

        // Validate phone number
        if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
            throw new Error("Invalid phone number format");
        }

        return true;
    }

    validateOrderData(data) {
        const required = ["customerName", "room", "items"];
        const missing = required.filter((field) => !data[field]);

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(", ")}`);
        }

        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw new Error("Order must contain at least one item");
        }

        // Validate each item
        data.items.forEach((item, index) => {
            if (!item.name || !item.price || !item.quantity) {
                throw new Error(`Item ${index + 1} is missing required fields`);
            }
            if (item.quantity <= 0) {
                throw new Error(
                    `Item ${index + 1} quantity must be greater than 0`,
                );
            }
        });

        return true;
    }

    // Helper method to format data for Google Sheets
    formatForSheets(data) {
        // Convert all values to strings and handle null/undefined
        const formatted = {};
        for (const [key, value] of Object.entries(data)) {
            if (value === null || value === undefined) {
                formatted[key] = "";
            } else if (typeof value === "object") {
                formatted[key] = JSON.stringify(value);
            } else {
                formatted[key] = String(value);
            }
        }
        return formatted;
    }

    // Helper method to parse data from Google Sheets
    parseFromSheets(data) {
        const parsed = {};
        for (const [key, value] of Object.entries(data)) {
            if (value === "") {
                parsed[key] = null;
            } else if (key === "items" || key === "addons") {
                try {
                    parsed[key] = JSON.parse(value);
                } catch (e) {
                    parsed[key] = value;
                }
            } else {
                parsed[key] = value;
            }
        }
        return parsed;
    }

    // Retry mechanism for failed requests
    async retryRequest(action, data, maxRetries = 3) {
        let lastError;

        for (let i = 0; i < maxRetries; i++) {
            try {
                return await this.makeRequest(action, data);
            } catch (error) {
                lastError = error;

                // Don't retry on authentication errors
                if (
                    error.message.includes("authentication") ||
                    error.message.includes("unauthorized")
                ) {
                    throw error;
                }

                // Wait before retrying (exponential backoff)
                if (i < maxRetries - 1) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, Math.pow(2, i) * 1000),
                    );
                }
            }
        }

        throw lastError;
    }

    // Batch operations
    async batchUpdate(operations) {
        try {
            const result = await this.makeRequest("batchUpdate", {
                operations,
            });
            return result;
        } catch (error) {
            console.error("Error in batch update:", error);
            throw new Error(
                "Failed to perform batch update. Please try again.",
            );
        }
    }

    // Health check
    async ping() {
        try {
            const result = await this.makeRequest("ping");
            return result.status === "ok";
        } catch (error) {
            console.error("Health check failed:", error);
            return false;
        }
    }
}

export { SheetsAPI };
