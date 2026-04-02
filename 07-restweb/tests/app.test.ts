import { envs } from "../src/config/envs";
import { Server } from "../src/presentation/server";
import { main } from "../src/app";

jest.mock("../src/presentation/server");

describe("Testing App.ts", () => {
  test("should call server with arguments and start", () => {
    main();

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      publicPath: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });
    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
