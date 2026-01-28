export const runCode = async (code, language, input = "") => {
    try {
        const response = await fetch("http://localhost:8080/backend_war_exploded/RunCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: language,
                code: code,
                input: input
            })
        });

        if (!response.ok) {
            console.error("Network error:", response.status, response.statusText);
            return { success: false, error: "Network error" };
        }

        const json = await response.json();
        console.log(json);
        if (json.success) {
            console.log("Program Output:", json.output);
            document.getElementById("outputPanel").innerHTML = json.output;
            return true;
        } else {
            console.warn("Error Type:", json.type);
            console.warn("Error Message:", json.error);
            document.getElementById("outputPanel").innerHTML = json.error;
            document.getElementById("outputPanel").style.color = "red";

            // return { success: false, type: json.type, error: json.error };
        }

    } catch (err) {
        // Unexpected JS error
        console.error("Fetch failed:", err);
        return { success: false, error: err.message };
    }
};
