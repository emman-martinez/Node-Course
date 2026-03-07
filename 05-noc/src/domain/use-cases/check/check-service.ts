interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    // private is used to automatically create and initialize class properties from constructor parameters
    // readonly indicates that the property cannot be reassigned after initialization
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {
    // Initialize any necessary properties or dependencies here
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}, url: ${url}`);
      }

      this.successCallback(); // Call the success callback if the request was successful

      return true; // Return true if the request was successful
    } catch (error) {
      console.error(`Error fetching URL: ${url}`, error);

      this.errorCallback(`${error}`); // Call the error callback if there was an error

      return false; // Return false if there was an error fetching the URL
    }
  }
}
