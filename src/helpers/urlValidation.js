export const urlValidate = ( url ) => {
  const sections = url.split('/');
  const characters = url.split('')
  const forwardSlashs = characters.filter(character => character === '/')
  const protocall = 'https:';
  const site = 'github.com';
  let result = true;
  
  if (sections[0] !== protocall) {
    result = false;
  }
  if (sections[2] !== site) {
    result = false;
  }
  if (forwardSlashs.length !== 4) {
    result = false;
  }

  return result;
}