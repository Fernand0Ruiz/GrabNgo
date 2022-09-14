var INTERFACE = {
    "signals": {
	"category": 'CATEGORY',
    "add": 'ADD',
    "remove": 'REMOVE',
    "quanity": 'QUANITY',
    "checkout": 'CHECKOUT'
    }
}

// This is the makeSignaller function as discussed in class
// Do not change this function
var makeSignaller = function() {
    var _subscribers = []; // Private member
    // Return the object that's created
    return {
	// Register a function with the notification system
	add: function(handlerFunction) { _subscribers.push(handlerFunction); },

	// Loop through all registered functions and call them with passed
	// arguments
	notify: function(args) {
	    for (var i = 0; i < _subscribers.length; i++) {
		_subscribers[i](args);
	    }
	}
    };
}

var makeModel = function() {
    var _observers = makeSignaller();
    var _currentCategory = "None";
    var _cart = [];
    var _checkOut = false;
    //add menu items here
    var _menu = {
        "Burgers": {
            //example of item
            "Cheese_Burger": {
                name:  'Cheese Burger',
                price: "3.50",
                img: "burgers/Cheese_Burger.jpg"
            },

            "Bacon_Burger": {
                name:  'Bacon Burger',
                price: "4.50",
                img: "burgers/Bacon_Burger.jpg"
            },

            "Vegan_Burger": {
                name:  'Vegan Burger',
                price: "5.00",
                img: "burgers/Vegan_Burger.jpg"
            },

            "Sunny_Burger": {
                name: 'Sunny Burger',
                price: "5.75",
                img: "burgers/Sunny_Burger.jpg"
            }
        }, 

        "Salads": {
            "Caesar_Salad": {
                name: "Caesar Salad",
                price: "5.99",
                img: "salads/Caesar_Salad.jpg"
            },

            "Apple_Walnut_Chicken_Salad": {
                name: "Apple Walnut Chicken Salad",
                price: "10.99",
                img: "salads/AppleWalnutChicken_Salad.jpg"
            },

            "Avocado_Tomato_Salad": {
                name: "Avocado Tomato Salad",
                price: "13.99",
                img: "salads/AvocadoTomato_Salad.jpg"
            },

            "Cobb_Salad": {
                name: "Cobb Salad",
                price: "14.99",
                img: "salads/Cobb_Salad.jpg"
            }
        },

        "Sides": {
            "French_Fries": {
                name: "French Fries",
                price: "2.99",
                img: "sides/FrenchFries_Sides.jpg"
            },

            "Sweet_Potato_Fries": {
                name: "Sweet Potato Fries",
                price: "3.99",
                img: "sides/SweetPotatoFries_Sides.jpg"
            },

            "Mashed_Potatoes": {
                name: "Velvety Mashed Potatoes",
                price: "4.99",
                img: "sides/MashedPotatoes_Sides.jpg"
            },

            "Zucchini_Parmesan": {
                name: "Zucchini Parmesan",
                price: "4.99",
                img: "sides/ZucchiniParmesan_Sides.jpg"
            }
        },

        "Desserts": {
            "Cookies_Dessert": {
                name: "Chocolate Chip Cookie",
                price: "1.99",
                img: "dessert/Cookies_Dessert.jpg"
            },
            "Brownies_Dessert": {
                name: "Double Chocolate Chip Brownies",
                price: "3.49",
                img: "dessert/Brownies_Dessert.jpg"
            },
            "IceCream_Dessert": {
                name: "Ice Cream",
                price: "3.99",
                img: "dessert/IceCream_Dessert.jpg"
            },
            "Milkshakes_Dessert": {
                name: "Milkshake",
                price: "4.99",
                img: "dessert/Milkshakes_Dessert.jpg"
            },

        },

        "Drinks": {
            "Soda_Drinks": {
                name: "Soda",
                price: "1.99",
                img: "drinks/Soda_Drinks.jpg"
            },
            "Lemonade_Drinks": {
                name: "Lemonade",
                price: "2.49",
                img: "drinks/Lemonade_Drinks.jpg"
            },
            "IcedTea_Drinks": {
                name: "Iced Tea",
                price: "2.49",
                img: "drinks/IcedTea_Drinks.jpg"
            },
            "OrangeJuice_Drinks": {
                name: "Fresh Squeezed Orange Juice",
                price: "3.99",
                img: "drinks/OrangeJuice_Drinks.jpg"
            }
        }
    }

     return {
        "register": function(observer_function) {
            _observers.add(observer_function);
        },

        "getMenu": function() {
            return _menu;
        },

        "addToCart": function(menuItem) {
            console.log("add");
            for(var i = 0; i < _cart.length; i++) {
                if(_cart[i].name === menuItem.name){
                    _cart[i].amount = _cart[i].amount + 1;
                    console.log(_cart);
                    _observers.notify();
                    return;
                }
            }
            var obj = {
                name: menuItem.name,
                price: menuItem.price,
                amount: 1,
                img: menuItem.img
            }
            _cart.push(obj);
            console.log(_cart);
            _observers.notify();
        },

        "removeFromCart": function(menuItem) {
            console.log("remove");
            for(var i = 0; i < _cart.length; i++) {
                if(_cart[i].name === menuItem.name){
                    _cart[i].amount = _cart[i].amount - 1;
                    if(_cart[i].amount === 0){
                        _cart.splice(i,1);
                    }
                    console.log(_cart);
                    _observers.notify();
                    return;
                }
            }
            console.log(_cart);
            _observers.notify();
        },

        "changeItemQuanity": function(items) {
            console.log(items)
            for(var i = 0; i < _cart.length; i++) {
                var newAmt = parseInt(items[i].value);
                if(!(isNaN(newAmt)) == true){
                    if(newAmt == 0){
                        _cart.splice(i,1);
                    } else{
                        _cart[i].amount = newAmt;
                    }
               }
            }
            _observers.notify();
        },

        "setCategory": function(category) {
           _currentCategory = category;
           _observers.notify();
        },

        "getCategory": function() {
            let category = null;
            if(_currentCategory == "Burgers"){
                category = _menu.Burgers;
            } else if(_currentCategory == "Salads"){
                category = _menu.Salads;
            } else if(_currentCategory == "Sides"){
                category = _menu.Sides;
            } else if(_currentCategory == "Desserts"){
                category = _menu.Desserts;
            } else {
                category = _menu.Drinks;
            }
            return category;
        },

        "getCart": function() {
            return _cart;
        },

        "getTotal": function() {
            var total = 0; 
            for(var i = 0; i < _cart.length; i++) {
                var calc = _cart[i].price * _cart[i].amount;
                total = total + calc;
            }
            return total.toFixed(2);
         },

         "getCheckOutStatus": function() {
            return _checkOut;
        },
        
        "setCheckOutStatus": function() {
            _checkOut = true;
            _observers.notify();
        }

        };
};

// the controller for the MVC setup
//
// model - a reference to the model
//
var makeController = function(model) {
    var _model = model;

  return {
	"dispatch": function(evt) {
	    switch(evt.type) {
        case (INTERFACE.signals.category):
            console.log(evt.category);
            _model.setCategory(evt.category);
        break;
        case (INTERFACE.signals.add):
            _model.addToCart(evt.item);
        break;
        case (INTERFACE.signals.remove):
            _model.removeFromCart(evt.item);
        break;
        case (INTERFACE.signals.quanity):
            _model.changeItemQuanity(evt.items);
        break;
        case (INTERFACE.signals.checkout):
            _model.setCheckOutStatus();
        break;
		default:
		    console.log('Uncrecognized event', evt);
	    }
	}
}};

var makeMenuView = function(model, id) {
    var _view = document.getElementById(id);
    var controller = makeController(model);
    var _model = model;

    var _displayView = function() {
        var Category =  _model.getCategory();
        
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "colDivMenu");
        for (let Item in Category){
            var menuItemDiv = document.createElement("div");
            menuItemDiv.setAttribute("class", "menuItemDiv");

            var menuItemImg = document.createElement("img");
            menuItemImg.setAttribute("class", "menuItemImg");
            var imgPath = "imgs\\menu\\" + Category[Item].img;
            menuItemImg.setAttribute("src", imgPath);

            var name = document.createElement("div");
            name.textContent = Category[Item].name;
            var price = document.createElement("div");
            price.textContent = "$" + Category[Item].price;

            var plusButt = document.createElement("button");
            plusButt.setAttribute("class", "plusButt");
            plusButt.textContent = "+";
            var minusButt = document.createElement("button");
            minusButt.setAttribute("class", "minusButt");
            minusButt.textContent = "-";

            var makePlusClick= function() {
                var _observers = makeSignaller();
     
                plusButt.addEventListener("click", function() {
                    _observers.notify({
                        "type": INTERFACE.signals.add,
                        "item": Category[Item]
                    });
                });
            
                return {
                    "register": function(observer_function) {
                        _observers.add(observer_function);
                    }
                };
            }
            var makeMinusClick= function() {
                var _observers = makeSignaller();
                
                minusButt.addEventListener("click", function() {
                    _observers.notify({
                        "type": INTERFACE.signals.remove,
                        "item": Category[Item]
                    });
                });
            
                return {
                    "register": function(observer_function) {
                        _observers.add(observer_function);
                    }
                };
            }
            var plusClick = makePlusClick();
            plusClick.register(controller.dispatch);
            var minusClick = makeMinusClick();
            minusClick.register(controller.dispatch);

            menuItemDiv.appendChild(menuItemImg);
            menuItemDiv.appendChild(name);
            menuItemDiv.appendChild(price);
            menuItemDiv.appendChild(minusButt);
            menuItemDiv.appendChild(plusButt);
            colDiv.appendChild( menuItemDiv);
        }
        _view.appendChild(colDiv);
    }
    
    var _clearView = function() {
        while (_view.firstChild) {
           _view.removeChild(_view.firstChild);
        }
    }
    
    return {
        "render": function() {
            _clearView();
            _displayView();
        }
    };
}

var makeCartView = function(model, id) {
    var _view = document.getElementById(id);
    var controller = makeController(model);
    var _model = model;

    var _displayView = function() {
        var cart = _model.getCart();
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "colDiv");
        for(var i = 0; i < cart.length; i++) {
            var cartItem = document.createElement("div");
            cartItem.setAttribute("class", "cartDiv");
            cartItem.textContent = cart[i].name + " $" + cart[i].price;

            var quanityTextBox = document.createElement("INPUT");
            quanityTextBox.setAttribute("class", "quanityTextBox");
            quanityTextBox.setAttribute("type", "text");
            if(quanityTextBox.value == ""){
                quanityTextBox.setAttribute("value", cart[i].amount);
            }

            var line = document.createElement("hr"); 
            cartItem.appendChild(quanityTextBox);
            colDiv.appendChild(cartItem);
            colDiv.appendChild(line);
        }

        if(cart.length != 0){
            var updateButt = document.createElement("button");
            updateButt.setAttribute("class", "updateButt");
            updateButt.textContent = "Update";
            var makeUpdateClick= function() {
                var _observers = makeSignaller();
     
                updateButt.addEventListener("click", function() {
                    _observers.notify({
                        "type": INTERFACE.signals.quanity,
                        "items": document.getElementsByClassName("quanityTextBox")
                    });
                });
            
                return {
                    "register": function(observer_function) {
                        _observers.add(observer_function);
                    }
                };
            }
            var updateClick = makeUpdateClick();
            updateClick.register(controller.dispatch);

            //order total
            var bottomDiv = document.createElement("div");
            bottomDiv.setAttribute("class", "cartDiv");
            bottomDiv.textContent = "Order Total: $" + _model.getTotal();

            var orderButt = document.createElement("button");
            orderButt.setAttribute("class", "placeOrderButt");
            orderButt.textContent = "Check Out";
            //PAGE Transition!
            //may have to change later!
            var makeCheckOutClick = function() {
                var _observers = makeSignaller();
     
                orderButt.addEventListener("click", function() {
                    //window.location.href = "info.html";
                    _observers.notify({
                        "type": INTERFACE.signals.checkout
                    });
                });    
            
                return {
                    "register": function(observer_function) {
                        _observers.add(observer_function);
                    }
                };
            }

            var checkOutClick = makeCheckOutClick();
            checkOutClick.register(controller.dispatch);

            bottomDiv.appendChild(updateButt);
            bottomDiv.appendChild(orderButt);
            colDiv.appendChild(bottomDiv);
        } else{
            colDiv.textContent = "Cart is empty!";
        }

        _view.appendChild(colDiv);
    }
    
    var _clearView = function() {
        while (_view.firstChild) {
           _view.removeChild(_view.firstChild);
        }
    }
    
    return {
        "render": function() {
            _clearView();
            _displayView();
        }
    };
}

var makeCategoryControl = function(model) {
    var _observers = makeSignaller();
    var controller = makeController(model);
    var menu =  model.getMenu();

    for (let category in menu){
        let _category = document.getElementById(category);
        var makeCategoryClick= function() {
           var _observers = makeSignaller();

           _category.addEventListener("click", function() {
               _observers.notify({
                   "type": INTERFACE.signals.category,
                   "category":  category
               });
           });
       
           return {
               "register": function(observer_function) {
                   _observers.add(observer_function);
               }
           };
       }
       var categoryClick = makeCategoryClick();
       categoryClick.register(controller.dispatch);
    }

    return {
        "register": function(observer_function) {
            _observers.add(observer_function);
        }
    }
}

var makeCheckOutView = function(model, id) {
    var _view = document.getElementById(id);
    var controller = makeController(model);
    var _model = model;

    var _displayView = function() {
        if (_model.getCheckOutStatus() == true){
            //clear and set to new class
            document.getElementById(id).innerHTML = "";
            _view.setAttribute("class", "checkOut");

            //title
            var title = document.createElement("div");
            title.setAttribute("class", "colDivTitleCheckOut");
            title.textContent = "CHECK OUT";
            _view.appendChild(title);

            //column
            var cart = _model.getCart();
            var colDiv = document.createElement("div");
            colDiv.setAttribute("class", "colDivCheckOut");
            
            for(var i = 0; i < cart.length; i++) {
                //item div
                var cartItem = document.createElement("div");
                cartItem.setAttribute("class", "cartDivCheckOut");
                cartItem.textContent = cart[i].name + " $" + cart[i].price;
    
                //image
                var menuItemImg = document.createElement("img");
                menuItemImg.setAttribute("class", "menuItemImgCheckOut");
                var imgPath = "imgs\\menu\\" + cart[i].img;
                console.log(cart[i].img);
                menuItemImg.setAttribute("src", imgPath);

                //quanity textbox
                var quanityTextBox = document.createElement("INPUT");
                quanityTextBox.setAttribute("class", "quanityTextBox");
                quanityTextBox.setAttribute("type", "text");
                if(quanityTextBox.value == ""){
                    quanityTextBox.setAttribute("value", cart[i].amount);
                }

                cartItem.appendChild(quanityTextBox);
                cartItem.appendChild(menuItemImg);
                colDiv.appendChild(cartItem);
            }
    
            if(cart.length != 0){
                var updateButt = document.createElement("button");
                updateButt.setAttribute("class", "updateButt");
                updateButt.textContent = "Update";
                var makeUpdateClick= function() {
                    var _observers = makeSignaller();
         
                    updateButt.addEventListener("click", function() {
                        _observers.notify({
                            "type": INTERFACE.signals.quanity,
                            "items": document.getElementsByClassName("quanityTextBox")
                        });
                    });
                
                    return {
                        "register": function(observer_function) {
                            _observers.add(observer_function);
                        }
                    };
                }
                var updateClick = makeUpdateClick();
                updateClick.register(controller.dispatch);
    
                //order total
                var bottomDiv = document.createElement("div");
                bottomDiv.setAttribute("class", "cartDiv");
                bottomDiv.textContent = "Order Total: $" + _model.getTotal();
                var line1 = document.createElement("hr"); 
                bottomDiv.appendChild(line1);

                var orderButt = document.createElement("button");
                orderButt.setAttribute("class", "placeOrderButt");
                orderButt.textContent = "Place Order";
                orderButt.addEventListener("click", function() {
                    window.location.href = "orderConfirmed.html";
                });

                var specialInstructions = document.createElement("div");
                specialInstructions.textContent = "Special Instructions";

                var specialInstrcutionTextBox = document.createElement("INPUT");
                specialInstrcutionTextBox.setAttribute("class", "quanityTextBoxCheckOut");
                specialInstrcutionTextBox.setAttribute("type", "text");
                bottomDiv.appendChild( specialInstructions);
                bottomDiv.appendChild(specialInstrcutionTextBox);
                bottomDiv.appendChild(updateButt);
                bottomDiv.appendChild(orderButt);
                colDiv.appendChild(bottomDiv);
            } else{
                colDiv.textContent = "Cart is empty!";
            }
    
            _view.appendChild(colDiv);
        }
    }

    return {
        "render": function() {
            _displayView();
        }
    };
}

document.addEventListener("DOMContentLoaded", function(event) {
    var model = makeModel();
    var controller = makeController(model);

    var categoryControls = makeCategoryControl(model);
    categoryControls.register(controller.dispatch);

    var menuView = makeMenuView(model, "menuView");
    model.register(menuView.render);

    var cartView = makeCartView(model, "cartView");
    model.register(cartView.render);

    var checkOutView = makeCheckOutView(model, "display");
    model.register(checkOutView.render);
});
