import { Record } from "immutable"

const DEFAULTS = {
  block: "",
  line: "",
  exitBlockType: "paragraph",
  selectAll: true,
  allowMarks: false,
  getIndent: null,
}

/**
 * The plugin options container
 */
export class Options extends Record(DEFAULTS) {}
