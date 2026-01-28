export const submitProblem = async () => {
    const response = await fetch("http://localhost:8080/backend_war_exploded/submitProblem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            problemId: localStorage.getItem("problemId")
        })
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert("successfully finished problem.next problem")
            window.location.reload();
        } else {

        }
    } else {
        console.log("Something went wrong try again later");
    }
};
