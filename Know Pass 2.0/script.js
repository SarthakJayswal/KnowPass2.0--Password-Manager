// Mask the password with asterisks
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

// Copy text to clipboard
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            alert("Copied the text: " + txt);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

// Delete a password by website name
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    const arrUpdated = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully Deleted ${website}'s Password`);
    showPasswords();
};

// Display passwords in the table
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");

    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data to Show</td></tr>";
    } else {
        tb.innerHTML = `<tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;

        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="copy" width="15" height="15"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="copy" width="15" height="15"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="copy" width="15" height="15"></td>
                <td><button class="btn" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str;
    }
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};

// Handle form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload or file not found error

    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];

    json.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(json));

    alert("Password Saved");
    showPasswords();
});

// Initialize the table with saved passwords
showPasswords();
