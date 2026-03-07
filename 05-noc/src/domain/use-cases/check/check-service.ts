interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}, url: ${url}`);
      }

      console.log(`Successfully fetched URL: ${url}`);

      return true; // Return true if the request was successful
    } catch (error) {
      console.error(`Error fetching URL: ${url}`, error);
      return false; // Return false if there was an error fetching the URL
    }
  }
}
