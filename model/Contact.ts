import { Model } from "@nozbe/watermelondb";
import { date, readonly, text } from "@nozbe/watermelondb/decorators";

export class Contact extends Model {
  static table = "contacts";

  @text("name") name!: string;
  @text("phone") phone!: string;
  @text("email") email!: string;
  @text("image") image!: string;
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
