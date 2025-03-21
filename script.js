document.addEventListener("DOMContentLoaded", () => {
    const userContainer = document.querySelector(".user-container");
    const toggleThemeBtn = document.getElementById("toggle-theme");
    const logoutBtn = document.getElementById("logout");
    const body = document.body;
    const loader = document.getElementById("loader");

    // Check if user is logged in
    if(getCookie('email') == null || getLocalStorage('email') == null){
        alert("You are not logged in!");
        window.location.href = "/login.html";
    }
    if(getLocalStorage('theme') == "Dark Mode"){
        body.classList.toggle("dark-theme")
        toggleThemeBtn.textContent = "Light Mode";
    }

    // Fetch user data
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            loader.style.display = "none";
            users.forEach(user => {
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");
                userCard.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                `;
                userContainer.appendChild(userCard);
            });
        })
        .catch(error => console.error("Error fetching users:", error));

    // Theme Toggle
    toggleThemeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        saveLocalStorage("theme", toggleThemeBtn.textContent);
        toggleThemeBtn.textContent = body.classList.contains("dark-theme") ? "Light Mode" : "Dark Mode";
    });

    

    // Logout
    logoutBtn.addEventListener("click", () => {
        deleteCookie('email');
        deleteLocalStorage('email');
        alert("Logging out...");

        window.location.href = "/login.html"; // Redirect to login page
    });
});




function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorage(key){
    return localStorage.getItem(key)
}

function saveCookie(key, value){
    document.cookie = key + '=' + value;
}

function getCookie(key){
    let cookies = document.cookie.split(';')
    for(let cookie of cookies){
        const [ckey, value] = cookie.split('=');
        if(key == ckey){
            return value;
        }
    }
    return null;
}


function deleteCookie(key){
    document.cookie = '';
}

function deleteLocalStorage(key){
    localStorage.removeItem(key);
}