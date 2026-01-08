import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/fields";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/batching";
import "@pnp/sp/sputilities";
import "@pnp/sp/context-info";

class SharePointApi {
  private _sp: SPFI = null;

  public getSP(context?: any): SPFI {
    if (this._sp === null && context !== null) {
      this._sp = spfi()
        .using(SPFx(context))
        .using(PnPLogging(LogLevel.Warning));
    }
    return this._sp;
  }
  public getSPWithUrl(siteUrl: string, context: any): SPFI {
    return spfi(siteUrl)
      .using(SPFx(context))
      .using(PnPLogging(LogLevel.Warning));
  }
}

export default SharePointApi;
