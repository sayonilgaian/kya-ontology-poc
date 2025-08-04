// Create a file called ui-plan-client.js

/**
 * Fetch UI Plan using the streaming endpoint
 * @param {string} figmaUrl - The Figma share URL
 * @param {string} token - The Figma API token
 * @returns {Promise<Object>} - The processed UI plan
 */
async function fetchStreamingUIPlan(figmaUrl, token) {
  const apiUrl = 'http://localhost:8080/api/v1/ui-plan/stream';
  
  try {
    // Make the request to the streaming endpoint
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: figmaUrl, token }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    // Set up streaming response handling
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let result = {};

    // Process the stream
    console.log('Starting to receive UI plan data...');
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        // Process any remaining data in the buffer
        if (buffer) {
          try {
            // Try to parse the final chunk
            const finalChunk = JSON.parse(buffer);
            result = finalChunk;
          } catch (e) {
            console.warn('Error parsing final chunk:', e);
          }
        }
        break;
      }
      
      // Decode the chunk and add to buffer
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      // Log progress
      console.log(`Received ${buffer.length} bytes of data`);
      
      // Try to parse complete JSON objects from the buffer
      try {
        result = JSON.parse(buffer);
        // Clear buffer after successful parse
        buffer = '';
        
        // You can start processing parts of the UI plan here
        // For example, render the top-level structure while details are still loading
        console.log('Parsed a complete chunk of the UI plan');
        
        // Optional: Dispatch an event to notify UI components
        document.dispatchEvent(new CustomEvent('uiplan-chunk-received', { 
          detail: { partial: true, data: result }
        }));
      } catch (e) {
        // Incomplete JSON, continue buffering
        // This is expected for chunked responses
      }
    }

    console.log('Finished receiving UI plan data');
    
    // Notify that the complete UI plan is available
    document.dispatchEvent(new CustomEvent('uiplan-received', { 
      detail: { partial: false, data: result }
    }));
    
    return result;
  } catch (error) {
    console.error('Error fetching UI plan:', error);
    throw error;
  }
}

// Example usage
async function loadAndRenderUIPlan() {
  const figmaUrl = 'https://www.figma.com/file/abcdef123456/Design?node-id=123:456&token=figd_xyz';
  const token = 'your-figma-token';
  
  try {
    // Show loading state
    document.getElementById('loading-indicator').style.display = 'block';
    
    // Set up event listeners for incremental updates
    document.addEventListener('uiplan-chunk-received', (event) => {
      // Update UI with partial data
      const partialData = event.detail.data;
      renderPartialUIPlan(partialData);
    });
    
    // Fetch the UI plan
    const uiPlan = await fetchStreamingUIPlan(figmaUrl, token);
    
    // Render the complete UI plan
    renderCompleteUIPlan(uiPlan);
    
    // Hide loading indicator
    document.getElementById('loading-indicator').style.display = 'none';
  } catch (error) {
    // Handle errors
    document.getElementById('error-message').textContent = error.message;
    document.getElementById('error-container').style.display = 'block';
    document.getElementById('loading-indicator').style.display = 'none';
  }
}

// Render functions (implement these based on your UI framework)
function renderPartialUIPlan(data) {
  // Render the UI plan structure as it comes in
  console.log('Rendering partial UI plan:', data);
  // Example: Update a progress indicator
  const progress = document.getElementById('loading-progress');
  progress.textContent = `Processing UI plan... (${data.uiPlan?.atoms?.length || 0} atoms processed)`;
}

function renderCompleteUIPlan(data) {
  console.log('Rendering complete UI plan:', data);
  // Implement your rendering logic here
}