export const imports = {
  "src/ui/index.mdx": () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ui-index" */ "src/ui/index.mdx"),
  "src/ui/pages.mdx": () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ui-pages" */ "src/ui/pages.mdx"),
  "src/ui/atoms/index.mdx": () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ui-atoms-index" */ "src/ui/atoms/index.mdx"),
  "src/ui/molecules/index.mdx": () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ui-molecules-index" */ "src/ui/molecules/index.mdx"),
  "src/ui/organisms/index.mdx": () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ui-organisms-index" */ "src/ui/organisms/index.mdx"),
  "src/ui/templates/index.mdx": () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ui-templates-index" */ "src/ui/templates/index.mdx"),
}
