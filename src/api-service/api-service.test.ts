import axios, { AxiosError } from "axios";
import MockAdapter  from "axios-mock-adapter";
import appConfig from "@/config";
import { mockPeople } from "@/test/mock-people";
import { fetchPeople } from ".";

const mockAxios = new MockAdapter(axios);

mockAxios.onGet(`${appConfig.baseAPIUrl}/people`)
  .reply(200, mockPeople);

afterAll(() => { 
  mockAxios.restore();
});

describe("fetchPeople", () => {
  it("should fetch people", async () => {
    const response = fetchPeople();
    const data = await response();
    expect(data).toEqual(mockPeople);
  });

  it("should return an error for a bad request", async () => {
    mockAxios.onGet(`${appConfig.baseAPIUrl}/people`).reply(400);
    try {
      const response = fetchPeople();
      await response();
    } catch (error) {
      if (error) {
        expect((error as AxiosError).response?.status).toBe(400);
      }
    }
  });

});
