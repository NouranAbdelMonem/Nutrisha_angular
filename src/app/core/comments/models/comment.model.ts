import {TotalsModel} from "../../shared/models/totals.model";
import {OwnerModel} from "../../shared/models/owner.model";

export interface CommentModel {
  "id": string,
  "created": Date,
  "content": string,
  "owner": OwnerModel;
  "reactionType": null,
  "totals": TotalsModel
}

