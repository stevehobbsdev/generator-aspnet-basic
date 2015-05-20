{
  "name": "<%= appname %>",
  "version": "0.0.0",
  "description": "",
  "scripts": {
  },
  "license": "ISC",
  "dependencies": {
  	<% if(bootstrap && useGulp) { %>
  		"bootstrap": "^3.3.4"
  	<% } %>
  },
  "devDependencies": {
    <% if(useGulp) { %>
  	"gulp":"*"
    <% } %>
  }
}
