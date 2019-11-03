import { Record } from "immutable"

const DEFAULTS = {
  block: "",
  line: "",
}

/**
 * The plugin options container
 */
export class Options extends Record(DEFAULTS) {}
