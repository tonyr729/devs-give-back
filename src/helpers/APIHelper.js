
class APIHelper {

  
  fetchLinesOfCode = async (url) => {
    const response = await fetch(url + '/stats/code_frequency');
    const data = await response.json();
    const linesOfCode = data.reduce((linesOfCode, dayInfo) => {
      linesOfCode += dayInfo[1];
      return linesOfCode;
    }, 0);
    return linesOfCode;
  }
}

export default APIHelper;