fetch('https://www.manhattanfreshpizza.com/test/api/product/read.php')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
            }

            // Examine the text in the response
            response.json().then(function (data2) {
                data = data2;
                generatePizzas(data);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);

    });

window.onload = function () {
    
    


    toggle = 0;
    lastline = null;
    var eTicket = document.getElementById("order");
    window.onresize = function () {
        if (window.innerWidth >= 768) {
            eTicket.style.display = 'block';
            if (lastline) {
                clearAnim(); //clear animation
            }
        }
        else if (toggle === 0) {
            eTicket.style.display = 'none';
        }
    };


    var eButtons = document.getElementsByClassName('button pizza');
    for (var i = 0; i < eButtons.length; i++) {
        eButtons[i].addEventListener('click', function (e) {
            addToCart(this);
            updateCart("add");
        });
    }
    var eCart = document.getElementById("cart");
    eCart.addEventListener('click', function (e) {
        toggleTicket();
    });

    var eClose = document.getElementById("close2");
    eClose.addEventListener('click', function (e) {
        toggleTicket();
    })
};
var cart = [];

function addToCart(element) { //add element to the list
    var pizzasize = element.parentElement.getAttribute("class");
    var pizzaname = element.parentElement.parentElement.getAttribute("class");

    if (pizzasize === "medium") {
        var oPizza = data.products[0].types.find(pizza => (pizza.type === pizzaname)
    )
    } else {
        var oPizza = data.products[1].types.find(pizza => (pizza.type === pizzaname)
    )
    }
    var orderproduct = JSON.parse(JSON.stringify(oPizza));
    cart.push(orderproduct);
}

function toggleTicket() { //toggle show ticket (for mobile version)
    var eTicket = document.getElementById("order");
    if (eTicket.style.display === 'block') {
        eTicket.style.display = 'none';
        eTicket.setAttribute('class', 'col-xs-4');
        toggle = 0;
    } else {
        eTicket.setAttribute('class', 'col-xs-4 animated slideInDown');
        if (lastline) {
            lastline.setAttribute("class", "ticketline row");
        }
        eTicket.style.display = 'block';
        toggle = 1;
    }

}

function updateCart(type) { //optional parameter 'type' to chose animation
    if ($('#list').length > 0) { //empty cart (jquery)
        $('#list').remove();
    }

    var eTicket = document.getElementById("ticket");
    var eList = document.createElement("div");
    eList.setAttribute("id", "list");
    var totalprice = 0;
    cart.forEach(function (product, index) {
        var eLine = document.createElement("div");
        eLine.setAttribute("class", "ticketline row");

        if (type === 'add') { //if parameter is add then animate the last element
            if (cart.length === index + 1) { //animate only the last element
                eLine.setAttribute("class", "ticketline row animated fadeInLeft");
            }
        }

        var eName = document.createElement("div");
        var eName2 = document.createElement("p");
        eName.appendChild(eName2);
        eName2.innerText = product.type;
        eName.setAttribute("class", "col-xs-4");
        var eSize = document.createElement("span");
        eSize.innerText = product.size;
        eSize.setAttribute("class", "col-xs-3");
        var ePrice = document.createElement("span");
        ePrice.innerText = product.payPrice.toFixed(2);
        ePrice.setAttribute("class", "col-xs-2");
        eSize.style.width = '20.8333333333325%';
        totalprice += product.payPrice;
        var eEdit = document.createElement("span");
        eEdit.setAttribute("class", "button2 edit col-xs-1 btn btn-dark");
        eEdit.style.width = '10.416666666666%';
        var edi = document.createElement("span");
        edi.setAttribute("class", "glyphicon glyphicon-pencil");
        eLine.setAttribute("id", "l" + index);
        eEdit.appendChild(edi);
        eLine.appendChild(eName);
        eLine.appendChild(eSize);
        eLine.appendChild(ePrice);
        eLine.appendChild(eEdit);
        var eRemove = document.createElement("span");
        var rem = document.createElement("span");
        rem.setAttribute("class", "glyphicon glyphicon-trash");
        eRemove.appendChild(rem);
        eRemove.setAttribute("class", "button2 remove btn btn-dark col-xs-1");
        eRemove.style.width = '10.416666666666%';
        eLine.appendChild(eRemove);


        eEdit.addEventListener('click', function (e) {
            showEditor();
            edit(index);
        });

        eRemove.addEventListener('click', function (e) { //remove element from the list
            eLine.setAttribute("class", "ticketline row animated fadeOutLeft");
            cart.splice(index, 1);
            updateCart();
            clearAnim();
        });


        eList.appendChild(eLine);
        lastline = eLine;

        var eAddedIng = document.createElement("div");
        eAddedIng.setAttribute('class', 'row extra');
        var addedIngredients = product.addedIngredients;
        var arrAdd = []; //to count amount of added ingredients


        addedIngredients.forEach(function (ing) {  //set zero to all
                arrAdd[ing.type] = 0;
            }
        );

        addedIngredients.forEach(function (ing) {  // added ingredients counter (for each type)
                arrAdd[ing.type] += 1;
            }
        );

        console.log(Object.keys(arrAdd).length);
        if (Object.keys(arrAdd).length > 0) {
            eList.appendChild(eAddedIng);
            eAddedIng.innerHTML += "extra: ";
        }


        for (var ing in arrAdd) {
            if (arrAdd[ing] > 1) {                             //show amount of ing. if more than one
                eAddedIng.innerHTML += arrAdd[ing] + "x ";
            }
            eAddedIng.innerHTML += ing;

            if (!(ing === Object.keys(arrAdd).pop())) { //check if this is the last element, if not print coma
                eAddedIng.innerHTML += ', ';
            }

        }

        var eRemovedIng = document.createElement("div");
        eRemovedIng.setAttribute('class', 'row extra');
        var removedIngredients = product.removedIngredients;
        var arrRem = []; //to count amount of removed ingredients


        removedIngredients.forEach(function (ing) {  //set zero to all
                arrRem[ing.type] = 0;
            }
        );

        removedIngredients.forEach(function (ing) {  // removed ingredients counter (for each type)
                arrRem[ing.type] += 1;
            }
        );

        console.log(Object.keys(arrRem).length);
        if (Object.keys(arrRem).length > 0) {
            eList.appendChild(eRemovedIng);
            eRemovedIng.innerHTML += "zonder: ";
        }


        for (var ing in arrRem) {


            if (arrRem[ing] > 1) {                             //show amount of ing. if more than one
                eRemovedIng.innerHTML += arrRem[ing] + "x ";
            }
            eRemovedIng.innerHTML += ing;

            if (!(ing === Object.keys(arrRem).pop())) { //check if this is the last element, if not print coma
                eRemovedIng.innerHTML += ', ';
            }

        }
        if ((Object.keys(arrAdd).length > 0) || (Object.keys(arrRem).length > 0)) {
            var eMargin = document.createElement('div');
            eMargin.setAttribute('class', 'row margin');
            eList.appendChild(eMargin);
        }
    });


    if (totalprice > 0) { // show summary only when something is in the cart
        var eTotal = document.createElement("p");
        eTotal.setAttribute("id", "total");
        eTotal.innerText = "Total: " + (Math.round(totalprice * 100) / 100).toFixed(2);
        eTotal.setAttribute("id", "total");
        eList.appendChild(eTotal);
    }

    eTicket.appendChild(eList);

    var eCart = document.getElementById("cart");
    var eCnt = document.getElementById("cnt");
    if (!eCnt) {
        var eCnt = document.createElement("span"); //create cart counter if doesent exist
        eCart.appendChild(eCnt);
        eCnt.setAttribute('id', 'cnt');
    }
    var size = cart.length;
    eCnt.innerHTML = size;
    showTicket();
    console.log(cart);
}

function edit(id) { //editor of specific pizza
    if ($('#editor').length > 0) { //remove previous editor if exist
        $('#editor').remove();
    }


    if (cart[id].size === 'medium') { //check ingredients price
        var ingPrice = 1.00;
    }
    else {
        var ingPrice = 1.50;
    }


    if (cart[id].size === 'medium') {
        var oPizza = data.products[0].types.find(pizza => (pizza.type === cart[id].type)
    )
        ;
        cart[id].price = oPizza.price;
    }
    else {
        var oPizza = data.products[1].types.find(pizza => (pizza.type === cart[id].type)
    )
        ;
        cart[id].price = oPizza.price;
    }

    var addNum = cart[id].addedIngredients.length;
    var addCost = (ingPrice * addNum); // additional cost
    cart[id].payPrice = cart[id].price + addCost;

    ingPrice = ingPrice.toFixed(2);
    var eEdit = document.getElementById("edit");
    var eEditor = document.createElement("div");
    eEditor.setAttribute("id", "editor");
    eEdit.appendChild(eEditor);

    var eName = document.createElement("p");
    eName.innerHTML = "Pizza: " + cart[id].type;
    eEditor.appendChild(eName);

    var eSizeButton = document.createElement("div");
    eSizeButton.setAttribute('class', 'btn btn-dark btn-md');
    var eSize = document.createElement("span");
    eSizeButton.style.fontSize = '10px';
    eSizeButton.addEventListener('click', function (a) {
        if (cart[id].size == 'large') {
            cart[id].size = 'medium';
        } else {
            cart[id].size = 'large';
        }
        edit(id);
    });
    eSize.style.padding = '10px';
    eSize.innerHTML = "Size: " + cart[id].size;
    if (cart[id].size == 'medium') {
        eSizeButton.innerHTML = 'change to large';
    } else {
        eSizeButton.innerHTML = 'change to medium';
    }

    var ePrice = document.createElement("p");
    ePrice.innerHTML = 'Price: ' + cart[id].payPrice.toFixed(2);


    if (cart[id].payPrice != cart[id].price) {
        ePrice.innerHTML += ' (updated) ';
    }

    eEditor.appendChild(eSize);
    eEditor.appendChild(eSizeButton);
    eEditor.appendChild(ePrice);


    var eIngredients = document.createElement("div");
    eIngredients.setAttribute("id", "listOfIng");
    eIngredients.setAttribute("class", "row");

    var eTitle = document.createElement("p");
    eTitle.innerHTML = "Ingredients:";
    eIngredients.appendChild(eTitle);
    cart[id].ingredients.forEach(function (ing, index) { //list of ingredients from THIS pizza
        var eIng = document.createElement("span");
        eIng.setAttribute("class", "col-xs-4");
        eIng.style.width = "calc(50% - 52px)";
        eIng.style.padding = '5px';
        eIng.style.textAlign = 'right';
        var eRemove = document.createElement("span");
        eRemove.setAttribute("class", "remove2 btn btn-dark col-xs-1");
        eRemove.style.width = "42px";
        eRemove.style.paddingRight = '13px';
        var eRem = document.createElement("span");
        eRem.setAttribute("class", "glyphicon glyphicon-trash");

        var eIngredientText = document.createElement("div");
        eIng.appendChild(eIngredientText);
        eIngredientText.innerHTML = ing.type;

        eRemove.appendChild(eRem);
        eIngredients.appendChild(eIng);
        eIngredients.appendChild(eRemove);

        eRemove.addEventListener('click', function (e) { //remove from ingredients
            var ind = cart[id].addedIngredients.findIndex(ingredient => (ingredient.type === ing.type)
        )
            ; //it gives index
            //check of ingredient is on "added list", if yes, remove from "added list instead from THIS pizza"
            if (ind > -1) {
                console.log(ind);
                cart[id].addedIngredients.splice(ind, 1);
                edit(id);
            }
            else {
                cart[id].removedIngredients.push(ing);
                cart[id].ingredients.splice(index, 1);
                edit(id);
            }
        });
    });


    var eAddIng = document.createElement("div");
    eAddIng.setAttribute("id", "listOfAddIng");
    eAddIng.setAttribute("class", "row");
    var eTitle = document.createElement("p");
    eTitle.innerHTML = "Extra ingredients: (+" + addCost.toFixed(2) + ")";
    eAddIng.appendChild(eTitle);

    var arrCnt = []; //count number of each ingredients to group
    var sInd = [];
    cart[id].addedIngredients.forEach(function (ingredient) {
        sInd[ingredient.type] = 0;
    });

    cart[id].addedIngredients.forEach(function (ingredient, ind) { //list of added ingredients

        arrCnt[ingredient.type] = 0;
        cart[id].addedIngredients.forEach(function (ing) {
            if (ingredient.type === ing.type) {
                arrCnt[ingredient.type] += 1;
            }
        });


        if (arrCnt[ingredient.type] > 1) {
            sInd[ingredient.type] += 1; //array to se current index of arrCnt
        }

        var sCnt = "";
        if (arrCnt[ingredient.type] > 1) { //prefix with number of ingredients
            sCnt = arrCnt[ingredient.type] + "x ";
        }
        var eIngredient = document.createElement("span");
        var eIngredientText = document.createElement("div");
        eIngredient.appendChild(eIngredientText);
        eIngredient.setAttribute("class", "col-xs-4");
        eIngredient.style.width = "calc(50% - 52px)";
        eIngredient.style.padding = '5px';
        eIngredient.style.textAlign = 'right';
        var eRem = document.createElement("span");
        eRem.setAttribute("class", "remove2 btn btn-dark col-xs-1");
        eRem.style.width = "42px";
        var eRe = document.createElement("span");
        eRe.setAttribute("class", "glyphicon glyphicon-trash");
        eRem.appendChild(eRe);
        eRem.addEventListener('click', function (e) { //remove from added ingredients
            cart[id].addedIngredients.splice(ind, 1);
            edit(id);
        });
        eIngredientText.setAttribute("id", ingredient.type);
        eIngredientText.innerHTML = sCnt + ingredient.type;
        if (sInd[ingredient.type] < 2) {
            eAddIng.appendChild(eIngredient);
            eAddIng.appendChild(eRem);
        }

    });

    cart[id].removedIngredients.forEach(function (ingredient, ind) { //list of removed ingredients
        var eIngredient = document.createElement("span");
        eIngredient.innerHTML = ingredient.type;
        eIngredient.setAttribute("class", "col-xs-4");
        eIngredient.style.width = "calc(50% - 52px)";
        eIngredient.style.padding = '5px';
        eIngredient.style.textAlign = 'right';
        eIngredient.style.textDecoration = 'line-through';
        eIngredient.style.color = 'red';
        var eRem2 = document.createElement("span");
        eRem2.setAttribute("class", "remove2 btn btn-dark col-xs-1");
        eRem2.style.width = "42px";
        var eRe = document.createElement("span");
        eRe.setAttribute("class", "glyphicon glyphicon-plus");
        eRem2.appendChild(eRe);
        eIngredients.appendChild(eIngredient);
        eIngredients.appendChild(eRem2);
        eRem2.addEventListener('click', function (e) { //remove from removed, bring back to the list
            cart[id].removedIngredients.splice(ind, 1);
            cart[id].ingredients.push(ingredient);
            edit(id);
        });

    });


    var eAllIngredients = document.createElement("div");
    eAllIngredients.setAttribute("id", "listOfAllIng");
    eAllIngredients.setAttribute("class", "row");

    var eTitle = document.createElement("p");
    eTitle.innerHTML = "Add ingredients:";
    eAllIngredients.appendChild(eTitle);

    data.ingredients.forEach(function (ingredient) { //list of all ingredients
        var eIngredient = document.createElement("span");
        var eIngredientText = document.createElement("div");
        eIngredient.appendChild(eIngredientText);
        eIngredientText.innerHTML = ingredient.type;
        eIngredient.setAttribute("class", "col-xs-4");
        eIngredient.style.width = "calc(50% - 52px)";
        eIngredient.style.padding = '5px';
        eIngredient.style.textAlign = 'right';
        var eAdd = document.createElement("span");
        eAdd.setAttribute("class", "remove2 btn btn-dark col-xs-1");

        eAdd.style.paddingLeft = '4px';
        eAdd.style.width = "42px";
        var eAd = document.createElement("span");
        eAd.innerHTML = "+" + ingPrice;
        eAdd.appendChild(eAd);

        var inPizza = 0;
        var added = 0;
        cart[id].ingredients.forEach(function (ing) { //check of is in THIS pizza (as based)
            if (ing.type === ingredient.type) {
                inPizza = 1;
            }
        });


        cart[id].addedIngredients.forEach(function (ing) { //check amount of ing. in THIS pizza (as added)
            if (ing.type === ingredient.type) {
                added += 1;
            }
        });

        if ((added + inPizza) > 2) {
            eAd.innerHTML = "MAX";
        }

        eAdd.addEventListener('click', function (e) { //add to added ingredients


            var ind = cart[id].removedIngredients.findIndex(ing => (ing.type === ingredient.type)
        )
            ;
            if (ind > -1) {
                cart[id].removedIngredients.splice(ind, 1);
                cart[id].ingredients.push(ingredient);
                edit(id);
            }
            else {
                if ((added + inPizza) < 3) { //do not add more than 3 ingredients
                    cart[id].addedIngredients.push(ingredient);
                    edit(id);
                }
            }
        });
        eAllIngredients.appendChild(eIngredient);
        eAllIngredients.appendChild(eAdd);
    });

    eEditor.appendChild(eIngredients);

    if (addCost > 0) {
        eEditor.appendChild(eAddIng);
    }
    eEditor.appendChild(eAllIngredients);

    var eClose = document.getElementById("close");
    eClose.addEventListener('click', function (e) {
        updateCart();
    });
}

function clearAnim() {
    lastline.setAttribute("class", "ticketline row");
}

function showEditor() {
    var eTicket = document.getElementById("ticket");
    var eEditor = document.getElementById("edit");
    eTicket.style.display = 'none';
    eEditor.style.display = 'block';
}

function showTicket() {
    var eTicket = document.getElementById("ticket");
    var eEditor = document.getElementById("edit");
    eTicket.style.display = 'block';
    eEditor.style.display = 'none';
}



function generatePizzas(data) { //display pizza menu
    eTable = document.getElementById('pizzas');
    var count = 0;
    data.products[0].types.forEach(function (pizza) {
        var eTr = document.createElement("tr");
        var ePizza = document.createElement("td");
        var eButton1 = document.createElement("span");
        var eButton2 = document.createElement("span");
        var eBig = document.createElement("td");
        var eSmall = document.createElement("td");
        var eType = document.createElement("p");
        eType.innerHTML = pizza.type;   // names of pizza

        eTr.setAttribute("class", pizza.type);
        ePizza.setAttribute("class", "pizza");
        eButton1.setAttribute("class", "button pizza btn btn-white");
        eButton2.setAttribute("class", "button pizza btn btn-white");
        ePizza.appendChild(eType);
        var arr = []; //to count amount of ingredients

        pizza.ingredients.forEach(function (ing) {  //set zero to all
                arr[ing.type] = 0;
            }
        );

        pizza.ingredients.forEach(function (ing) { //ingredients counter (for each type)
            arr[ing.type] += 1;
        });

        for (var ing in arr)    //list the ingredients
        {
            var eIng = document.createElement("span");
            if (arr[ing] > 1) {                             //show amount of ing. if more than one
                eIng.innerHTML += arr[ing] + "x ";
            }
            eIng.innerHTML += ing;
            //Object.keys(arr).length;          //length of hash map
            if (!(ing === Object.keys(arr).pop())) { //check if this is the last element, if not print coma
                eIng.innerHTML += ', ';
            }
            ePizza.appendChild(eIng);
        }

        eButton1.innerHTML = pizza.price.toFixed(2);
        eSmall.setAttribute("class", "medium");
        eBig.setAttribute("class", "large");
        eButton2.setAttribute("id", "n" + count);
        eTr.appendChild(ePizza);
        eSmall.appendChild(eButton1);
        eBig.appendChild(eButton2);
        eTr.appendChild(eSmall);
        eTr.appendChild(eBig);
        eTable.appendChild(eTr);

        count += 1;


    });

    var pizzas = data.products[1].types;
    for (var i = 0; i < pizzas.length; i++) {
        button = document.getElementById("n" + i);
        button.innerText = pizzas[i].price.toFixed(2);
    }
}