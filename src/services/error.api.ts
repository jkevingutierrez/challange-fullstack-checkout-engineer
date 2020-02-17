class ErrorService {
  reportError(error: Error) {
    console.error(error);
  }
}

export default new ErrorService();
