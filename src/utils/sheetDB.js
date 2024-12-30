const SHEET_DB_URL = 'https://sheetdb.io/api/v1/0o7tep4qvzcgz';

export const saveToSheetDB = async (day, type, data) => {
  try {
    console.log('Attempting to save:', { day, type });

    // If there's image data, format it for the sheet
    let formattedData = { ...data };
    if (data.imageUrl) {
      formattedData = {
        ...data,
        // Create an image formula for Google Sheets
        imageFormula: `=IMAGE("${data.imageUrl}")`,
        // Store the actual image data in a separate column
        imageData: data.imageUrl
      };
      delete formattedData.imageUrl;
    }

    const response = await fetch(SHEET_DB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [{
          timestamp: new Date().toISOString(),
          day,
          type,
          data: JSON.stringify(formattedData),
          userId: localStorage.getItem('userId') || 'anonymous'
        }]
      })
    });

    const result = await response.json();
    console.log('SheetDB Response:', result);
    return result;
  } catch (error) {
    console.error('Error saving to SheetDB:', error);
    return null;
  }
}; 