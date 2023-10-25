// Add an event listener to the file input
csvInput = document.getElementById('csvInput');
csvInput.addEventListener('change', handleFileSelect);

// Function to handle file selection and parsing
function handleFileSelect (event) {
    // Get File element and acess selected file
    const fileElement = event.target;
    const file = fileElement.files[0];

    // Check if a file was selected
    if (file) {
        console.log('File was slected.')
        Papa.parse(file, {
            header: true, 
            dynamicTyping: true,
            complete: function (results) {
                const parsedData = results.data
                console.log('Parsed data', parsedData)

            // filter the data to only include amico pipeline employes mark up
            const pipeEstOnlyData = parsedData.filter((item) => item.Author === "ABalkaran")
                console.log('Pipe Estimator Mark up only', pipeEstOnlyData)

            // // Group and count by "Subject," "Page Label," and "Label"
            // const groupedData = pipeEstOnlyData.reduce((acc, item) => {

            // }
            // )

            }
        });
    } else {
        console.log("No file was slected");
    }         
};