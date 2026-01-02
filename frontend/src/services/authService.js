export async function registerUser(userData) {

    const response = await fetch(`http://localhost:8080/backend_war_exploded/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const json = await response.json();

        if (json.status) {
            alert(json.message);
            window.location.href = "http://localhost:3000/"
        } else {
            alert(json.message);
        }
    } else {
        alert("Something went wrong please try again later..");
    }
}

export async function loginUser(userData) {

    const response = await fetch("http://localhost:8080/backend_war_exploded/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const json = await response.json();

        if (json.status) {
            alert(json.message);
            window.location.href = "http://localhost:3000/"
        } else {
            alert(json.message+"?");
        }
    } else {
        alert("Something went wrong please try again later..");
    }

}
