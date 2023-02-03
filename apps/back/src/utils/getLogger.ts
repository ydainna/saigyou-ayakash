import { Logger } from "tslog";

// Create a logger instance with default settings
export function getLogger(name: string) {
  return new Logger({
    name,
    type: "pretty",
    prettyLogTemplate: "[{{dd}}/{{mm}}/{{yyyy}} {{hh}}:{{MM}}:{{ss}}.{{ms}}] {{logLevelName}} [{{name}}] ",
    prettyLogTimeZone: "local",
  });
}