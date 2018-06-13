/**
 * @param {{ get: () =>, post: () => {} }} requester
 * @param {{ apiName?: string, children?: {}[] }[]} apis
 * @param {{}} baseInstance
 */
const instantiateApi = (requester, apis, baseInstance = {}) => (
  apis
    .reduce((all, FeatureApi) => {
      const instance = new FeatureApi(requester)
      const name = FeatureApi.apiName
      const children = FeatureApi.apiChildren

      // eslint-disable-next-line no-param-reassign
      all[name] = children
        ? instantiateApi(requester, children, instance)
        : instance

      return all
    }, baseInstance)
)

/**
 * @typedef {Object} Class
 * @prop {string} apiName
 * @prop {Class[]} [apiChildren]
 */

/**
 * Inject requester class into Api classes.
 * Api class should have static field `apiName`
 * to describe field name contains instance of this class.
 *
 * @example
 * class BazApi {
 *   static apiName = 'baz'
 *   constructor(api) {
 *     this.api = api
 *   }
 *
 *   fetch() {
 *     return this.api.get('/baz')
 *   }
 * }
 *
 * @description
 * Api can be nested. To nest BarApi into FooApi:
 * set `static apiChildren = [BarApi]` in FooApi class
 *
 * @example
 * class FooApi {
 *   static apiName = 'foo'
 *   static apiChildren = [BarApi]
 *   // definiton of foo api
 * }
 * class BarApi {
 *   static apiName = 'bar'
 *   // definiton of bar api
 *   getBar() {
 *     // fetch bar
 *   }
 * }
 *
 * @example
 * const requester = new Requester('/api')
 * const api = createApi(requester, [FooApi, BazApi])
 * thunk.withExtraArgument({ api })
 *
 * @example
 * const fetchData = () => (
 *   async (dispatch, getState, { api }) => {
 *     await api.baz.fetch()
 *     await api.foo.bar.getBar()
 *   }
 * )
 *
 * @param {Class} requesterClass Class to be injected into each Api
 * @param {Class[]} apiClasses List of Api classes
 * @return {{}} Simple object with fields is instance of api
 */
export const createApi = (requesterClass, apiClasses = []) => (
  instantiateApi(requesterClass, apiClasses)
)

