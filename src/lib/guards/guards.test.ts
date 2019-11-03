import { compileGuards } from "./index"

test("should set exact to routes", () => {
  const Foo = () => null
  const Bar = () => null

  const source = [
    { path: "/foo", component: Foo },
    { path: "/bar", component: Bar },
  ]

  const expected = [
    { path: "/foo", component: Foo, exact: true },
    { path: "/bar", component: Bar, exact: true },
  ]

  expect(compileGuards(source, {})).toEqual(expected)
})

test("should remove guards field", () => {
  const Foo = () => null
  const Bar = () => null

  const source = [
    { path: "/foo", component: Foo, guards: [] },
    { path: "/bar", component: Bar, guards: [] },
  ]

  const expected = [
    { path: "/foo", component: Foo, exact: true },
    { path: "/bar", component: Bar, exact: true },
  ]

  expect(compileGuards(source, {})).toEqual(expected)
})

test("guard return another component", () => {
  const Foo = () => "foo"
  const Bar = () => "bar"
  const Modified = () => "modified"

  const guard = ({ path }) => ({ path, component: Modified })

  const source = [
    { path: "/foo", component: Foo, guards: [guard] },
    { path: "/bar", component: Bar, guards: [guard] },
  ]

  const expected = [
    { path: "/foo", component: Modified, exact: true },
    { path: "/bar", component: Modified, exact: true },
  ]

  expect(compileGuards(source, {})).toEqual(expected)
})

test("guard changes path", () => {
  const Foo = () => "foo"
  const Bar = () => "bar"

  const guard = ({ path, component }) => ({
    path: `/private${path}`,
    component,
  })

  const source = [
    { path: "/foo", component: Foo, guards: [guard] },
    { path: "/bar", component: Bar, guards: [guard] },
  ]

  const expected = [
    { path: "/private/foo", component: Foo, exact: true },
    { path: "/private/bar", component: Bar, exact: true },
  ]

  expect(compileGuards(source, {})).toEqual(expected)
})

test("guard removes route", () => {
  const Foo = () => "foo"
  const Bar = () => "bar"
  const Baz = () => "baz"

  const guardA = () => null
  const guardB = () => {}

  const source = [
    { path: "/foo", component: Foo, guards: [guardA] },
    { path: "/bar", component: Bar, guards: [guardB] },
    { path: "/baz", component: Baz, guards: [] },
  ]

  const expected = [{ path: "/baz", component: Baz, exact: true }]

  expect(compileGuards(source, {})).toEqual(expected)
})

test("first guard removes route second do not called", () => {
  const Foo = () => "foo"
  const Bar = () => "bar"
  const None = () => null

  const first = () => null
  const second = () => ({ path: "/hello", component: None })

  const source = [
    { path: "/foo", component: Foo, guards: [first, second] },
    { path: "/bar", component: Bar, guards: [second] },
  ]

  const expected = [{ path: "/hello", component: None, exact: true }]

  expect(compileGuards(source, {})).toEqual(expected)
})

test("second guard receives modified route", () => {
  const Foo = () => "foo"
  const Bar = () => "bar"

  const first = (route) => ({
    path: route.path,
    component: () => `${route.component()} modified`,
  })
  const second = (route) => ({
    path: `${route.path}/hello`,
    component: route.component,
  })

  const source = [
    { path: "/foo", component: Foo, guards: [first, second] },
    { path: "/bar", component: Bar, guards: [second] },
  ]

  const result = compileGuards(source, {})

  expect(result[0].path).toBe("/foo/hello")
  expect(result[0].component()).toBe("foo modified")

  expect(result[1].path).toBe("/bar/hello")
  expect(result[1].component).toBe(Bar)
})

test("guard receives context", () => {
  const Foo = () => "foo"
  const Bar = () => "bar"
  const None = () => null

  const context = { hideFor: "/foo" }

  const guard = (route, { hideFor }) =>
    hideFor === route.path ? { path: route.path, component: None } : route

  const source = [
    { path: "/foo", component: Foo, guards: [guard] },
    { path: "/bar", component: Bar, guards: [guard] },
  ]

  const expected = [
    { path: "/foo", component: None, exact: true },
    { path: "/bar", component: Bar, exact: true },
  ]

  expect(compileGuards(source, context)).toEqual(expected)
})

describe("real-world", () => {
  const Redirect = ({ to }) => `redirect to ${to}`
  const onlyAnonym = ({ redirectUser }) => (route, { isAuth }) =>
    isAuth
      ? { path: route.path, component: () => Redirect({ to: redirectUser }) }
      : route

  const onlyUser = ({ redirectAnon }) => (route, { isAuth }) =>
    isAuth
      ? route
      : { path: route.path, component: () => Redirect({ to: redirectAnon }) }
  const checkRoles = (allow) => (route, { roles }) =>
    allow.find((role) => roles.includes(role)) ? route : null

  test("if not authenticated redirect", () => {
    const LoginPage = () => "login page"
    const MailboxPage = () => "mailbox page"

    const routes = [
      {
        path: "/login",
        component: LoginPage,
        guards: [onlyAnonym({ redirectUser: "/mailbox" })],
      },
      {
        path: "/mailbox",
        component: MailboxPage,
        guards: [
          onlyUser({ redirectAnon: "/login" }),
          checkRoles(["user", "admin"]),
        ],
      },
    ]

    const resultAuthorized = compileGuards(routes, {
      isAuth: true,
      roles: ["user"],
    })

    expect(resultAuthorized[0].component()).toBe("redirect to /mailbox")
    expect(resultAuthorized[1].component()).toBe("mailbox page")

    const resultAunauthorized = compileGuards(routes, {
      isAuth: false,
      roles: [],
    })

    expect(resultAunauthorized[0].component()).toBe("login page")
    expect(resultAunauthorized[1]).toBe(undefined)

    const resultNoRoles = compileGuards(routes, {
      isAuth: true,
      roles: [],
    })

    expect(resultNoRoles[0].component()).toBe("redirect to /mailbox")
    expect(resultNoRoles[1]).toBe(undefined)
  })
})
