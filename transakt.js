(function() {
    const createIntentEndpoint = 'http://localhost:3000/api/intents/intent';
    const payPageUrl = 'https://example.com/pay';
    // Function to create the button and inject it into the DOM
    function createButton(apiKey) {
        const btnContainer = document.getElementById('transakt-btn');
        if (!btnContainer) {
            console.error('Element with ID "transakt-btn" not found.');
            return;
        }

        const button = document.createElement('button');
        button.textContent = 'Transact';
        button.id = 'transakt-button';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#007bff';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.cursor = 'pointer';

        btnContainer.appendChild(button);

        button.addEventListener('click', function() {
            handleClick(apiKey);
        });
    }

    // Function to handle button click
    function handleClick(apiKey) {
        const requestData = {
            // Add your request payload here
            apiKey: apiKey // Include the API key in the request
        };

        // Simulate a POST request using Fetch API
        fetch(createIntentEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            // Simulate successful response
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Request failed.');
            }
        })
        .then(data => {
            // Check if the response is successful
            if (data.success) {
                // Redirect to the specified site with params
                const redirectUrl = `${payPageUrl}/${data.data.intentId}`
                window.location.href = redirectUrl;
            } else {
                console.error('Request failed:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to get the API key from the script URL
    function getApiKeyFromScript() {
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            const src = script.src;
            const url = new URL(src);
            const apiKey = url.searchParams.get('apikey');
            if (apiKey) {
                return apiKey;
            }
        }
        return null;
    }

    // Wait for the DOM to load before creating the button
    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = getApiKeyFromScript();
        if (apiKey) {
            createButton(apiKey);
        } else {
            console.error('API key not found in script URL.');
        }
    });

    // Mock the endpoint for testing
    // This part is necessary only if you do not have an actual endpoint to test against
    // if (window.location.hostname === 'localhost') {
    //     (function() {
    //         const originalFetch = window.fetch;
    //         window.fetch = function(url, options) {
    //             if (url === 'http://localhost:8000/createIntent') {
    //                 return new Promise((resolve) => {
    //                     setTimeout(() => {
    //                         resolve(new Response(JSON.stringify({
    //                             success: true,
    //                             message: 'Intent created successfully'
    //                         }), {
    //                             status: 200,
    //                             headers: {
    //                                 'Content-type': 'application/json'
    //                             }
    //                         }));
    //                     }, 1000);
    //                 });
    //             } else {
    //                 return originalFetch(url, options);
    //             }
    //         };
    //     })();
    // }
})();
