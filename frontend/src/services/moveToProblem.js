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

            if(json.status){

            }else{

            }

        }
    } catch (error) {
        console.error("Error:", error);
    }
};