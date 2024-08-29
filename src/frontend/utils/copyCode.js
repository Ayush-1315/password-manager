export async function copyTextFromDiv(divId) {
    try {
      // Get the div element by its ID
      const div = document.getElementById(divId);
      
      if (div) {
        // Get the text content from the div
        const text = div.textContent || div.innerText;
        
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(text);
        
        console.log('Text copied to clipboard');
      } else {
        console.error('Div not found');
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }