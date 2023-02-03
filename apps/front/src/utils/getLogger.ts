import { Logger } from "tslog";

export function getLogger(name: string) {
  return new Logger({
    name,
    type: "pretty",
    prettyLogTemplate: "[{{hh}}:{{MM}}:{{ss}}.{{ms}}] {{logLevelName}} [{{name}}] ",
    prettyLogTimeZone: "local",
  });
}
