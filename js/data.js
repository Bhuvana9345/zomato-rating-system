/**
 * FlavorVault - Restaurant Seed Data
 * Contains all restaurant information and utility methods for searching/filtering.
 * Exposes: window.RestaurantData
 */

window.RestaurantData = {
  restaurants: [
    {
      id: 1,
      name: 'Saffron & Sage',
      cuisine: 'Indian',
      description: 'An exquisite fine dining experience featuring authentic Indian flavors with a contemporary twist. From rich curries to tandoori specialties.',
      image: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 50%, #e84118 100%)',
      address: '42 Spice Lane, T. Nagar, Chennai',
      phone: '9345755706',
      hours: '11:00 AM - 11:00 PM',
      priceRange: '₹₹₹',
      costForTwo: 1200,
      deliveryTime: 30,
      facilities: ['AC', 'Parking', 'Family Dining', 'Home Delivery'],
      tags: ['Fine Dining', 'North Indian', 'Mughlai', 'Tandoor'],
      featured: true,
      emoji: '🍛',
      menu: [
        { name: 'Butter Naan', price: 60, description: 'Soft, leavened flatbread brushed with fresh butter.', type: 'Veg' },
        { name: 'Garlic Naan', price: 75, description: 'Leavened flatbread flavored with minced garlic and butter.', type: 'Veg' },
        { name: 'Paneer Butter Masala', price: 220, description: 'Cottage cheese cubes cooked in a rich, creamy tomato gravy.', type: 'Veg' },
        { name: 'Kadai Paneer', price: 240, description: 'Cottage cheese sautéed with bell peppers and fresh ground spices.', type: 'Veg' },
        { name: 'Veg Biryani', price: 180, description: 'Fragrant basmati rice layered with spiced vegetables and herbs.', type: 'Veg' },
        { name: 'Jeera Rice', price: 120, description: 'Fluffy basmati rice tempered with cumin seeds and ghee.', type: 'Veg' },
        { name: 'Dal Tadka', price: 150, description: 'Yellow lentils tempered with garlic, cumin, and dry red chilies.', type: 'Veg' },
        { name: 'Gulab Jamun', price: 80, description: 'Golden fried milk dumplings soaked in cardamom sugar syrup.', type: 'Veg' },
        { name: 'Veg Pulao', price: 160, description: 'Mildly spiced aromatic rice cooked with seasonal vegetables.', type: 'Veg' },
        { name: 'Malai Kofta', price: 250, description: 'Deep-fried cottage cheese dumplings in a velvety cashew gravy.', type: 'Veg' }
      ]
    },
    {
      id: 2,
      name: 'Sakura Sushi Bar',
      cuisine: 'Japanese',
      description: 'Premium Japanese cuisine with the freshest sushi, sashimi, and ramen. An authentic Tokyo experience in the heart of the city.',
      image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff6b6b 100%)',
      address: '15 Khader Nawaz Khan Rd, Nungambakkam, Chennai',
      phone: '9345755706',
      hours: '12:00 PM - 10:30 PM',
      priceRange: '₹₹₹₹',
      costForTwo: 1500,
      deliveryTime: 40,
      facilities: ['AC', 'Valet Parking', 'Family Dining', 'Outdoor Seating'],
      tags: ['Sushi', 'Ramen', 'Japanese', 'Seafood'],
      featured: true,
      emoji: '🍣',
      menu: [
        { name: 'California Roll', price: 450, description: 'Classic sushi roll with crab sticks, avocado, and cucumber.', type: 'Non-Veg' },
        { name: 'Salmon Sashimi', price: 650, description: 'Fresh, thinly sliced premium salmon served with wasabi.', type: 'Non-Veg' },
        { name: 'Veg Tempura Roll', price: 320, description: 'Crispy batter-fried mixed vegetables wrapped in sushi rice.', type: 'Veg' },
        { name: 'Shoyu Ramen', price: 480, description: 'Traditional wheat noodles in a savory soy-sauce broth with chicken.', type: 'Non-Veg' },
        { name: 'Miso Soup', price: 180, description: 'Warm, classic fermented soybean paste broth with tofu and seaweed.', type: 'Veg' },
        { name: 'Chicken Gyoza', price: 350, description: 'Pan-seared Japanese dumplings packed with seasoned minced chicken.', type: 'Non-Veg' },
        { name: 'Matcha Ice Cream', price: 150, description: 'Rich, authentic green tea flavored creamy ice cream.', type: 'Veg' },
        { name: 'Teriyaki Chicken', price: 450, description: 'Grilled chicken glazed in sweet and savory teriyaki sauce.', type: 'Non-Veg' },
        { name: 'Shrimp Tempura Roll', price: 520, description: 'Sushi roll featuring crispy fried prawns and kewpie mayo.', type: 'Non-Veg' }
      ]
    },
    {
      id: 3,
      name: 'The Pizza Republic',
      cuisine: 'Italian',
      description: 'Wood-fired pizzas, handmade pasta, and authentic Italian flavors. Every dish is crafted with imported ingredients and love.',
      image: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 50%, #2d6a1e 100%)',
      address: '88 Shanthi Colony, Anna Nagar, Chennai',
      phone: '9345755706',
      hours: '11:30 AM - 11:30 PM',
      priceRange: '₹₹',
      costForTwo: 750,
      deliveryTime: 25,
      facilities: ['AC', 'Parking', 'Home Delivery', 'Wifi'],
      tags: ['Pizza', 'Pasta', 'Italian', 'Wood-fired'],
      featured: false,
      emoji: '🍕',
      menu: [
        { name: 'Margherita Pizza', price: 350, description: 'Classic sourdough crust topped with fresh mozzarella and basil.', type: 'Veg' },
        { name: 'Farmhouse Pizza', price: 420, description: 'Loaded with onions, bell peppers, mushrooms, and sweet corn.', type: 'Veg' },
        { name: 'Arrabiata Pasta', price: 280, description: 'Penne tossed in a spicy, fiery garlic tomato sauce.', type: 'Veg' },
        { name: 'Alfredo Pasta', price: 320, description: 'Creamy fettuccine pasta in rich butter and parmesan sauce.', type: 'Veg' },
        { name: 'Garlic Bread with Cheese', price: 150, description: 'Freshly baked baguette topped with garlic butter and melted cheese.', type: 'Veg' },
        { name: 'French Fries', price: 120, description: 'Crispy golden-fried classic potato fries salted to perfection.', type: 'Veg' },
        { name: 'Chocolate Brownie', price: 160, description: 'Fudgy chocolate brownie served warm.', type: 'Veg' },
        { name: 'Bruschetta', price: 180, description: 'Toasted bread rubbed with garlic, topped with tomatoes and olive oil.', type: 'Veg' },
        { name: 'Tiramisu', price: 220, description: 'Classic coffee-flavoured Italian dessert with mascarpone cheese.', type: 'Veg' },
        { name: 'Paneer Tikka Pizza', price: 450, description: 'Wood-fired pizza topped with spicy tandoori paneer cubes.', type: 'Veg' }
      ]
    },
    {
      id: 4,
      name: 'Burger Junction',
      cuisine: 'American',
      description: 'Gourmet burgers, crispy fries, and thick shakes. Juicy patties made from premium cuts served in a vibrant retro-themed diner.',
      image: 'linear-gradient(135deg, #f5af19 0%, #f12711 50%, #c0392b 100%)',
      address: '27 Phoenix Mall Road, Velachery, Chennai',
      phone: '9345755706',
      hours: '10:00 AM - 12:00 AM',
      priceRange: '₹₹',
      costForTwo: 550,
      deliveryTime: 20,
      facilities: ['AC', 'Parking', 'Home Delivery', 'Family Dining'],
      tags: ['Burgers', 'Fries', 'Shakes', 'Fast Food'],
      featured: true,
      emoji: '🍔',
      menu: [
        { name: 'Classic Veg Burger', price: 149, description: 'Crispy potato-veggie patty with lettuce, tomato, and mayo.', type: 'Veg' },
        { name: 'Cheese Burger', price: 179, description: 'Veggie burger loaded with an extra slice of cheddar cheese.', type: 'Veg' },
        { name: 'Spicy Chicken Burger', price: 199, description: 'Juicy crispy chicken breast patty topped with spicy sauce.', type: 'Non-Veg' },
        { name: 'French Fries', price: 99, description: 'Salted crinkle-cut golden crispy potato fries.', type: 'Veg' },
        { name: 'Peri Peri Fries', price: 119, description: 'Crispy fries tossed in spicy peri-peri spice mix.', type: 'Veg' },
        { name: 'Veg Club Sandwich', price: 139, description: 'Double-decker toast sandwich packed with fresh veggies and cheese.', type: 'Veg' },
        { name: 'Chicken Club Sandwich', price: 169, description: 'Layered toasted sandwich with grilled chicken breast and egg.', type: 'Non-Veg' },
        { name: 'Paneer Wrap', price: 149, description: 'Tortilla wrap packed with grilled paneer and sweet chili mayo.', type: 'Veg' },
        { name: 'Chocolate Shake', price: 129, description: 'Thick, creamy milkshake blended with dark chocolate syrup.', type: 'Veg' },
        { name: 'Strawberry Shake', price: 129, description: 'Smooth, thick shake flavored with sweet strawberries.', type: 'Veg' }
      ]
    },
    {
      id: 5,
      name: 'Taco Loco',
      cuisine: 'Mexican',
      description: 'Bold and vibrant Mexican street food. Tacos, burritos, nachos, and quesadillas loaded with fresh ingredients and fiery salsas.',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #e84118 100%)',
      address: '56 Kasturiba Nagar 3rd Cross St, Adyar, Chennai',
      phone: '9345755706',
      hours: '11:00 AM - 10:00 PM',
      priceRange: '₹₹',
      costForTwo: 600,
      deliveryTime: 30,
      facilities: ['AC', 'Home Delivery', 'Outdoor Seating', 'Wifi'],
      tags: ['Tacos', 'Burritos', 'Mexican', 'Street Food'],
      featured: false,
      emoji: '🌮',
      menu: [
        { name: 'Paneer Taco', price: 180, description: 'Hard shell taco filled with spiced paneer, lettuce, and salsa.', type: 'Veg' },
        { name: 'Chicken Quesadilla', price: 260, description: 'Toasted tortilla loaded with shredded chicken and cheese.', type: 'Non-Veg' },
        { name: 'Veg Burrito', price: 220, description: 'Large flour tortilla stuffed with rice, beans, and fresh veggies.', type: 'Veg' },
        { name: 'Nachos with Cheese', price: 160, description: 'Tortilla chips drenched in warm cheese sauce and jalapeños.', type: 'Veg' },
        { name: 'Spicy Chicken Taco', price: 190, description: 'Soft taco shell packed with grilled chicken and hot sauce.', type: 'Non-Veg' },
        { name: 'Veg Chimichanga', price: 240, description: 'Deep-fried burrito stuffed with rice, cheese, and vegetables.', type: 'Veg' },
        { name: 'Churros with Chocolate', price: 140, description: 'Crispy fried dough pastry dusted with sugar and chocolate sauce.', type: 'Veg' },
        { name: 'Guacamole Dip', price: 80, description: 'Freshly mashed avocado dip with onions, lime, and cilantro.', type: 'Veg' },
        { name: 'Cheese Jalapeno Poppers', price: 180, description: 'Deep-fried breaded jalapeños stuffed with molten cheese.', type: 'Veg' }
      ]
    },
    {
      id: 6,
      name: 'The Wok Master',
      cuisine: 'Chinese',
      description: 'Authentic Chinese wok-tossed dishes, dim sums, and Sichuan specialties. Bold flavors and aromatic spices in every bite.',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6c3483 100%)',
      address: '33 Mount Road, Kodambakkam, Chennai',
      phone: '9345755706',
      hours: '12:00 PM - 11:00 PM',
      priceRange: '₹₹',
      costForTwo: 650,
      deliveryTime: 25,
      facilities: ['AC', 'Parking', 'Home Delivery', 'Family Dining'],
      tags: ['Chinese', 'Wok', 'Dim Sum', 'Sichuan'],
      featured: false,
      emoji: '🥡',
      menu: [
        { name: 'Veg Fried Rice', price: 180, description: 'Wok-tossed basmati rice with finely chopped veggies and soy sauce.', type: 'Veg' },
        { name: 'Egg Fried Rice', price: 200, description: 'Savory fried rice tossed with scrambled eggs and spring onions.', type: 'Non-Veg' },
        { name: 'Chicken Schezwan Fried Rice', price: 240, description: 'Spicy fried rice tossed in house-made Schezwan chili paste.', type: 'Non-Veg' },
        { name: 'Veg Hakka Noodles', price: 180, description: 'Classic stir-fried noodles tossed with crunchy vegetables.', type: 'Veg' },
        { name: 'Chicken Manchurian', price: 260, description: 'Crispy chicken chunks in a tangy, thick garlic-chili gravy.', type: 'Non-Veg' },
        { name: 'Gobi Manchurian', price: 220, description: 'Deep-fried cauliflower florets in a sweet, sour, and spicy glaze.', type: 'Veg' },
        { name: 'Dragon Chicken', price: 280, description: 'Stir-fried chicken fingers in a fiery red chili cashew sauce.', type: 'Non-Veg' },
        { name: 'Spring Rolls', price: 150, description: 'Crispy deep-fried wrapper stuffed with stir-fried vegetables.', type: 'Veg' },
        { name: 'Veg Momos', price: 140, description: 'Steamed flour dumplings stuffed with seasoned minced vegetables.', type: 'Veg' },
        { name: 'Chili Garlic Noodles', price: 190, description: 'Noodles tossed with burnt garlic and hot red chili paste.', type: 'Veg' }
      ]
    },
    {
      id: 7,
      name: 'Le Petit Café',
      cuisine: 'French',
      description: 'A charming French bistro offering croissants, crêpes, fine wines, and elegant multi-course meals in an intimate ambiance.',
      image: 'linear-gradient(135deg, #dfe6e9 0%, #b2bec3 50%, #636e72 100%)',
      address: '12 IT Corridor Road, OMR, Chennai',
      phone: '9345755706',
      hours: '8:00 AM - 10:00 PM',
      priceRange: '₹₹₹',
      costForTwo: 900,
      deliveryTime: 35,
      facilities: ['AC', 'Outdoor Seating', 'Wifi', 'Valet Parking'],
      tags: ['French', 'Café', 'Bakery', 'Wine'],
      featured: true,
      emoji: '🥐',
      menu: [
        { name: 'Butter Croissant', price: 120, description: 'Flaky, buttery classic French puff pastry baked fresh daily.', type: 'Veg' },
        { name: 'Chocolate Croissant', price: 140, description: 'Delicious puff pastry stuffed with dark chocolate filling.', type: 'Veg' },
        { name: 'French Onion Soup', price: 180, description: 'Slow-caramelized onion broth topped with cheese crostini.', type: 'Veg' },
        { name: 'Veg Quiche', price: 220, description: 'Savory baked custard tart filled with spinach and cheese.', type: 'Veg' },
        { name: 'Macarons Box (4 Pcs)', price: 350, description: 'Assorted colorful French almond meringue sandwich cookies.', type: 'Veg' },
        { name: 'Blueberry Cheesecake', price: 240, description: 'Creamy cheesecake topped with sweet wild blueberry compote.', type: 'Veg' },
        { name: 'Caramel Custard', price: 160, description: 'Classic smooth milk pudding with a rich caramel top layer.', type: 'Veg' },
        { name: 'Café Latte', price: 140, description: 'Fresh espresso shot topped with steamed milk and light froth.', type: 'Veg' },
        { name: 'Cappuccino', price: 140, description: 'Espresso balanced with steamed milk and a thick layer of foam.', type: 'Veg' },
        { name: 'Hot Chocolate', price: 160, description: 'Thick, creamy hot cocoa made with melted dark chocolate.', type: 'Veg' }
      ]
    },
    {
      id: 8,
      name: 'Dosa Dynasty',
      cuisine: 'South Indian',
      description: 'Traditional South Indian breakfast and meals. Crispy dosas, fluffy idlis, aromatic filter coffee, and authentic sambar.',
      image: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 50%, #d63031 100%)',
      address: '95 GST Road, Tambaram, Chennai',
      phone: '9345755706',
      hours: '6:30 AM - 10:00 PM',
      priceRange: '₹',
      costForTwo: 300,
      deliveryTime: 15,
      facilities: ['AC', 'Parking', 'Home Delivery', 'Family Dining'],
      tags: ['South Indian', 'Dosa', 'Idli', 'Filter Coffee'],
      featured: false,
      emoji: '🫓',
      menu: [
        { name: 'Idli (2 Pcs)', price: 60, description: 'Steamed rice cakes served with sambar and fresh chutneys.', type: 'Veg' },
        { name: 'Plain Dosa', price: 80, description: 'Thin, crispy crepe made from fermented rice and lentil batter.', type: 'Veg' },
        { name: 'Masala Dosa', price: 100, description: 'Crispy dosa folded with spiced mashed potato filling inside.', type: 'Veg' },
        { name: 'Ghee Roast Dosa', price: 120, description: 'Wafer-thin crepe roasted with aromatic clarifying butter.', type: 'Veg' },
        { name: 'Pongal', price: 90, description: 'Traditional rice and lentil dish tempered with pepper, cumin, and cashews.', type: 'Veg' },
        { name: 'Poori Masala', price: 100, description: 'Fluffy deep-fried wheat breads served with potato curry.', type: 'Veg' },
        { name: 'Medu Vada (2 Pcs)', price: 70, description: 'Crispy, deep-fried savory lentil donuts served hot.', type: 'Veg' },
        { name: 'Mini Tiffin', price: 150, description: 'Combo of mini idli, sweet, pongal, mini dosa, and filter coffee.', type: 'Veg' },
        { name: 'Filter Coffee', price: 40, description: 'Traditional South Indian frothy milk coffee brewed in a metal filter.', type: 'Veg' },
        { name: 'Rava Khichdi', price: 80, description: 'Roasted semolina cooked with mixed vegetables and ghee.', type: 'Veg' },
        { name: 'Onion Uttapam', price: 110, description: 'Thick savory pancake topped with finely chopped onions.', type: 'Veg' }
      ]
    },
    {
      id: 9,
      name: 'Smoke & Grill BBQ',
      cuisine: 'BBQ & Grill',
      description: 'Slow-smoked meats, chargrilled steaks, and signature BBQ sauces. A meat-lovers paradise with rustic wooden décor.',
      image: 'linear-gradient(135deg, #2c3e50 0%, #e74c3c 50%, #c0392b 100%)',
      address: '71 Mount Poonamallee Rd, Porur, Chennai',
      phone: '9345755706',
      hours: '5:00 PM - 12:00 AM',
      priceRange: '₹₹₹',
      costForTwo: 1000,
      deliveryTime: 35,
      facilities: ['AC', 'Parking', 'Live Music', 'Bar'],
      tags: ['BBQ', 'Grill', 'Steaks', 'Smoked'],
      featured: false,
      emoji: '🥩',
      menu: [
        { name: 'Grilled Paneer Kebab', price: 240, description: 'Paneer cubes marinated in yogurt and yellow spices, grilled.', type: 'Veg' },
        { name: 'BBQ Chicken Wings', price: 280, description: 'Crispy chicken wings glazed in sweet hickory BBQ sauce.', type: 'Non-Veg' },
        { name: 'Tandoori Chicken Half', price: 320, description: 'Traditional roasted chicken marinated in yogurt and tandoori spices.', type: 'Non-Veg' },
        { name: 'Veg Seekh Kebab', price: 220, description: 'Spiced minced vegetables skewered and grilled in clay oven.', type: 'Veg' },
        { name: 'Grilled Fish Tikka', price: 360, description: 'Fresh fish fillets marinated in mustard and carom seeds, grilled.', type: 'Non-Veg' },
        { name: 'Garlic Herb Naan', price: 80, description: 'Sourdough flatbread topped with garlic and fresh herbs.', type: 'Veg' },
        { name: 'Dal Makhani', price: 180, description: 'Slow-cooked black lentils in rich cream and butter sauce.', type: 'Veg' },
        { name: 'Brownie with Ice Cream', price: 180, description: 'Warm fudge brownie topped with cold vanilla ice cream scoop.', type: 'Veg' },
        { name: 'Mint Lime Cooler', price: 90, description: 'Refreshing mocktail with fresh mint leaves, lime, and soda.', type: 'Veg' }
      ]
    },
    {
      id: 10,
      name: 'Sweet Alchemy',
      cuisine: 'Desserts & Café',
      description: 'Artisan desserts, gourmet pastries, specialty coffees, and dream-worthy cakes. A heaven for anyone with a sweet tooth.',
      image: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 50%, #fcb69f 100%)',
      address: '8 Medavakkam Main Road, Medavakkam, Chennai',
      phone: '9345755706',
      hours: '9:00 AM - 11:00 PM',
      priceRange: '₹₹',
      costForTwo: 500,
      deliveryTime: 25,
      facilities: ['AC', 'Parking', 'Home Delivery', 'Wifi'],
      tags: ['Desserts', 'Cakes', 'Coffee', 'Pastries'],
      featured: true,
      emoji: '🍰',
      menu: [
        { name: 'Sizzling Brownie', price: 199, description: 'Hot chocolate brownie served on a sizzler plate with ice cream.', type: 'Veg' },
        { name: 'Red Velvet Pastry', price: 130, description: 'Layered cake colored red, filled with vanilla cream cheese frost.', type: 'Veg' },
        { name: 'Chocolate Truffle Cake', price: 140, description: 'Rich chocolate sponge cake layered with chocolate ganache.', type: 'Veg' },
        { name: 'New York Cheesecake', price: 220, description: 'Classic dense and creamy baked cheesecake with biscuit crust.', type: 'Veg' },
        { name: 'Royal Falooda', price: 160, description: 'Cold dessert drink with milk, basil seeds, vermicelli, and ice cream.', type: 'Veg' },
        { name: 'Gulab Jamun with Ice Cream', price: 120, description: 'Warm sweet milk dumplings paired with cold vanilla ice cream.', type: 'Veg' },
        { name: 'Vanilla Milkshake', price: 120, description: 'Classic thick shake blended with milk and vanilla bean extract.', type: 'Veg' },
        { name: 'Cold Coffee with Ice Cream', price: 140, description: 'Frothy whipped cold coffee with a scoop of vanilla ice cream.', type: 'Veg' },
        { name: 'Waffles with Maple Syrup', price: 160, description: 'Golden crispy grid waffles served with warm maple syrup.', type: 'Veg' }
      ]
    },
    {
      id: 11,
      name: 'Mediterranean Breeze',
      cuisine: 'Mediterranean',
      description: 'Fresh hummus, falafel, shawarma, and grilled kebabs. Healthy Mediterranean bowls and platters in a breezy setting.',
      image: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #0652DD 100%)',
      address: '43 G N Chetty Road, T. Nagar, Chennai',
      phone: '9345755706',
      hours: '11:00 AM - 10:30 PM',
      priceRange: '₹₹₹',
      costForTwo: 800,
      deliveryTime: 30,
      facilities: ['AC', 'Parking', 'Outdoor Seating', 'Family Dining'],
      tags: ['Mediterranean', 'Falafel', 'Kebabs', 'Healthy'],
      featured: false,
      emoji: '🥙',
      menu: [
        { name: 'Hummus with Pita Bread', price: 190, description: 'Creamy blended chickpeas, tahini, and olive oil dip with warm pitas.', type: 'Veg' },
        { name: 'Falafel Wrap', price: 160, description: 'Crispy chickpea balls wrapped in flatbread with tzatziki and veggies.', type: 'Veg' },
        { name: 'Greek Salad', price: 180, description: 'Crunchy cucumbers, tomatoes, red onions, olives, and feta cheese.', type: 'Veg' },
        { name: 'Mediterranean Bowl', price: 260, description: 'Quinoa topped with falafel, hummus, cucumber, and pickled beets.', type: 'Veg' },
        { name: 'Grilled Veg Kebab', price: 220, description: 'Bell peppers, mushrooms, and zucchini skewered and chargrilled.', type: 'Veg' },
        { name: 'Paneer Shawarma', price: 180, description: 'Spiced sliced paneer grilled and rolled in soft flatbread.', type: 'Veg' },
        { name: 'Baklava (3 Pcs)', price: 180, description: 'Flaky filo pastry sheets layered with chopped nuts and honey.', type: 'Veg' },
        { name: 'Tzatziki Dip', price: 70, description: 'Cool strained yogurt dip mixed with cucumber, garlic, and dill.', type: 'Veg' },
        { name: 'Mint Lemonade', price: 90, description: 'Zesty lemon juice blended with fresh mint leaves and sugar.', type: 'Veg' }
      ]
    },
    {
      id: 12,
      name: 'Thai Orchid',
      cuisine: 'Thai',
      description: 'Aromatic Thai curries, pad thai, tom yum soups, and mango sticky rice. A perfect blend of sweet, sour, salty, and spicy.',
      image: 'linear-gradient(135deg, #00b894 0%, #00cec9 50%, #0abde3 100%)',
      address: '62 Rajiv Gandhi Salai, OMR, Chennai',
      phone: '9345755706',
      hours: '12:00 PM - 10:30 PM',
      priceRange: '₹₹₹',
      costForTwo: 900,
      deliveryTime: 35,
      facilities: ['AC', 'Parking', 'Home Delivery', 'Family Dining'],
      tags: ['Thai', 'Curry', 'Pad Thai', 'Soup'],
      featured: false,
      emoji: '🍜',
      menu: [
        { name: 'Pad Thai Noodles Veg', price: 240, description: 'Stir-fried flat rice noodles with tofu, bean sprouts, peanuts.', type: 'Veg' },
        { name: 'Green Thai Curry with Rice', price: 280, description: 'Creamy coconut curry with zucchini, bell peppers, served with rice.', type: 'Veg' },
        { name: 'Red Thai Curry with Rice', price: 280, description: 'Aromatic red chili coconut milk curry with vegetables and rice.', type: 'Veg' },
        { name: 'Tom Yum Soup Veg', price: 160, description: 'Sour and spicy herbal broth flavored with lemongrass and galangal.', type: 'Veg' },
        { name: 'Som Tum (Papaya Salad)', price: 160, description: 'Shredded raw green papaya salad tossed with chilies and peanuts.', type: 'Veg' },
        { name: 'Spring Rolls (3 Pcs)', price: 140, description: 'Deep-fried golden wrappers filled with glass noodles and cabbage.', type: 'Veg' },
        { name: 'Mango Sticky Rice', price: 180, description: 'Sweet glutinous rice cooked in coconut cream, served with fresh mango.', type: 'Veg' },
        { name: 'Jasmine Rice', price: 100, description: 'Aromatic steamed long-grain jasmine rice.', type: 'Veg' },
        { name: 'Iced Thai Tea', price: 120, description: 'Sweet black tea brewed with star anise, topped with condensed milk.', type: 'Veg' }
      ]
    }
  ],

  /**
   * Find a restaurant by its numeric ID.
   * @param {number|string} id - Restaurant ID
   * @returns {object|null} Restaurant object or null if not found
   */
  getById(id) {
    return this.restaurants.find(r => r.id === parseInt(id)) || null;
  },

  /**
   * Full-text search across name, cuisine, description, and tags.
   * @param {string} query - Search term
   * @returns {Array} Matching restaurants
   */
  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return this.restaurants;
    return this.restaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  },

  /**
   * Filter restaurants by cuisine type.
   * @param {string} cuisine - Cuisine name or 'All'
   * @returns {Array} Filtered restaurants
   */
  filterByCuisine(cuisine) {
    if (!cuisine || cuisine === 'All') return this.restaurants;
    return this.restaurants.filter(r => r.cuisine === cuisine);
  },

  /**
   * Get a sorted list of all unique cuisine types.
   * @returns {Array<string>} Cuisine names
   */
  getAllCuisines() {
    return [...new Set(this.restaurants.map(r => r.cuisine))].sort();
  },

  /**
   * Get only featured restaurants.
   * @returns {Array} Featured restaurants
   */
  getFeatured() {
    return this.restaurants.filter(r => r.featured);
  }
};
