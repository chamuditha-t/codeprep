export const moveToProblem = async () => {
    try {
        const response = await fetch('http://localhost:8080/backend_war_exploded/nextProblem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (response.ok) {
            const json = await response.json();

            if (json.status) {
                console.log(json);
                document.getElementById("descriptionBox").innerHTML = json.content.description;
                document.getElementById("problemTitle").innerHTML = json.problem.title;
                document.getElementById("language").innerHTML = json.language;
                localStorage.setItem("problemId",json.problem.id);
                return json;
            } else {
                console.log("Something went wrong");
            }

        } else {
            console.log("Something went wrong");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};