
class APIHelper {

  fetchNumberOfHours = async (url) => {
    const response = await fetch(url + '/stats/punch_card');
    if (response.ok) {
      const data = await response.json();
      const numberOfHours = data.reduce((numberOfHours, day) => {
        if (day[2] > 0) {
          numberOfHours++;
        }
        return numberOfHours;
      }, 0);
      return numberOfHours;
    } else {
      throw Error(response.statusText)
    }

  }

  fetchNumberOfUpdates = async (url) => {
    const response = await fetch(url + '/stats/commit_activity');
    if (response.ok) {
      const data = await response.json();
      const numberOfUpdates = data.reduce((numberOfUpdates, week) => {
        numberOfUpdates += week.total;
        return numberOfUpdates;
      }, 0);
      return numberOfUpdates;
    } else {
      throw Error(response.statusText)
    }
  }
  
  fetchNumberOfContributers = async (url) => {
    const response = await fetch(url + '/stats/contributors');
    if (response.ok) {
      const data = await response.json();
      const numberOfContributers = data.length;
      return numberOfContributers;
    } else {
      throw Error(response.statusText)
    }
  }
  
  fetchLinesOfCode = async (url) => {
    const response = await fetch(url + '/stats/code_frequency');
    if (response.ok) {
      const data = await response.json();
      const linesOfCode = data.reduce((linesOfCode, dayInfo) => {
        linesOfCode += dayInfo[1];
        return linesOfCode;
      }, 0);
      return linesOfCode;
    } else {
      throw Error(response.statusText)
    }
  }
}

export default APIHelper;