export interface IRepositoriesResponse {
  size: number;
  page: number;
  pageLen: number;
  next: string;
  previous: string;
  values: IRepository[];
}

interface ILink {
  href: string;
  name: string;
}

export interface IRepository {
  links: {
    self: ILink;
    html: ILink;
    avatar: ILink;
    pullrequests: ILink;
    commits: ILink;
  }
  uuid: string;
  full_name: string;
  updated_on: string;
  owner: {
    display_name: string;
    uuid: string;
    links: {
      self: ILink;
      html: ILink;
      avatar: ILink;
    };
    type: string;
    nickname: string;
  };
}