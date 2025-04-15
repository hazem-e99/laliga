// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// إعداد الترجمات
const resources = {
  en: {
    translation: {
      "register": "Don't have an account? Register",
      "login": "Welcome Back",
      "add_to_cart": "Add to Cart",
      "pay_now": "Pay Now",
      "best_seller": "Best Seller",
      "trending_now": "Trending Now",
      "sneakers": "Sneakers",
      "shorts": "Shorts",
       "accessories": "Accessories",
      "cart_title": "Your Shopping Cart",
      "favorite_product": "Favorite Products ",
      "total_price": "Your Total Price",
      "noAccessoriesFound": 'No accessories found matching your filters.',
      "cart": {
    "emptyMessage": "Oops! Your Cart is Empty. Start shopping now by clicking the button below and find something you love!",
    "backToHome": "BACK TO HOME",
    "bestSeller": "BestSeller",
    "newProduct": "New Product",
    "rate": "Rate",
    "noRating": "No rating",
    "price": "Price",
    "totalPrice": "Total Price"
  },
  "product": {
    "details": "Details"
  },
  
    "auth": {
      "loginWithGoogle": "Login with Google"
    },
    
        "nav": {
          "home": "Home",
          "dashboard": "Dashboard",
          "cart": "Cart",
          "wishlist": "Wishlist",
          "login": "Login",
          "logout": "Logout",
          "profile": "Profile"
        },
        "pants": "Pants",
         "no_pants_found": "No pants found matching your filters.",
         "available": "Available",
"out_of_stock": "Out of Stock",
"category": "Category",
"filter_products": "Filter Products",
"categories": "Categories",
"search_by_product_name": "Search by Product Name",
"price_range": "Price Range",
"rating": "Rating",
"all_prices": "All Prices",
"all_ratings": "All Ratings",
"4_and_above": "4 & above",
"4_5_and_above": "4.5 & above"
,
    "no_shorts_found": "No shorts found matching your filters.",
    "shorts": "Shorts",
    
        "no_sneakers_found": "No sneakers found matching your filters.",
        "sneakers": "Sneakers",
        
            "no_tshirts_found": "No t-shirts found matching your filters.",
            "tshirts": "T-Shirts",
            
                "product_quantity_increased": " Product quantity increased in the cart!",
                "product_added_successfully": " Product added to cart successfully!",
                "product_removed_successfully": " Product removed from cart successfully!",
                "cart_cleared_successfully": " Cart has been cleared successfully!",
                
                    "product_added_to_wishlist": " Product added to wishlist!",
                    "product_already_in_wishlist": " This product is already in your wishlist.",
                    "product_removed_from_wishlist": " Product removed from wishlist.",
                    "wishlist_cleared": " Wishlist cleared.",
                    
                        "your_shopping_cart": "Your Shopping Cart",
                        "your_total_price_cart": "Your Total Price Cart:",
                        "delete_cart": "Delete Cart",
                        "next_step_payment": "Next Step (Payment)",
                        
                            "welcome_back": "Welcome Back ..",
                            "email": "Email",
                            "password": "Password",
                            "sign_in": "Sign In",
                            "or": "OR",
                            "no_account_register": "Don't have an account? Register",
                            "login_success": "Logged in successfully!",
                            "login_invalid": "Invalid email or password",
                            "login_error": "Something went wrong",
                            "google_login_failed": "Google login failed, please try again",
                            
                                "payment_details": "Payment Details",
                                "card_number": "Card Number",
                                "card_number_placeholder": "1234 5678 9012 3456",
                                "card_number_error": "Card number must be 16 digits",
                                "card_holder_name": "Card Holder Name",
                                "card_holder_placeholder": "Hazem Mohamed",
                                "card_holder_error": "Enter full cardholder name",
                                "expiry_date": "Expiry Date",
                                "expiry_placeholder": "MM/YY",
                                "expiry_error": "Expiry must be in MM/YY format",
                                "cvv": "CVV",
                                "cvv_placeholder": "123",
                                "cvv_error": "CVV must be 3 or 4 digits",
                                "pay_now": "Pay Now",
                                "payment_success": "✅ Payment Successful!",
                                "payment_thank_you": "Thanks for your order, ! Redirecting to home...",
                                
                                    "customer_feedback": "CUSTOMER FEEDBACK",
                                    "review_error": "You have already submitted your feedback for this product",
                                    "share_your_thoughts": "SHARE YOUR THOUGHTS",
                                    "review_label": "Write your product experience here",
                                    "submit_review": "SUBMIT REVIEW",
                                    "no_reviews": "No reviews yet. Be the first to share your experience!",
                                    "loading": "Loading...",
                                    "product_not_found": "Product not found"
                                  ,
                                    "first_name": "First Name",
                                    "last_name": "Last Name",
                                    "phone": "Phone Number",
                                    "email": "Email",
                                    "password": "Password",
                                    "birth_date": "Date of Birth",
                                    "gender": "Gender",
                                    "address": "Address",
                                    "accept_terms": "I agree to the Terms and Conditions",
                                    "create_account": "Create Account",
                                    "already_have_account": "Already have an account?",
                                    "sign_in": "Sign In",
                                    "terms_conditions": "Terms and Conditions",
                                    
                                        "male": "Male",
                                        "female": "Female",
                                        "other": "Other",
                                        "registration_success": "Registered successfully!",
  "accept_terms_error": "Please accept the terms and conditions.",
  "user_exists": "User already exists!",
  "registration_error": "Registration failed. Please try again.",
  
    "welcome_title": "💥 Welcome to The Ultimate Sportswear Experience 💥",
    "typewriter_strings": [
      "Train harder 🏋️",
      "Run faster 🏃‍♂️",
      "Look sharper 😎",
      "Your style, your game, your world 🌍",
      "Let’s change the rules together 🚀"
    ]
  ,
  "editProfile": "Edit Profile",
  "changePassword": "Change Password",
  "saveChanges": "Save Changes",
  "cancel": "Cancel",
  "updatePassword": "Update Password",
  "personalInfo": "Personal Information",
  "firstName": "First Name",
  "lastName": "Last Name",
  "email": "Email",
  "phone": "Phone",
  "address": "Address",
  "currentPassword": "Current Password",
  "newPassword": "New Password",
  "confirmPassword": "Confirm New Password",
  "changePasswordTitle": "Change Password",
  "pleaseLogin": "Please log in first",
  "passwordSuccess": "Password updated successfully!",
  "profileSuccess": "Profile updated successfully!"
                                      
                                      
                                  
                                  
                                  
                              
                              
                          
                          
                      
                      
                  
                  
              
              
          
          
      
      
  
  

    
  
  
    }
  },
  ar: {
    translation: {
      "register": "ليس لديك حساب؟ سجل",
      "login": "مرحبًا بعودتك",
      "add_to_cart": "أضف إلى السلة",
      "pay_now": "ادفع الآن",
      "best_seller": "الأكثر مبيعًا",
      "trending_now": "الأكثر رواجًا الآن",
      "sneakers": "أحذية رياضية",
      "shorts": "شورتات",
       "accessories": "إكسسوارات",
      "cart_title": "سلة التسوق الخاصة بك",
      "total_price": "إجمالي السعر",
      "favorite_product": "المنتجات المفضلة",
      "remove_all": "إزالة الكل",
      "wishlist_empty_message": "عذراً! قائمة الرغبات الخاصة بك فارغة. ابدأ بالتسوق الآن من خلال النقر على الزر أدناه وابحث عن شيء تحبه!",
      "back_to_home": "العودة إلى الرئيسية",
      "rate": "التقييم",
      "no_rating": "لا تقييم",
      "price": "السعر",
      "add_to_cart": "أضف إلى السلة",
      "remove": "إزالة",
      "noAccessoriesFound": 'لا توجد إكسسوارات تطابق الفلاتر المحدده .',
      "cart": {
    "emptyMessage": "عذرًا! سلتك فارغة. ابدأ التسوق الآن بالنقر على الزر أدناه وابحث عن شيء تحبه!",
    "backToHome": "العودة إلى الصفحة الرئيسية",
    "bestSeller": "الأكثر مبيعًا",
    "newProduct": "منتج جديد",
    "rate": "التقييم",
    "noRating": "لا يوجد تقييم",
    "price": "السعر",
    "totalPrice": "السعر الإجمالي"
  }, 
   "product": {
    "details": "تفاصيل"
  },
  
    "auth": {
      "loginWithGoogle": "تسجيل الدخول بواسطة جوجل"
    },
    
        "nav": {
          "home": "الرئيسية",
          "dashboard": "لوحة التحكم",
          "cart": "السلة",
          "wishlist": "المفضلة",
          "login": "تسجيل الدخول",
          "logout": "تسجيل الخروج",
          "profile": "الملف الشخصي"
        },
        
            "pants": "البنطلونات",
            "no_pants_found": "لا توجد بنطلونات تطابق الفلاتر المحددة.",
          "available": "متوفر",
"out_of_stock": "غير متوفر",
"category": "الفئة",
"filter_products": "تصفية المنتجات",
"categories": "الفئات",
"search_by_product_name": "البحث بواسطة اسم المنتج",
"price_range": "نطاق السعر",
"rating": "التقييم",
"all_prices": "جميع الأسعار",
"all_ratings": "جميع التقييمات",
"4_and_above": "4 وما فوق",
"4_5_and_above": "4.5 وما فوق",

    "no_shorts_found": "لا توجد شورتات تطابق الفلاتر المحددة.",
    "shorts": "شورتات",
    
        "no_sneakers_found": "لا توجد أحذية رياضية تطابق الفلاتر المحددة.",
        "sneakers": "أحذية رياضية"
      ,
      
        "no_tshirts_found": "لا توجد تيشيرتات تطابق الفلاتر المحددة.",
        "tshirts": "تيشيرتات"
      
      ,
      
        "product_quantity_increased": " تم زيادة كمية المنتج في السلة!",
        "product_added_successfully": " تم إضافة المنتج إلى السلة بنجاح!",
        "product_removed_successfully": " تم إزالة المنتج من السلة بنجاح!",
        "cart_cleared_successfully": " تم مسح السلة بنجاح!"
      ,
        "product_added_to_wishlist": " تم إضافة المنتج إلى المفضلة!",
        "product_already_in_wishlist": " هذا المنتج موجود بالفعل في المفضلة.",
        "product_removed_from_wishlist": " تم إزالة المنتج من المفضلة.",
        "wishlist_cleared": " تم مسح المفضلة.",
            "your_shopping_cart": "عربة التسوق الخاصة بك",
            "your_total_price_cart": "إجمالي سعر عربة التسوق:",
            "delete_cart": "مسح العربة",
            "next_step_payment": "الخطوة التالية (الدفع)",
            
                "welcome_back": ".. مرحبًا بعودتك ",
                "email": "البريد الإلكتروني",
                "password": "كلمة المرور",
                "sign_in": "تسجيل الدخول",
                "or": "أو",
                "no_account_register": "ليس لديك حساب؟ سجل الآن",
                "login_success": "تم تسجيل الدخول بنجاح!",
                "login_invalid": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
                "login_error": "حدث خطأ ما",
                "google_login_failed": "فشل تسجيل الدخول باستخدام جوجل، حاول مرة أخرى"
              ,
                "payment_details": "تفاصيل الدفع",
                "card_number": "رقم البطاقة",
                "card_number_placeholder": "1234 5678 9012 3456",
                "card_number_error": "يجب أن يتكون رقم البطاقة من 16 رقمًا",
                "card_holder_name": "اسم صاحب البطاقة",
                "card_holder_placeholder": "Hazem Mohamed",
                "card_holder_error": "أدخل الاسم الكامل لصاحب البطاقة",
                "expiry_date": "تاريخ الانتهاء",
                "expiry_placeholder": "MM/YY",
                "expiry_error": "يجب أن يكون التاريخ بصيغة MM/YY",
                "cvv": "CVV",
                "cvv_placeholder": "123",
                "cvv_error": "يجب أن يتكون CVV من 3 أو 4 أرقام",
                "pay_now": "ادفع الآن",
                "payment_success": "✅ تم الدفع بنجاح!",
                "payment_thank_you": "شكرًا لطلبك! سيتم تحويلك إلى الصفحة الرئيسية...",
                
                    "customer_feedback": "تقييمات العملاء",
                    "review_error": "لقد قمت بإرسال تقييم لهذا المنتج من قبل",
                    "share_your_thoughts": "شاركنا رأيك",
                    "review_label": "اكتب تجربتك مع المنتج هنا",
                    "submit_review": "إرسال التقييم",
                    "no_reviews": "لا توجد تقييمات بعد. كن أول من يشارك تجربته!",
                    "loading": "جاري التحميل...",
                    "product_not_found": "المنتج غير موجود",
                    
                        "first_name": "الاسم الأول",
                        "last_name": "الاسم الأخير",
                        "phone": "رقم الهاتف",
                        "email": "البريد الإلكتروني",
                        "password": "كلمة المرور",
                        "birth_date": "تاريخ الميلاد",
                        "gender": "الجنس",
                        "address": "العنوان",
                        "accept_terms": "أوافق على الشروط والأحكام",
                        "create_account": "إنشاء حساب",
                        "already_have_account": "هل لديك حساب بالفعل؟",
                        "sign_in": "تسجيل الدخول",
                        "terms_conditions": "الشروط والأحكام",
                        
                            "male": "ذكر",
                            "female": "أنثى",
                            "other": "آخر",
                            "registration_success": "تم التسجيل بنجاح!",
                            "accept_terms_error": "من فضلك وافق على الشروط والأحكام.",
                            "user_exists": "المستخدم موجود بالفعل!",
                            "registration_error": "فشل التسجيل. حاول مرة أخرى.",
                          
                            
                                "welcome_title": "💥 مرحبًا بك في تجربة الملابس الرياضية المثالية 💥",
                                "typewriter_strings": [
                                  "تدرب بشدة 🏋️",
                                  "ركض أسرع 🏃‍♂️",
                                  "مظهر أنيق 😎",
                                  "أسلوبك، لعبتك، عالمك 🌍",
                                  "لنغير القواعد معًا 🚀"
                                ],
                                
                              "editProfile": "تعديل الملف الشخصي",
    "changePassword": "تغيير كلمة المرور",
    "saveChanges": "حفظ التعديلات",
    "cancel": "إلغاء",
    "updatePassword": "تحديث كلمة المرور",
    "personalInfo": "المعلومات الشخصية",
    "firstName": "الاسم الأول",
    "lastName": "اسم العائلة",
    "email": "البريد الإلكتروني",
    "phone": "رقم الهاتف",
    "address": "العنوان",
    "currentPassword": "كلمة المرور الحالية",
    "newPassword": "كلمة المرور الجديدة",
    "confirmPassword": "تأكيد كلمة المرور الجديدة",
    "changePasswordTitle": "تغيير كلمة المرور",
    "pleaseLogin": "يرجى تسجيل الدخول أولاً",
    "passwordSuccess": "تم تحديث كلمة المرور بنجاح!",
    "profileSuccess": "تم تحديث الملف الشخصي بنجاح!"
                              
                      
                      
                  
                  
              
              
              
          
          
      
      
      
  
    }
  }
};

i18n
  .use(initReactI18next) // ربط react-i18next
  .init({
    resources,
    lng: 'en', // اللغة الافتراضية
    interpolation: {
      escapeValue: false // لا حاجة للهروب من الحروف في React
    }
  });

export default i18n;
