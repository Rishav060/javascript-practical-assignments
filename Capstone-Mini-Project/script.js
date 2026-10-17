
console.log("--- Initializing Inventory System ---");

const inventory = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];

const getCategory = (price) => {
    if (price < 50) return "Budget";
    else if (price < 200) return "Standard";
    else return "Premium";
};

function calculateTotal(items) {
    let total = 0;

    for (const item of items) {
        if (!item.name || !Number.isFinite(item.price)) continue;
        total += item.price;
    }

    return total;
}

function calculateFinalPrice(price, tax = 0, discount = 0) {
    let amount = price + (price * tax / 100);
    amount -= amount * discount / 100;
    return amount;
}

function displayInventory() {
    const roster = document.getElementById("inventory");
    const affordableList = document.getElementById("affordable");
    const reportList = document.getElementById("report");

    roster.innerHTML = "";
    affordableList.innerHTML = "";
    reportList.innerHTML = "";

    inventory.forEach(item => {
        let badge;

        switch (getCategory(item.price)) {
            case "Budget":
                badge = "Budget";
                break;
            case "Standard":
                badge = "Standard";
                break;
            case "Premium":
                badge = "Premium";
                break;
            default:
                badge = "Unknown";
        }

        const row = document.createElement("div");
        row.className = "product";

        const details = document.createElement("span");
        details.textContent = `${item.name} - $${item.price}`;

        const category = document.createElement("span");
        category.className = "badge";
        category.textContent = badge;

        row.append(details, category);
        roster.appendChild(row);
    });

    const affordable = inventory.filter(item => item.price < 200);

    affordable.forEach(item => {
        const row = document.createElement("p");
        row.textContent = `${item.name} - $${item.price}`;
        affordableList.appendChild(row);
    });

    const report = inventory.map(
        item => `${item.name.toUpperCase()}: $${item.price}`
    );

    report.forEach(tag => {
        const row = document.createElement("p");
        row.textContent = tag;
        reportList.appendChild(row);
    });

    document.getElementById("totalProducts").textContent =
        inventory.length;

    document.getElementById("totalValue").textContent =
        "$" + calculateTotal(inventory);

    console.log("\n--- Processing Inventory Roster (forEach) ---");
    inventory.forEach(item => {
        console.log(
            `* Item: ${item.name} ($${item.price}) -> Category: ${getCategory(item.price)}`
        );
    });

    console.log("\n--- Financial Analytics ---");
    console.log("Total Inventory Value: $" + calculateTotal(inventory));
    console.log(
        "Filtered Affordable Items (Under $200):",
        affordable.map(item => item.name)
    );
    console.log("Formatted Report List:", report);
    console.log(
        "Laptop after 10% tax and 5% discount: $" +
        calculateFinalPrice(800, 10, 5).toFixed(2)
    );
}

document.getElementById("addProduct").addEventListener("click", () => {
    const nameInput = document.getElementById("productName");
    const priceInput = document.getElementById("productPrice");
    const message = document.getElementById("message");

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (name === "" || priceInput.value.trim() === "" ||
        !Number.isFinite(price) || price <= 0) {
        message.textContent = "Please enter a valid name and positive price.";
        message.style.color = "red";
        return;
    }

    inventory.push({ name, price });

    message.textContent = "Product added successfully!";
    message.style.color = "green";

    nameInput.value = "";
    priceInput.value = "";

    displayInventory();
});

displayInventory();
