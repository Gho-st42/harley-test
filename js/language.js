// Language management for bilingual support (English/Arabic)
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-services': 'Services',
                'nav-book': 'Book',
                'nav-orders': 'Orders',
                'nav-availability': 'Availability',
                
                // Hero Section
                'hero-title': 'The Best Gaming Café in Upper Egypt',
                'race': 'Race',
                'chill': 'Chill',
                'game': 'Game',
                'compete': 'Compete',
                'book-now': 'Book Now',
                'order-food': 'Order Food',
                'check-availability': 'Check Availability',
                
                // Features
                'why-choose': 'Why Choose Harley?',
                'feature-gaming': 'Premium Gaming',
                'feature-gaming-desc': 'Latest gaming hardware and comfortable private rooms',
                'feature-vr': 'VR Racing',
                'feature-vr-desc': 'Immersive VR racing simulation experience',
                'feature-billiard': 'Billiardo',
                'feature-billiard-desc': 'Professional billiard tables for competitive play',
                'feature-food': 'Food & Drinks',
                'feature-food-desc': 'Delicious food and refreshing drinks delivered to your room',
                
                // Services
                'services-title': 'Our Services',
                'learn-more': 'Learn More',
                'view-menu': 'View Menu',
                'service-gaming-title': 'Private Gaming Rooms',
                'service-gaming-desc': 'Experience gaming like never before in our premium private rooms equipped with the latest gaming hardware.',
                'service-vr-title': 'VR Racing Simulation',
                'service-vr-desc': 'Immerse yourself in high-speed racing with our state-of-the-art VR racing simulators.',
                'service-billiard-title': 'Billiardo',
                'service-billiard-desc': 'Professional billiard tables for competitive play and casual enjoyment with friends.',
                'service-food-title': 'Food & Drinks Menu',
                'service-food-desc': 'Delicious food and refreshing drinks delivered right to your gaming room.',
                
                // Features Tags
                'feature-pc': 'High-End PCs',
                'feature-console': 'Console Gaming',
                'feature-comfort': 'Comfortable Seating',
                'feature-vr-headset': 'VR Headsets',
                'feature-racing-wheel': 'Racing Wheels',
                'feature-multiplayer': 'Multiplayer',
                'feature-pro-tables': 'Professional Tables',
                'feature-equipment': 'Quality Equipment',
                'feature-lighting': 'Perfect Lighting',
                'feature-pizza': 'Pizza',
                'feature-burgers': 'Burgers',
                'feature-drinks': 'Drinks',
                'feature-snacks': 'Snacks',
                
                // Pricing
                'price-gaming': '50 EGP/hour',
                'price-vr': '75 EGP/hour',
                'price-billiard': '40 EGP/hour',
                'price-food': 'Starting from 25 EGP',
                
                // Booking
                'book-title': 'Book a Room',
                'label-name': 'Name',
                'label-phone': 'Phone',
                'label-room-type': 'Room Type',
                'label-date': 'Date',
                'label-time': 'Time',
                'label-duration': 'Duration',
                'label-addons': 'Add-ons',
                'label-notes': 'Special Notes',
                'select-room': 'Select Room Type',
                'gaming-room': 'Gaming Room',
                'vr-room': 'VR Racing Room',
                'billiard-room': 'Billiard Room',
                'select-duration': 'Select Duration',
                'duration-1': '1 Hour',
                'duration-2': '2 Hours',
                'duration-3': '3 Hours',
                'duration-4': '4 Hours',
                'duration-5': '5 Hours',
                'duration-6': '6+ Hours',
                'addon-food': 'Food Package (+50 EGP)',
                'addon-drinks': 'Drinks Package (+30 EGP)',
                'addon-extended': 'Extended Hours (+20 EGP/hour)',
                'price-summary': 'Price Summary',
                'base-price': 'Base Price:',
                'addons-price': 'Add-ons:',
                'total-price': 'Total:',
                'confirm-booking': 'Confirm Booking',
                'booking-info-title': 'Booking Information',
                'pricing-title': 'Pricing',
                'gaming-price': 'Gaming Room: 50 EGP/hour',
                'vr-price': 'VR Racing: 75 EGP/hour',
                'billiard-price': 'Billiard: 40 EGP/hour',
                'policies-title': 'Policies',
                'policy-advance': 'Advance booking required',
                'policy-cancellation': 'Free cancellation 2 hours before',
                'policy-payment': 'Payment upon arrival',
                'policy-id': 'Valid ID required',
                'contact-title': 'Contact',
                'booking-confirmed': 'Booking Confirmed!',
                'booking-success-message': 'Your booking has been successfully submitted. You will receive a confirmation call within 30 minutes.',
                'booking-details-title': 'Booking Details',
                'close': 'Close',
                
                // Orders
                'order-title': 'Order Food & Drinks',
                'all-items': 'All Items',
                'pizza': 'Pizza',
                'burgers': 'Burgers',
                'drinks': 'Drinks',
                'snacks': 'Snacks',
                'your-order': 'Your Order',
                'clear-cart': 'Clear',
                'empty-cart': 'Your cart is empty',
                'subtotal': 'Subtotal:',
                'service-charge': 'Service Charge:',
                'total': 'Total:',
                'customer-details': 'Customer Details',
                'label-room': 'Current Room',
                'gaming-room-1': 'Gaming Room 1',
                'gaming-room-2': 'Gaming Room 2',
                'gaming-room-3': 'Gaming Room 3',
                'vr-room-1': 'VR Room 1',
                'vr-room-2': 'VR Room 2',
                'billiard-room-1': 'Billiard Room 1',
                'billiard-room-2': 'Billiard Room 2',
                'place-order': 'Place Order',
                'order-confirmed': 'Order Confirmed!',
                'order-success-message': 'Your order has been placed successfully. Expected delivery time: 15-20 minutes.',
                'order-details-title': 'Order Details',
                'print-receipt': 'Print Receipt',
                
                // Menu Items
                'menu-title': 'Food & Drinks Menu',
                'menu-pizza': 'Pizza',
                'menu-burgers': 'Burgers',
                'menu-drinks': 'Drinks',
                'menu-snacks': 'Snacks',
                'margherita': 'Margherita Pizza',
                'pepperoni': 'Pepperoni Pizza',
                'supreme': 'Supreme Pizza',
                'classic-burger': 'Classic Burger',
                'cheese-burger': 'Cheese Burger',
                'chicken-burger': 'Chicken Burger',
                'coca-cola': 'Coca Cola',
                'orange-juice': 'Orange Juice',
                'coffee': 'Coffee',
                'chips': 'Chips',
                'nachos': 'Nachos',
                'popcorn': 'Popcorn',
                
                // Availability
                'availability-title': 'Real-Time Availability',
                'last-updated': 'Last Updated:',
                'refresh': 'Refresh',
                'available': 'Available',
                'occupied': 'Occupied',
                'maintenance': 'Maintenance',
                'gaming-rooms': 'Gaming Rooms',
                'vr-rooms': 'VR Racing Rooms',
                'billiard-rooms': 'Billiard Rooms',
                'summary-title': 'Summary',
                'total-rooms': 'Total Rooms',
                'available-rooms': 'Available',
                'occupied-rooms': 'Occupied',
                'maintenance-rooms': 'Maintenance',
                'quick-actions': 'Quick Actions',
                'notify-available': 'Notify When Available',
                'notification-title': 'Availability Notification',
                'notification-desc': 'Get notified when a room becomes available',
                'set-notification': 'Set Notification',
                
                // Admin
                'admin-login': 'Admin Login',
                'label-password': 'Password',
                'login': 'Login',
                'login-error': 'Invalid password',
                'logout': 'Logout',
                'dashboard': 'Dashboard',
                'bookings': 'Bookings',
                'orders': 'Orders',
                'manage-availability': 'Manage Availability',
                'total-bookings': 'Total Bookings',
                'total-orders': 'Total Orders',
                'total-revenue': 'Total Revenue',
                'active-rooms': 'Active Rooms',
                'refresh-data': 'Refresh Data',
                'export-data': 'Export Data',
                'all-bookings': 'All Bookings',
                'today': 'Today',
                'upcoming': 'Upcoming',
                'past': 'Past',
                'all-orders': 'All Orders',
                'pending': 'Pending',
                'completed': 'Completed',
                'table-date': 'Date',
                'table-time': 'Time',
                'table-customer': 'Customer',
                'table-phone': 'Phone',
                'table-room': 'Room',
                'table-duration': 'Duration',
                'table-total': 'Total',
                'table-actions': 'Actions',
                'table-order-id': 'Order ID',
                'table-items': 'Items',
                'table-status': 'Status',
                'change-status': 'Change Room Status',
                'room': 'Room',
                'current-status': 'Current Status',
                'new-status': 'New Status',
                'notes': 'Notes',
                'update-status': 'Update Status',
                
                // Visit Us Section
                'visit-us': 'Visit Us Now',
                'location-title': 'Find Us Here',
                'location-desc': 'Located in the heart of Upper Egypt, we\'re easy to find and always ready to welcome you to the ultimate gaming experience.',
                'address': 'Upper Egypt, Gaming District',
                'hours': 'Daily: 10:00 AM - 2:00 AM',
                
                // Footer
                'footer-desc': 'The ultimate gaming experience in Upper Egypt',
                'footer-contact': 'Contact',
                'footer-hours': 'Hours',
                'footer-hours-text': 'Daily: 10:00 AM - 2:00 AM'
            },
            ar: {
                // Navigation
                'nav-home': 'الرئيسية',
                'nav-services': 'الخدمات',
                'nav-book': 'احجز',
                'nav-orders': 'الطلبات',
                'nav-availability': 'التوفر',
                
                // Hero Section
                'hero-title': 'أفضل مقهى ألعاب في صعيد مصر',
                'race': 'سباق',
                'chill': 'استرخاء',
                'game': 'لعب',
                'compete': 'تنافس',
                'book-now': 'احجز الآن',
                'order-food': 'اطلب طعام',
                'check-availability': 'تحقق من التوفر',
                
                // Features
                'why-choose': 'لماذا تختار هارلي؟',
                'feature-gaming': 'ألعاب متميزة',
                'feature-gaming-desc': 'أحدث معدات الألعاب وغرف خاصة مريحة',
                'feature-vr': 'سباق الواقع الافتراضي',
                'feature-vr-desc': 'تجربة محاكاة سباق غامرة بالواقع الافتراضي',
                'feature-billiard': 'بلياردو',
                'feature-billiard-desc': 'طاولات بلياردو احترافية للعب التنافسي',
                'feature-food': 'طعام ومشروبات',
                'feature-food-desc': 'طعام لذيذ ومشروبات منعشة تُوصل إلى غرفتك',
                
                // Services
                'services-title': 'خدماتنا',
                'learn-more': 'اعرف المزيد',
                'view-menu': 'عرض القائمة',
                'service-gaming-title': 'غرف الألعاب الخاصة',
                'service-gaming-desc': 'اختبر الألعاب كما لم تفعل من قبل في غرفنا الخاصة المتميزة المجهزة بأحدث معدات الألعاب.',
                'service-vr-title': 'محاكاة سباق الواقع الافتراضي',
                'service-vr-desc': 'انغمس في سباق عالي السرعة مع أجهزة محاكاة سباق الواقع الافتراضي الحديثة.',
                'service-billiard-title': 'بلياردو',
                'service-billiard-desc': 'طاولات بلياردو احترافية للعب التنافسي والاستمتاع العادي مع الأصدقاء.',
                'service-food-title': 'قائمة الطعام والمشروبات',
                'service-food-desc': 'طعام لذيذ ومشروبات منعشة تُوصل مباشرة إلى غرفة الألعاب.',
                
                // Features Tags
                'feature-pc': 'أجهزة كمبيوتر متطورة',
                'feature-console': 'ألعاب الكونسول',
                'feature-comfort': 'جلوس مريح',
                'feature-vr-headset': 'نظارات الواقع الافتراضي',
                'feature-racing-wheel': 'عجلات السباق',
                'feature-multiplayer': 'متعدد اللاعبين',
                'feature-pro-tables': 'طاولات احترافية',
                'feature-equipment': 'معدات عالية الجودة',
                'feature-lighting': 'إضاءة مثالية',
                'feature-pizza': 'بيتزا',
                'feature-burgers': 'برجر',
                'feature-drinks': 'مشروبات',
                'feature-snacks': 'وجبات خفيفة',
                
                // Pricing
                'price-gaming': '50 جنيه/ساعة',
                'price-vr': '75 جنيه/ساعة',
                'price-billiard': '40 جنيه/ساعة',
                'price-food': 'يبدأ من 25 جنيه',
                
                // Booking
                'book-title': 'احجز غرفة',
                'label-name': 'الاسم',
                'label-phone': 'الهاتف',
                'label-room-type': 'نوع الغرفة',
                'label-date': 'التاريخ',
                'label-time': 'الوقت',
                'label-duration': 'المدة',
                'label-addons': 'إضافات',
                'label-notes': 'ملاحظات خاصة',
                'select-room': 'اختر نوع الغرفة',
                'gaming-room': 'غرفة ألعاب',
                'vr-room': 'غرفة سباق VR',
                'billiard-room': 'غرفة بلياردو',
                'select-duration': 'اختر المدة',
                'duration-1': 'ساعة واحدة',
                'duration-2': 'ساعتان',
                'duration-3': '3 ساعات',
                'duration-4': '4 ساعات',
                'duration-5': '5 ساعات',
                'duration-6': '6+ ساعات',
                'addon-food': 'حزمة طعام (+50 جنيه)',
                'addon-drinks': 'حزمة مشروبات (+30 جنيه)',
                'addon-extended': 'ساعات إضافية (+20 جنيه/ساعة)',
                'price-summary': 'ملخص الأسعار',
                'base-price': 'السعر الأساسي:',
                'addons-price': 'الإضافات:',
                'total-price': 'المجموع:',
                'confirm-booking': 'تأكيد الحجز',
                'booking-info-title': 'معلومات الحجز',
                'pricing-title': 'الأسعار',
                'gaming-price': 'غرفة الألعاب: 50 جنيه/ساعة',
                'vr-price': 'سباق VR: 75 جنيه/ساعة',
                'billiard-price': 'بلياردو: 40 جنيه/ساعة',
                'policies-title': 'السياسات',
                'policy-advance': 'الحجز المسبق مطلوب',
                'policy-cancellation': 'إلغاء مجاني قبل ساعتين',
                'policy-payment': 'الدفع عند الوصول',
                'policy-id': 'هوية صالحة مطلوبة',
                'contact-title': 'اتصل بنا',
                'booking-confirmed': 'تم تأكيد الحجز!',
                'booking-success-message': 'تم تقديم حجزك بنجاح. سوف تتلقى مكالمة تأكيد خلال 30 دقيقة.',
                'booking-details-title': 'تفاصيل الحجز',
                'close': 'إغلاق',
                
                // Orders
                'order-title': 'اطلب طعام ومشروبات',
                'all-items': 'جميع العناصر',
                'pizza': 'بيتزا',
                'burgers': 'برجر',
                'drinks': 'مشروبات',
                'snacks': 'وجبات خفيفة',
                'your-order': 'طلبك',
                'clear-cart': 'مسح',
                'empty-cart': 'سلة التسوق فارغة',
                'subtotal': 'المجموع الفرعي:',
                'service-charge': 'رسوم الخدمة:',
                'total': 'المجموع:',
                'customer-details': 'تفاصيل العميل',
                'label-room': 'الغرفة الحالية',
                'gaming-room-1': 'غرفة الألعاب 1',
                'gaming-room-2': 'غرفة الألعاب 2',
                'gaming-room-3': 'غرفة الألعاب 3',
                'vr-room-1': 'غرفة VR 1',
                'vr-room-2': 'غرفة VR 2',
                'billiard-room-1': 'غرفة البلياردو 1',
                'billiard-room-2': 'غرفة البلياردو 2',
                'place-order': 'تأكيد الطلب',
                'order-confirmed': 'تم تأكيد الطلب!',
                'order-success-message': 'تم تقديم طلبك بنجاح. وقت التسليم المتوقع: 15-20 دقيقة.',
                'order-details-title': 'تفاصيل الطلب',
                'print-receipt': 'طباعة الفاتورة',
                
                // Menu Items
                'menu-title': 'قائمة الطعام والمشروبات',
                'menu-pizza': 'بيتزا',
                'menu-burgers': 'برجر',
                'menu-drinks': 'مشروبات',
                'menu-snacks': 'وجبات خفيفة',
                'margherita': 'بيتزا مارغريتا',
                'pepperoni': 'بيتزا ببروني',
                'supreme': 'بيتزا سوبريم',
                'classic-burger': 'برجر كلاسيكي',
                'cheese-burger': 'برجر بالجبنة',
                'chicken-burger': 'برجر دجاج',
                'coca-cola': 'كوكا كولا',
                'orange-juice': 'عصير برتقال',
                'coffee': 'قهوة',
                'chips': 'شيبسي',
                'nachos': 'ناتشوز',
                'popcorn': 'فشار',
                
                // Availability
                'availability-title': 'التوفر في الوقت الفعلي',
                'last-updated': 'آخر تحديث:',
                'refresh': 'تحديث',
                'available': 'متاح',
                'occupied': 'مشغول',
                'maintenance': 'صيانة',
                'gaming-rooms': 'غرف الألعاب',
                'vr-rooms': 'غرف سباق VR',
                'billiard-rooms': 'غرف البلياردو',
                'summary-title': 'ملخص',
                'total-rooms': 'إجمالي الغرف',
                'available-rooms': 'متاح',
                'occupied-rooms': 'مشغول',
                'maintenance-rooms': 'صيانة',
                'quick-actions': 'إجراءات سريعة',
                'notify-available': 'إشعار عند التوفر',
                'notification-title': 'إشعار التوفر',
                'notification-desc': 'احصل على إشعار عند توفر غرفة',
                'set-notification': 'تفعيل الإشعار',
                
                // Admin
                'admin-login': 'تسجيل دخول المشرف',
                'label-password': 'كلمة المرور',
                'login': 'تسجيل الدخول',
                'login-error': 'كلمة مرور خاطئة',
                'logout': 'تسجيل الخروج',
                'dashboard': 'لوحة التحكم',
                'bookings': 'الحجوزات',
                'orders': 'الطلبات',
                'manage-availability': 'إدارة التوفر',
                'total-bookings': 'إجمالي الحجوزات',
                'total-orders': 'إجمالي الطلبات',
                'total-revenue': 'إجمالي الإيرادات',
                'active-rooms': 'الغرف النشطة',
                'refresh-data': 'تحديث البيانات',
                'export-data': 'تصدير البيانات',
                'all-bookings': 'جميع الحجوزات',
                'today': 'اليوم',
                'upcoming': 'قادم',
                'past': 'سابق',
                'all-orders': 'جميع الطلبات',
                'pending': 'في الانتظار',
                'completed': 'مكتمل',
                'table-date': 'التاريخ',
                'table-time': 'الوقت',
                'table-customer': 'العميل',
                'table-phone': 'الهاتف',
                'table-room': 'الغرفة',
                'table-duration': 'المدة',
                'table-total': 'المجموع',
                'table-actions': 'إجراءات',
                'table-order-id': 'رقم الطلب',
                'table-items': 'العناصر',
                'table-status': 'الحالة',
                'change-status': 'تغيير حالة الغرفة',
                'room': 'الغرفة',
                'current-status': 'الحالة الحالية',
                'new-status': 'الحالة الجديدة',
                'notes': 'ملاحظات',
                'update-status': 'تحديث الحالة',
                
                // Visit Us Section
                'visit-us': 'زورونا الآن',
                'location-title': 'ابحث عنا هنا',
                'location-desc': 'نقع في قلب صعيد مصر، من السهل العثور علينا ونحن دائماً مستعدون لاستقبالكم لتجربة الألعاب المثلى.',
                'address': 'صعيد مصر، منطقة الألعاب',
                'hours': 'يومياً: 10:00 ص - 2:00 ص',
                
                // Footer
                'footer-desc': 'التجربة الأمثل للألعاب في صعيد مصر',
                'footer-contact': 'اتصل بنا',
                'footer-hours': 'ساعات العمل',
                'footer-hours-text': 'يومياً: 10:00 ص - 2:00 ص'
            }
        };
        
        this.loadLanguage();
    }

    init() {
        this.updateLanguageToggle();
        this.applyTranslations();
        this.applyDirection();
    }

    loadLanguage() {
        const savedLanguage = localStorage.getItem('harley-language');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
            this.currentLanguage = savedLanguage;
        }
    }

    saveLanguage() {
        localStorage.setItem('harley-language', this.currentLanguage);
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.saveLanguage();
        this.updateLanguageToggle();
        this.applyTranslations();
        this.applyDirection();
    }

    updateLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = this.currentLanguage === 'en' ? 'عربي' : 'English';
        }
    }

    applyTranslations() {
        const elementsWithKeys = document.querySelectorAll('[data-key]');
        elementsWithKeys.forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    applyDirection() {
        const body = document.body;
        const html = document.documentElement;
        
        if (this.currentLanguage === 'ar') {
            body.classList.add('rtl');
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            body.classList.remove('rtl');
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || this.translations['en'][key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    isRTL() {
        return this.currentLanguage === 'ar';
    }

    // Format numbers based on language
    formatNumber(number) {
        if (this.currentLanguage === 'ar') {
            // Convert to Arabic numerals
            const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            return number.toString().replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
        }
        return number.toString();
    }

    // Format currency based on language
    formatCurrency(amount) {
        if (this.currentLanguage === 'ar') {
            return `${this.formatNumber(amount)} جنيه`;
        }
        return `${amount} EGP`;
    }

    // Format date based on language
    formatDate(date) {
        const dateObj = new Date(date);
        
        if (this.currentLanguage === 'ar') {
            return dateObj.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        return dateObj.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Format time based on language
    formatTime(time) {
        const timeObj = new Date(`2000-01-01T${time}`);
        
        if (this.currentLanguage === 'ar') {
            return timeObj.toLocaleTimeString('ar-EG', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        return timeObj.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Get localized room names
    getRoomName(roomType, roomNumber) {
        const roomNames = {
            'gaming': this.getTranslation('gaming-room'),
            'vr': this.getTranslation('vr-room'),
            'billiard': this.getTranslation('billiard-room')
        };
        
        const baseName = roomNames[roomType] || roomType;
        return `${baseName} ${this.formatNumber(roomNumber)}`;
    }

    // Get localized status text
    getStatusText(status) {
        const statusMap = {
            'available': 'available',
            'occupied': 'occupied',
            'maintenance': 'maintenance',
            'pending': 'pending',
            'completed': 'completed'
        };
        
        return this.getTranslation(statusMap[status]) || status;
    }

    // Dynamic translation for generated content
    translateDynamicContent(content) {
        // Replace common patterns in dynamic content
        const patterns = [
            { regex: /(\d+)\s*EGP/g, replacement: (match, amount) => this.formatCurrency(parseInt(amount)) },
            { regex: /Gaming Room (\d+)/g, replacement: (match, num) => this.getRoomName('gaming', num) },
            { regex: /VR Room (\d+)/g, replacement: (match, num) => this.getRoomName('vr', num) },
            { regex: /Billiard Room (\d+)/g, replacement: (match, num) => this.getRoomName('billiard', num) }
        ];

        patterns.forEach(pattern => {
            content = content.replace(pattern.regex, pattern.replacement);
        });

        return content;
    }

    // Add event listener for language changes
    onLanguageChange(callback) {
        this.languageChangeCallbacks = this.languageChangeCallbacks || [];
        this.languageChangeCallbacks.push(callback);
    }

    // Trigger language change callbacks
    triggerLanguageChange() {
        if (this.languageChangeCallbacks) {
            this.languageChangeCallbacks.forEach(callback => callback(this.currentLanguage));
        }
    }

    // Update language toggle after language change
    updateContent() {
        this.updateLanguageToggle();
        this.applyTranslations();
        this.applyDirection();
        this.triggerLanguageChange();
    }
}

export { LanguageManager };
