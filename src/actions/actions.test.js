import { signInClient, clientError, signInDev, devError, createProblemClient, createProblemTitle, createProblemBody} from "./actions";

describe('signInClient', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'SIGN_IN_CLIENT', user: 'tony'};

    const actual = signInClient('tony');

    expect(actual).toEqual(expected);
  });
});

describe('clientError', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CLIENT_ERROR', error: 'client error'};
    
    const actual = clientError('client error')

    expect(actual).toEqual(expected);
  });
});

describe('signInDev', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'SIGN_IN_DEV', user: 'tony'};
    
    const actual = signInDev('tony')

    expect(actual).toEqual(expected);
  });
});

describe('devError', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'DEV_ERROR', error: 'dev error'};
    
    const actual = devError('dev error')

    expect(actual).toEqual(expected);
  });
});

describe('createProblemClient', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CREATE_PROBLEM_CLIENT', client: 'tony'};
    
    const actual = createProblemClient('tony')

    expect(actual).toEqual(expected);
  });
});

describe('createProblemTitle', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CREATE_PROBLEM_TITLE', title: 'problem title'};
    
    const actual = createProblemTitle('problem title')

    expect(actual).toEqual(expected);
  });
});

describe('createProblemBody', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CREATE_PROBLEM_BODY', body: 'problem body'};
    
    const actual = createProblemBody('problem body');

    expect(actual).toEqual(expected);
  });
});

