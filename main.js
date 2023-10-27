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
                // console.log('Parsed data', parsedData) 

                // filter the data to only include amico pipeline employes mark up
                const pipeEstOnlyData = parsedData.filter((item) => item.Author === "ABalkaran");
                console.log('Pipe Estimator Mark up only', pipeEstOnlyData);

                // filter estimators mark up for all valves. 
                const valveData = pipeEstOnlyData.filter((item) => item.Subject === "BALL VALVE");
                console.log('Pipe est valves mark up:', valveData);
                

                // Group and count by "Subject," "Page Label," and "Label"
                const groupedData = valveData.reduce((acc, item) => {
                const {Subject, "Page Label": pageLabel, Label, Count} = item;
                    // Create a unique key for each combination of "Subject," "Page Label," and "Label"
                    const key = `${Subject}_${pageLabel}_${Label}`;

                    //check if key exist if not creat it
                    if (!acc[key]) {
                        acc[key] = {
                            Subject, 
                            "Page Label": pageLabel, 
                            Label, 
                            Count: 0
                        }
                    }

                    //add the count to the current item to the key 
                    acc[key].Count += Count;
                    return acc;
                }, {});

                // Convert the grouped data into an array
                const groupedArray = Object.values(groupedData);
                console.log("THIS IS FILTERD:", groupedArray);
            }
        });
    } else {
        console.log("No file was slected");
    }         
};