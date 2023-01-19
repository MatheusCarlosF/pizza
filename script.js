let cart = [];
let modalQt = 1;
let modalKey = 0;

const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

// Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = qs(".models .pizza-item").cloneNode(true);

    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;
    pizzaItem.querySelector(
        ".pizza-item--price"
    ).innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        let key = e.target.closest(".pizza-item").getAttribute("data-key");
        modalQt = 1;
        modalKey = key;

        qs(".pizzaBig img").src = pizzaJson[key].img;
        qs(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        qs(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
        qs(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
            key
        ].price.toFixed(2)}`;
        qs(".pizzaInfo--size.selected").classList.remove("selected");
        qsa(".pizzaInfo--size").forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add("selected");
            }
            size.querySelector("span").innerHTML =
                pizzaJson[key].sizes[sizeIndex];
        });

        qs(".pizzaInfo--qt").innerHTML = modalQt;

        qs(".pizzaWindowArea").style.opacity = 0;
        qs(".pizzaWindowArea").style.display = "flex";
        setTimeout(() => {
            qs(".pizzaWindowArea").style.opacity = 1;
        }, 200);
    });

    qs(".pizza-area").append(pizzaItem);
});

// Eventos do MODAL
function closeModal() {
    qs(".pizzaWindowArea").style.opacity = 0;
    setTimeout(() => {
        qs(".pizzaWindowArea").style.display = "none";
    }, 500);
}
qsa(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
    (item) => {
        item.addEventListener("click", closeModal);
    }
);
qs(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (modalQt > 1) {
        modalQt--;
        qs(".pizzaInfo--qt").innerHTML = modalQt;
    }
});
qs(".pizzaInfo--qtmais").addEventListener("click", () => {
    modalQt++;
    qs(".pizzaInfo--qt").innerHTML = modalQt;
});
qsa(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
        qs(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected");
    });
});

window.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

qs(".pizzaInfo--addButton").addEventListener("click", () => {
    let size = parseInt(
        qs(".pizzaInfo--size.selected").getAttribute("data-key")
    );
    let identifier = pizzaJson[modalKey].id + "@" + size;
    let key = cart.findIndex((item) => item.identifier == identifier);
    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt,
        });
    }
    updateCart();
    closeModal();
});

function updateCart() {
    if (cart.length > 0) {
        qs("aside").classList.add("show");
        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            console.log(`pizzaItem  pizzaItem`, pizzaItem);
        }
    } else {
        qs("aside").classList.remove("show");
    }
}
