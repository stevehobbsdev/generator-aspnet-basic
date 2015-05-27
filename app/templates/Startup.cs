using System;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;

namespace <%= namespace %>
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{		
		}
		
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc();
		}
		
		public void Configure(IApplicationBuilder app, IHostingEnvironment env) 
		{
			app.UseStaticFiles();

			app.UseMvc(routes => {
				
				routes.MapRoute(
					name: "Default",
					template: "{controller}/{action}/{id?}",
					defaults: new { controller = "Home", action = "Index" }
				);
					
			});
			
		}
	}
}