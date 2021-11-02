import { preferences } from "@raycast/api";
import fetch, { Headers } from "node-fetch";
import { IRepositoriesResponse, IRepository } from "./interfaces/Repositories";

export class BitbucketClient {
  private username: string = preferences.username.value as string;
  private appPassword: string = preferences.app_password.value as string;

  async getRepositories(): Promise<IRepository[]> {
    const res = await fetch(`https://api.bitbucket.org/2.0/repositories`, {
      method: 'GET',
      headers: this.headers,
    });
    if (res.status === 200) {
      const data = await res.json() as IRepositoriesResponse;
      console.log(data.values[0].owner);
      return data.values;
    } else {
      throw new Error(`Couldn't fetch repositories. The following status was returned: ${res.status} - ${res.statusText}`);
    }
  }

  private get headers(): Headers {
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(this.username + ":" + this.appPassword).toString('base64'));
    return headers;
  }

}
