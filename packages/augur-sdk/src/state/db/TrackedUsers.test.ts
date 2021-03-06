import {TrackedUsers} from "./TrackedUsers";
import {PouchDBFactory} from "./AbstractDB";

const TEST_NETWORK_ID = 4;
const DB_FACTORY = PouchDBFactory({adapter: "memory"});

test("track a user", async () => {
  const trackedUsers = new TrackedUsers(TEST_NETWORK_ID, DB_FACTORY);

  let err: Error;
  try {
    await trackedUsers.setUserTracked("mock");
  } catch (e) {
    err = e;
  }
  await expect(err.message).toMatch(/^invalid address/);

  expect(await trackedUsers.getUsers()).toEqual([]);
});
