
class APIHelper {

  fetchNumberOfHours = async (url) => {
    const response = await fetch(url + '/stats/punch_card');
    const data = await response.json();
    const numberOfHours = data.reduce((numberOfHours, day) => {
      if (day[2] > 0) {
        numberOfHours++;
      }
      return numberOfHours;
    }, 0);
    return numberOfHours;
  }

  fetchNumberOfUpdates = async (url) => {
    const response = await fetch(url + '/stats/commit_activity');
    const data = await response.json();
    const numberOfUpdates = data.reduce((numberOfUpdates, week) => {
      numberOfUpdates += week.total;
      return numberOfUpdates;
    }, 0);
    return numberOfUpdates;
  }

  fetchNumberOfContributers = async (url) => {
    const response = await fetch(url + '/stats/contributors');
    const data = await response.json();
    const numberOfContributers = data.length;
    return numberOfContributers;
  }

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