import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse =
  ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface IPlaylist {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedPlaylistObject[];
}

export type GetPlaylistResponse = SimplifiedPlaylistObject;
