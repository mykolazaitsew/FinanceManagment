// Class to handle user-related functionalities
class User {
    constructor(name = '') {
        this.name = name;
    }

    // Method to update the document title and heading
    updateTitleAndHeading() {
        document.querySelector('h1').textContent = `${this.name}'s finances`;
    }
}

// Class to handle the theme switching functionality
class Theme {
    constructor(toggleElementId) {
        this.toggleElement = document.getElementById(toggleElementId);
        this.initializeThemeToggle();
    }

    // Initialize the theme toggle (dark mode)
    initializeThemeToggle() {
        this.toggleElement.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', this.toggleElement.checked);
        });
    }
}

//Class to add money to the bank account
class AddCash {
    constructor() {
        this.money = 0;
    }

    addMoney(amount) {
        this.money += amount;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById("balance").innerText = `Balance: ${this.money.toFixed(2)} ₴`;
    }   
}

//Class to hide money
class HideMoney {
    constructor(addCashInstance){
        this.addCashInstance = addCashInstance;
        this.isHidden = false;
    }

    hideMoney() {
        this.isHidden = !this.isHidden;
        this.updateDisplay();
    }

    updateDisplay() {
        const balanceElement = document.getElementById("balance");
        if (this.isHidden) {
            balanceElement.innerText = "Balance: *** ₴"; // Mask the balance
        } else {
            balanceElement.innerText = `Balance: ${this.addCashInstance.money.toFixed(2)} ₴`; // Show actual balance
        }
    }
}

// Class to manage the overall app lifecycle
class App {
    constructor() {
        this.user = null;
        this.theme = null;
        this.addCash = new AddCash();
        this.hideMoney = new HideMoney(this.addCash);   
        this.initializeApp();
    }

    // Initialize app functionality
    initializeApp() { 
        this.initializeTheme();
        this.initializeUser();
        this.initializeAddCash();
        this.initializeHideMoney();
    }

    // Initialize the theme switch functionality
    initializeTheme() {
        this.theme = new Theme('darkModeToggle');
    }

    // Initialize the user-related functionalities
    initializeUser() {
        document.addEventListener('DOMContentLoaded', () => {
            const userName = prompt('Please enter your name:');
            if (userName) {
                this.user = new User(userName);
                this.user.updateTitleAndHeading();
            } else {
                this.user = new User();
            }   
        });
    }

    initializeAddCash() {
        // Select the add button and add an event listener for clicks
        document.getElementById('balanceBtn').addEventListener('click', () => {
            this.addCash.addMoney(10); // Adds 10 UAH per click
        });
    }

    initializeHideMoney() {
        document.getElementById('chest').addEventListener('click', () => {
            this.hideMoney.hideMoney();// Hide balance
        });
    }
}

// Create an instance of the App class
new App();
