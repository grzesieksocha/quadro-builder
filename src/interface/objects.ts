export type SetType = "construction_kit" | "extension";

export interface Set {
  type: SetType;
  name: string;
  url: string;
  pictureURL: string;
  pictureName: string;
}

export type DesignType = "core" | "combo" | "mega";

export interface Design {
  code: string;
  name: string;
  type: DesignType;
  url: string;
  pictureURL: string;
  pictureName: string;
  age: number;
  timeToBuild: number;
}
