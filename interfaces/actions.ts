import { UnknownExtra } from "graasp";

export interface Action<T extends UnknownExtra = UnknownExtra> {
  memberId: string;
  itemId: string;
  memberType: string;
  itemType: string;
  actionType: string;
  createdAt: string;
  updatedAt: string;
}
