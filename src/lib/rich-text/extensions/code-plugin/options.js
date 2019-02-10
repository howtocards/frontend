import { Record } from "immutable"

const DEFAULTS = {
  block: "",
  line: "",
  exitBlockType: "paragraph",
  selectAll: true,
  getIndent: null,
}

/**
 * The plugin options container
 */
export class Options extends Record(DEFAULTS) {}
