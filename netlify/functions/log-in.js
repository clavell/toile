var faunadb = require('faunadb'),
  q = faunadb.query

  const online = true
  const secret = online ? process.env.onlineSecret : process.env.offlineSecret

  var faunadb = require('faunadb'),
    q = faunadb.query
  
    var client = new faunadb.Client({
      secret,
      domain: online ? 'db.fauna.com' : 'localhost',
      // NOTE: Use the correct domain for your database's Region Group.
      scheme: online ? 'https' : 'http',
      port: online ? 443 : 8443
    })
  
  
  const { Create, Collection, CreateCollection, Ref, Get, Update,Map, Documents, Paginate,Var,Lambda, Delete, Collections, CreateIndex, Index, Match, Indexes, TimeAdd, Now, Login } = q

  exports.handler = async function(event, context, callback) {

    const data = JSON.parse(event.body)
    console.log('data', data)

    return client.query(
      Login(
        Match(Index('unique_Crouleur_identifier'), data.username),
        {password: data.password,
        ttl: TimeAdd(Now(), 1, 'hour')}
      )
    ).then((response) => {
      console.log(response)
      console.log(response.ref)
      /* Success! return the response with statusCode 200 */
      return  callback(null, {
        statusCode: 200,
        body: response.secret //just return the secret as a string
      })
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
  }