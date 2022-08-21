export type SetType = "construction_kit" | "extension";

export interface Set {
  type: SetType;
  name: string;
  url: string;
  pictureURL: string;
  pictureName: string;
}
